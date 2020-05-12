<template>
       <span class="text" :style="{ color: color }" :title="value">{{ value | format(format) }}</span>
</template>

<script>
export default {
        props:{
                color:{
                        type:String,
                        default:null
                },
                value:{
                        type:String|Number,
                        default:""
                },
                format:{
                        type:Object|String,
                        default:null
                }
        }
}
</script>
<style scoped>
  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>