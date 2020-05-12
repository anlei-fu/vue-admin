import Vue from 'vue'

const Vuex =require('vuex')
Vue.use(Vuex);



const store = new Vuex.Store({
    state:{
        caches:{},
        initialized:false,
        userInfo:{},
        token:"",
        authorities:{},
        themes:{},
        language:{},
        colorPicker:{}
    },
    mutations:{
        setEnum(state,caches){
          state.caches=caches;
        },
        setEnumItem(state,name,cache){
          state.caches[name]=cache;
        },
        setToken(state,token){
          state.token=token;
        },
        setInitialized(state){
          state.initialized=true;
        },
        setUserInfo(state,userInfo){
          state.userInfo=userInfo;
        },
        setAuthorities(state,authorities){

        }
        
    },
    getters:{
        cache(state,name){
                return state.caches[name]||[];
        },
        
        isLogined(state){
                return state.userInfo&&state.token;
        },

        isInitialized(state){
                return state.initialized;
        }
    }
})

export {store}