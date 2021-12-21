<template>
    <div class="maptree-pannel" v-show="this.$store.getters._getDefaultMapTreeVisible">
        <div class="maptree-header">
            <span>图层管理</span>
            <i class="el-icon-close" @click="closeMapTreePannel"></i>
        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
import request from 'axios';
// import xml from 'xml';

export default {
    mounted: function () {
        this.getGeoSerevrLayers()
            .then((res) => {
                // return request.get(
                //   "/geoserver/ows?service=wfs&version=1.0.0&request=DescribeFeatureType"
                // );
                // var res = request.get(
                //     'localhost:8081/geoserver/ows?service=wfs&version=1.0.0&request=DescribeFeatureType',
                // );
                // console.log(res);
                
                var xml = new ActivexObject('MSXML2.DOMDocument');
                var xmlDoc = xml.loadXML(res);
                //获取所有工作区
                // var all = xmlDoc.getElementsByTagName("xsd:import");
                // all.foreach((t) => {
                //   var schemaLocation = t.getAttribute("schemaLocation");
                // });

                //根据工作区名称获取
                var schemaLocation = xmlDoc.querySelector('[namespace="nurc"]').getAttribute('schemaLocation');
                var schemaLocationStr = decodeURIComponent(schemaLocation);
                var index = schemaLocationStr.indexOf('typeName=');
                var layerNameStr = schemaLocationStr.substring(index).substring(9);
                //图层名称列表
                console.log(layerNameStr);
                // var layerNameArray = layerNameStr.split(",");
            })
            .catch((err) => console.log(err));
    },
    methods: {
        getGeoSerevrLayers() {
            return request.get('localhost:8081/geoserver/ows?service=wfs&version=1.0.0&request=DescribeFeatureType');
        },
    },
};
</script>

<style>
.maptree-pannel {
    position: absolute;
    bottom: 20px;
    left: 15px;
    width: 200px;
    height: 300px;
    background-color: #fff;
}
.maptree-header {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.maptree-header > span {
    line-height: 35px;
    font-size: 16px;
    font-weight: 600;
}
.maptree-header > i {
    line-height: 35px;
    cursor: pointer;
}
</style>