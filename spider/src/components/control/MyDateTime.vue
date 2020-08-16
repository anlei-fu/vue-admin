<template>
  <DatePicker type="datetime" v-model="value_" :style="{ width: width }" />
</template>
<script>
  export default {
    model: {
      prop: "value",
      event: "change",
    },
    props: {
      value: Date | String,
      shortcuts: {
        type: Object,
        default: () => {},
      },
      width: {
        type: String,
        default: "100%",
      },
    },
    data() {
      return {
        value_: null,
      };
    },
    created() {
      this.value_ = this.value;
    },
    watch: {
      value(newVal) {
        this.value_ = newVal;
      },
      value_(newVal) {
        this.$emit("change", newVal);
      },
    },
  };
</script>
