<template>
        <div class="scroll"  :style="{'height':height,'max-height':maxHeight}">
                          <slot/>
        </div>
</template>
<script>
export default {
     props:{
             maxHeight:{
                type:String,
                default:"400px",
             },
             height:{
                     type:String,
                     default:""
             }
     }   
}
</script>
<style scoped>
  .scroll{
         padding: 10px 0px;
         overflow-y: auto;
         overflow-x: hidden;
  }
</style>