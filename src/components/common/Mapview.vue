<template>
    <div class="mapview-pannel">
        <div id="mapview"></div>
        <MapTools />
        <MapTrees />
    </div>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol'; //View
// import Feature from 'ol/Feature';
import { Vector as VectorLayer, Tile } from 'ol/layer'; //VectorLayer
//   import {Point, LineString, Polygon} from 'ol/geom'
import { Vector as VectorSource, OSM, WMTS } from 'ol/source'; //VectorSource、WMTS
import WMTSTileGrid from 'ol/tilegrid/WMTS';
// import { fromLonLat, Projection } from 'ol/proj';
import { Projection } from 'ol/proj';

// import MapQuery from './../MapQuery';
import MapTools from './../MapTools';
import MapTrees from './../MapTrees';
// import TileLayer from 'ol/layer/Tile';
import config from './../config';

export default {
    name: 'OLMap',
    components: {
        MapTools,
        MapTrees,
    },
    mounted: function () {
        //OSM地图
        let tileOSM = new Tile({
            source: new OSM(),
        });

        //测试代码
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
            opacity: 1, //透明度
            source: tileSource,
            wrapX: false,
        });
        //测试结束

        let views = new View({
            center: [116.46, 39.92],
            // center: fromLonLat([tileLayer.center]),
            // extent: tileLayer.extent,
            projection: 'EPSG:4326',
            zoom: 5,
            maxZoom: 8,
            minZoom: 2,
        });
        const map = new Map({
            layers: [tileOSM],
            // view: views,
            target: 'mapview',
        });
        // console.log(map);
        map.setView(views);

        console.log(views);
        console.log(tileLayer);
        console.log(VectorLayer);
        console.log(VectorSource);

        // map.addLayer(tileLayer);
        this.$store.commit('_setDefaultMapView', map);
    },
};
</script>

<style>
.mapview-pannel,
#mapview {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>