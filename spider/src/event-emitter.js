const event={};

function on(name,callback){
        event[name]=event[name]||[];
        event[name].push(callback);
}

function emit(name,data){
    if(event[name]){
            event[name].forEach(callback=>{
                this.$nextTick(()=>{
                      callback(data);
                });
            });
    }
}

function install(Vue){
        Vue.emit=Vue.protoType.emit=emit;
        Vue.on=Vue.protoType.on=on;
}

exports.eventEmitter={
        install
}