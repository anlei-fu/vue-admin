<template>
  <span :style="{ width: width }">
    {{title}}
  <Select v-model="selectedValue_" :clearable="clearable" :placeHolder="placeHolder">
    <Option v-for="item in options.filtered" :value="item[value]" :key="item[value]">{{ item[lable] }}</Option>
  </Select>
  </span>
</template>
<script>
import {mapGetters,mapActions} from"vuex"
export default {
  name: "Select",
  model: {
    prop: "selectedValue",
    event: "change"
  },
  props: {
    width: String,
    // model bind
    selectedValue: Number | String,
    // options
    options: {
      type: Array,
      default: () => []
    },
    palceHolder: {
      type: String,
      default: "请选择"
    },
    // label field
    label: {
      type: String,
      default: "remark"
    },
    // value field
    value: {
      type: String,
      default: "value"
    },
    title: {
      type: String
    },
    cache: String
  },
  data() {
    return {
      options_: {
        source: [],
        filtered: []
      },
      selectedValue_: null
    };
  },

  created() {
    this.selectedValue_ = this.selectedValue;
  },
  computed:{
        optionSource(){
          if(this.options)
             return this.options;

          if(this.cache) {
             var items = this.$store.getter.cache(this.cache);
             if(items==null){
                  console.log("get cache failed");
                  return [];
             }
             
            return items;
          }
        }
  },
  watch: {
    options(newVal) {
      this.options_.source = this.options_.filtered = newVal;
    },
    selectedValue_(newVal) {
      this.$emit("change", newVal);
    },
    selectedValue(newVal) {
      this.selectedValue_ = newVal;
    }
  },

  methods: {
    doFilter(pattern) {
      this.options_.filtered = CommUtil.PinyinMatch(
        pattern,
        this.options_.source,
        this.label
      );
    }
  }
};
</script>