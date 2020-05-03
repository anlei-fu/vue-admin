<template>
  <Select v-model="value" :clearable="clearable">
    <Option v-for="item in options" :value="item[value]" :key="item[value]">{{ item[lable] }}</Option>
  </Select>
</template>
<script>
export default {
        props:{
                options:Array,
                lable:String,
                value:String,
                clearable:Boolean,
                value:Object
        }
};
</script>