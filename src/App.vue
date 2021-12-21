<template>
    <div id="app">
        <el-header class="sys-header"> Openlayers Demo </el-header>
        <el-container class="app-content-pannel">
            <MapQuery />
            <Mapview />
        </el-container>
    </div>
</template>

<script>
import MapQuery from './components/MapQuery.vue';
import Mapview from './components/common/Mapview.vue';

export default {
    name: 'App',
    components: {
        MapQuery,
        Mapview,
    },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
html,
body,
#app {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
}
.sys-header {
    background-color: #32373e;
    line-height: 60px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
}

.app-out-pannel,
.app-content-pannel {
    height: 100%;
}

/* .map-page {
  position: relative;
  width: 100%;
  height: 100%;
} */
</style>
