<template>
  <RadioGroup v-model="selectedValue_">
    <Radio v-for="item in options_" :key="item.value" :label="item.value">
      <Icon v-if="item.icon" :type="item.icon"/>
      {{ item.label }}
    </Radio>
  </RadioGroup>
</template>
<script>
  export default {
    model: {
      event: "change",
      prop: "selectedValue",
    },

    props: {
      options: {
        type: Array,
        default: () => [],
      },
      selectedValue:{
          type:String|Number
      },
      label: {
        type: String,
        default: "label",
      },
      value: {
        type: String,
        default: "value",
      },
      cache: {
        type: String,
      },
    },

    data() {
      return {
        selectedValue_: null,
        options_: null,
      };
    },

    created() {
      // get options ,if cache setted from store or from options
      this.options_ = this.$utils.getCache.call(this, this.cache, this.options);
      this.selectedValue_ = this.selectedValue;
    },

    watch: {
      selectedValue_(newVal) {
         this.$emit("change", newVal);
      },
      selectedValue(newVal) {
        this.selectedValue_ = newVal;
      },
    },
  };
</script>
