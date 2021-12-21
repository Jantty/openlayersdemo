import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    _defaultMapView: '',//默认地图view
    // _defaultOSMLayer: Map,
    _defaultMapTreeVisible: false,//图层目录显示/隐藏
}
const getters = {
    _getDefaultMapView() {
        return state._defaultMapView;
    },
    _getDefaultOSMLayer() {
        return state._defaultOSMLayer;
    },
    _getDefaultMapTreeVisible() {
        return state._defaultMapTreeVisible;
    },
};
const mutations = {
    _setDefaultMapView(state, value) {
        state._defaultMapView = value;
    },
    _setDefaultOSMLayer(state, value) {
        state._defaultOSMLayer = value;
    },
    _setDefaultMapTreeVisible(state, value) {
        state._defaultMapTreeVisible = value;
    },
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});
export default store;