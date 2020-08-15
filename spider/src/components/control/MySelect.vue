<template>
  <span>
    <span v-if="title" style="margin-right: 10px;">{{ title }}</span>
    <Select
      v-model="selectedValue_"
      :style="{ width: width }"
      :clearable="clearable"
      :placeHolder="placeHolder"
    >
      <Option v-for="item in options_.filtered" :value="item[value]" :key="item[value]">
        {{ item[label] }}
      </Option>
    </Select>
  </span>
</template>
<script>
  export default {
    model: {
      prop: "selectedValue",
      event: "change",
    },
    props: {
      prefix: {
        type: String,
      },
      width: String,
      // model bind
      selectedValue: Number | String,
      // options
      options: {
        type: Array,
        default: () => [],
      },
      clearable: {
        type: Boolean,
        default: true,
      },
      placeHolder: {
        type: String,
        default: "请选择",
      },
      // label field
      label: {
        type: String,
        default: "label",
      },
      // value field
      value: {
        type: String,
        default: "value",
      },
      title: {
        type: String,
      },
      enum: String,
    },
    data() {
      return {
        options_: {
          source: [],
          filtered: [],
        },
        selectedValue_: null,
      };
    },

    created() {
      this.init();
      this.selectedValue_ = this.selectedValue;
    },

    watch: {
      options() {
        this.init();
      },
      cache(newVal) {
        this.init();
      },
      selectedValue_(newVal) {
        this.$emit("change", newVal);
      },
      selectedValue(newVal) {
        this.selectedValue_ = newVal;
      },
    },

    methods: {
      init() {
        this.options_ = {};
        if (this.enum) {
          this.options_.source = this.options_.filtered = this.$utils.clone(
            this.Enums.get(this.enum)
          );
        } else {
          this.options_.source = this.options_.filtered = this.options;
        }
      },
    },
  };
</script>
