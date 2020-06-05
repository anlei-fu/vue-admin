import Vue from 'vue'

const Vuex = require('vuex');
const axios=require("axios");
Vue.use(Vuex);;

const store = new Vuex.Store({
        state: {
                caches: {},
                initialized: false,
                userInfo: {},
                token: "",
                authorities: {},
                theme: {},
                language: {},
                colorPicker: {}
        },
        mutations: {
                setCaches(state, caches) {
                        state.caches = caches;
                },
                setCache(state, name, cache) {
                        state.caches[name] = cache;
                },
                setToken(state, token) {
                        state.token = token;
                },
                removeToken(state) {
                        state.token = null;
                },
                setInitialized(state) {
                        state.initialized = true;
                },
                setUserInfo(state, userInfo) {
                        state.userInfo = userInfo;
                },
                setAuthorities(state, authorities) {
                        state.authorities = authorities;
                },
                setLanguage(state, langauge) {
                        state.language = langauge;
                },
                setTheme(state, theme) {
                        state.theme = theme;
                },
                setColorPicer(state, colorPicker) {
                        state.colorPicker = colorPicker;
                }
        },
        getters: {
                cache(state, name) {
                        return state.caches[name] || [];
                },

                isLogined(state) {
                        return state.userInfo && state.token;
                },
        },
        actions:{
                async getCache({commit},url){
                     
                }
        }
})

export { store }