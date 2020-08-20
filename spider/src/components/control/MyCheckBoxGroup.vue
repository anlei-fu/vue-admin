<template>
  <span>
    <span v-if="title" class="control-title">{{ title }}</span>
    <template v-if="orientation == 'horizontal'">
      <span class="check-item-h">
        <Checkbox v-model="all_">{{ allName }}</Checkbox>
      </span>
      <template v-for="item in options_">
        <span class="ckeck-item-h" :key="item[value]">
          <Checkbox @on-change="emitChange" v-model="item.checked">
            <Icon v-if="item.icon" :type="item.icon"></Icon>
            {{ item[label] }}
          </Checkbox>
        </span>
      </template>
    </template>
    <template v-else>
      <div>
        <Checkbox class="ckeck-item-v" v-model="all_">{{ allName }}</Checkbox>
      </div>
      <template v-for="item in options_">
        <div class="ckeck-item-v" :key="item[value]">
          <Checkbox @on-change="emitChange" v-model="item.checked">
            <Icon v-if="item.icon" :type="item.icon"></Icon>
            {{ item[label] }}
          </Checkbox>
        </div>
      </template>
    </template>
  </span>
</template>
<script>
  export default {
    model: {
      prop: "checkedItems",
      event: "change",
    },
    props: {
      options: {
        type: Array,
        default: () => [],
      },
      checkedItems: {
        type: Array,
        default: () => [],
      },
      allName: {
        type: String,
        default: "All",
      },
      title: {
        type: String,
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
      orientation: {
        type: String,
        default: "horizontal",
      },
    },
    data() {
      return {
        options_: [],
        _checkItems: [],
        all_: false,
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        // get options ,if cache setted from store or from options
        this.options_ = this.$utils.getCache.call(this, this.cache, this.options);
        this.options_.forEach((option) => {
          option.checked = false;
        });
        this.all_ = false;
        this._checkItems = this.checkedItems;
        this.resetCheckItems();
      },
      /**
       * Reset checked items called by init and prop 'checkcedItems' changed
       */
      resetCheckItems() {
        this._checkItems.forEach((item) => {
          this.options_.forEach((option) => {
            let found = false;
            if (option[this.value] == item) {
              option.checked = true;
              found = true;
              return;
            }
          });
        });
      },
      emitChange() {
        this._checkItems = [];
        this.options_.forEach((option) => {
          if (option.checked) this._checkItems.push(option[this.value]);
        });
        this.$emit("change", this._checkItems);
      },
    },
    watch: {
      options() {
        this.init();
      },
      all_(newVal) {
        this._checkItems = [];
        this.options_.forEach((option) => {
          option.checked = newVal;
        });
        this.emitChange();
      },
      cache() {
        this.init();
      },
      checkItems() {
        this._checkItems = checkedItems;
        this.resetCheckItems();
      },
    },
  };
</script>
<style scoped>
  .ckeck-item-h {
    margin-right: 5px;
    line-height: 26px;
  }
  .ckeck-item-v {
    line-height: 30px;
  }
</style>
