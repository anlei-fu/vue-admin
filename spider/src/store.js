const Vuex =require('vuex')


const store = new Vuex({
    state:{
        enums:{},
        initialized:false,
        userInfo:{},
        token:"",
    },
    mutations:{
        setEnum(state,enums){
          state.enums=enums;
        },
        setToken(state,token){
          state.token=token;
        },
        setInitialized(state){
              state.initialized=true;
        },
        setUserInfo(state,userInfo){
          state.userInfo=userInfo;
        }
        
    }
})

const install=(Vue)=>{
  Vue.use(store);
}

module.exports={
  install
}