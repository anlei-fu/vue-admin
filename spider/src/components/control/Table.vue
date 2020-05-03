<template>
  <div>
    <div v-show="columnFilter" style="text-align:left;padding:10px;">
      <Checkbox v-model="all">all</Checkbox>
      <Checkbox
        v-for="column in columnShowStates"
        :key="column.text"
        v-model="column.show"
      >{{column.text}}</Checkbox>
    </div>
    <div>
      <Table :border="border" :stripe="stripe" size="small"  :columns="contentColumn.filtered" :data="datas"></Table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    datas: Array,
    columnFilter: Boolean,
    stripe: Boolean,
    border: Boolean,
    unshowColumns: Array
  },
  data() {
    return {
      // all column
      all: true,
      //
      columnShowStates: [],
      contentColumn: {
        source: [],
        filtered: []
      }
    };
  },
  methods: {
    init() {
      this.contentColumn.source = this.contentColumn.filtered = this.columns;
      this.columns.forEach(x => {
        this.columnShowStates.push({ show: true, text: x.title, key: x.key });
      });
      if (this.unshowColumns) {
        this.unshowColumns.forEach(columnName => {
          this.columnShowStates.forEach(column => {
            if (columnName == column.key) {
              column.show = false;
            }
          });
        });
      }
    },

    dofilt() {
      this.contentColumn.filtered = this.contentColumn.source.filter(x => {
        for (const column of this.columnShowStates) {
          if (column.key == x.key) return column.show;
        }

        return true;
      });
    }
  },
  created() {
    this.init();
  },

  watch: {
    columnShowStates: {
      handler(val) {
        this.dofilt();
      },
      deep: true
    },
    columns(val) {
      this.init();
    },

    unshowColumns(val) {
      this.init();
    },

    all(val) {
      this.columnShowStates.forEach(column => {
        column.show = val;
      });
    }
  }
};
</script>