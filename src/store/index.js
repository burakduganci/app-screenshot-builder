import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    scene: {
        text: "Welcome to App Screenshot Builder",
        fontSize: 32,
        fontFamily: "Exo",
        phone: "nexus",
        screenshotBase64: "",
        textColor: {
            hex: "#ffffff",
            hex8: "#ffffffff"
        },
        bgColor: {
            hex: "#38a169",
            hex8: "#FF9B00ff"
        }
    },
    isProcessing: false
}

const mutations = {
    updateScreenshot(state, payload){
        state.scene.screenshotBase64 = payload
    },
    updateFontFamily(state, payload){
        state.scene.fontFamily = payload
    },
    updateBgColor(state, payload){
        state.scene.bgColor.hex8 = payload
    },
    updateProcessing(state, payload){
        state.isProcessing = payload
    }
}

const actions = {

}



export default new Vuex.Store({
    state,
    mutations,
    actions
})