<template>
          <span @click="click" :class="['tab-item', {'tab-active':selected}]" >
          <span  class="tab-content" >{{tab.label}}</span>
          <Icon class="tab-close" type="ios-close" @click="closeTab" size="18" />
        </span>
</template>
<script>
export default {
        props:{
                tab:Object,
                selected:false,
        },
        methods:{
                closeTab(){
                        this.$emit("close",this.tab)
                },
                click(){
                          this.$emit("click",this.tab)
                }
        },
}
</script>
<style scoped>

.tab-active {
  background-color: #57a3f3 !important;
   color: white;
   border: none;
}

.tab-item {
  background-color: whitesmoke;
  margin-right: 3px;
  display: inline-block;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  line-height: 30px;
  padding-left: 10px;
  width: 100px;
  border: 1px solid gray;
}

.tab-content {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80px;
}

.tab-item:hover {
  color: white;
  cursor: pointer;
  background-color: #57a3f3;
}
.icon-item {
  transition: 0.6s;
}
.tab-close{
   float: right;
    padding-top: 7px;
    padding-right: 3px;
     display: inline-block;
}
.icon-item:hover {
  color: #57a3f3;
  cursor: pointer;
}
</style>