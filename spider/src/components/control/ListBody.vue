<template>
  <div>
    <div v-show="columnFilter" style="text-align: left; padding: 10px; padding-bottom: 15px;">
      <MyCheckBoxGroup v-model="selectedColumns_" label="title" value="key" :options="columns" />
    </div>
    <div>
      <Table ref="table" :border="border" :stripe="stripe" size="small" :columns="contentColumn.filtered" :data="datas">
        <template v-for="column in contentColumn.filtered" slot-scope="{ row }" :slot="column.key">
          <span v-if="column.isOperation" :key="column.key">
            <template v-for="item in column.operations">
              <Link style="margin-left:10px" :key="item.name" v-if="item.match(row)" :label="item.label" @click="emit(item.name, row)" />
            </template>
          </span>
          <PlainText v-else :key="column.key" :format="column.format" :value="row[column.key]"  />
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
      datas: Array,
      columnFilter: Boolean,
      stripe: Boolean,
      border: Boolean,
      selectedColumns: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        selectedColumns_: [],
        contentColumn: {
          source: [],
          filtered: [],
        },
      };
    },

    created() {
      this.init();
    },
    methods: {
      init() {
        this.contentColumn.source = this.contentColumn.filtered = this.columns;
        let columns = this.$utils.clone(this.selectedColumns);
        this.selectedColumns_ = columns.length == 0 ? this.getAllColumns() : columns;
      },
      emit(event, row) {
        this.$emit(event, row);
      },

      getSelection() {
        return this.$refs.table.getSelection();
      },

      doFilter() {
        let set = new Set(this.selectedColumns_);
        this.contentColumn.filtered = this.contentColumn.source.filter((x) => set.has(x.key));
      },
      getAllColumns() {
        let columns = [];
        this.contentColumn.source.forEach((x) => {
          columns.push(x.key);
        });

        return columns;
      },
    },

    watch: {
      selectedColumns_: {
        deep: true,
        handler: function (newVal) {
          if (this.doFilter) this.doFilter();
        },
      },
      selectedColumns() {
        this.selectedColumns_ = this.$utils.clone(this.selectedColumns);
      },
    },
  };
</script>
