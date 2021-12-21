<template>
    <div class="mapquery-view">
        <el-input placeholder="请输入地图服务地址" v-model="inputUrl">
            <template slot="prepend">http://</template>
            <el-button slot="append" icon="el-icon-search" @click="handleAddLayer"></el-button>
        </el-input>
    </div>
</template>

<script>
import 'ol/ol.css';
import { View } from 'ol'; //Map
import { Vector as Tile } from 'ol/layer'; //VectorLayer
import { Vector as WMTS } from 'ol/source'; //VectorSource
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { Projection } from 'ol/proj';

import config from './config';

export default {
    name: 'MapQuery',
    data() {
        return {
            inputUrl: 'http://localhost:8081/geoserver/gwc/demo/tiger:giant_polygon?gridSet=EPSG:4326&format=image/png',
        };
    },

    // mounted: function () {
    //     this.handleAddLayer();
    // },
    methods: {
        handleAddLayer() {
            //切片策略
            let tileGrid = new WMTSTileGrid({
                tileSize: [256, 256],
                extent: [-180.0, -90.0, 180.0, 90.0], //范围
                origin: [-180.0, 90.0], //切片原点
                resolutions: config.resolutions, //分辨率
                matrixIds: config.matrixIds, //层级标识列表，与地图级数保持一致
            });
            //设置地图投影;
            let projection = new Projection({
                code: 'EPSG:4326',
                units: 'degrees',
                axisOrientation: 'neu',
            });
            let tileSource = new WMTS({
                url: config.geoserverUrl,
                layer: 'nurc:mosaic',
                format: config.mapFormat,
                matrixSet: config.matrixSet,
                projection: projection, //projection
                tileGrid: tileGrid,
            });

            let tileLayer = new Tile({
                opacity: 0.7, //透明度
                source: tileSource,
                wrapX: false,
            });

            let layerView = new View({
                center: [116.46, 39.92],
                // center: tileLayer.center,
                projection: config.matrixSet, //'EPSG:4326',
                zoom: 5,
                maxZoom: 8,
                minZoom: 2,
            });

            let map = this.$store.getters._getDefaultMapView;
            // map.center([116.46, 39.92]);
            map.setView(layerView);
            map.addLayer(tileLayer);
            // console.log(map);

            // let map = new Map({
            //     layers: [tileLayer],
            //     view: views,
            //     target: mapView,
            // });

            // console.log(map);
            // let map = this.$store.getters._getDefaultMapView;
            // map.addLayer(tileLayer);
        },
    },
};
</script>


<style>
.mapquery-view {
    position: absolute;
    right: 15px;
    top: 10px;
}
.el-input {
    width: 500px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>
