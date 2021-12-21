<template>
    <div class="maptools-view">
        <!-- <span class="maptools-item" @click="handleMapTools" id="maptree"
      >图层管理</span
    > -->
        <span class="maptools-item" @click="handleMapTools" id="measure_length">距离测量</span>
        <span class="maptools-item" @click="handleMapTools" id="measure_area">面积测量</span>
        <span class="maptools-item" @click="handleMapTools" id="clear">清屏</span>
    </div>
</template>

<script>
import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { LineString, Polygon } from 'ol/geom';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { getArea, getLength } from 'ol/sphere';
import { unByKey } from 'ol/Observable';

export default {
    name: 'MapTools',
    methods: {
        handleMapTools(e) {
            console.log(e.target.id);
            switch (e.target.id) {
                case 'maptree':
                    this.maptree();
                    break;
                case 'measure_distance':
                    break;
                case 'measure_area':
                    break;
                case 'clear':
                    break;
                default:
                    break;
            }
        },
        maptree() {
            let currentVisible = this.$store.getters._getDefaultMapTreeVisible;
            this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
        },

        measuredistance() {},
    },
};
</script>

<style>
.maptools-view {
    position: absolute;
    padding: 0 15px;
    height: 30px;
    top: 20px;
    right: 15px;
    background: #fff;
}
.maptools-item {
    line-height: 30px;
    margin-left: 15px;
    /* margin-right: 15px; */
    color: black;
    cursor: pointer;
}
.maptools-item:hover {
    color: #409eff;
}
.maptools-item:first-child {
    margin-left: 0;
}
</style>
