<template>
  <div>
    <div>
      <span style="float: right;">
        <Icon type="md-settings" size="20" @click="showSetting" />
      </span>
    </div>
    <div class="filter">
      <MySelect v-show="showApp" title="Select" :options="pageSetting.filters.appOptions" width="200px" />
      <MyRadioGroup v-show="showRadio" title="Radio" :options="pageSetting.filters.appOptions" width="200px" />
      <QueryButton @click="show" />
    </div>
    <ListBody filter border stripe columnFilter :columns="pageSetting.table.allColumns" :datas="data.list" />
    <div class="pager">
      <Page :total="data.total" show-sizer show-total />
    </div>
    <add ref="add"></add>
    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
  import add from "./add";
  export default {
    components: {
      add: add,
    },
    name: "log",
    data() {
      return {
        pageSetting: {
          filters: {
            options: [
              { label: "App", value: "App" },
              { label: "Radio", value: "Radio" },
            ],
            enabledFilters: [],
            appOptions: [
              { label: "app", value: 1 },
              { label: "microsoft", value: 2 },
            ],
          },
          table: {
            allColumns: [
              {
                title: "Name",
                slot: "name",
                key: "name",
              },
              {
                title: "Age",
                key: "age",
                slot: "age",
              },
              {
                title: "Address",
                key: "address",
                slot: "address",
              },
            ],
            defaultShowingColumns: [],
            showingColumns: [],
            opreateColumns: null,
          },
        },

        editSetting: {
          mode: "",
          title: "",
          data: "",
          id: "",
          ids: [],
        },

        query: {
          pageSize: null,
          pageIndex: null,
        },
        // data set
        data: {
          total: null,
          list: [
            {
              name: "John Brown",
              age: 18,
              address: "New York No. 1 Lake Park",
              date: "2016-10-03",
            },
            {
              name: "Jim Green",
              age: 24,
              address: "London No. 1 Lake Park",
              date: "2016-10-01",
            },
            {
              name: "Joe Black",
              age: 30,
              address: "Sydney No. 1 Lake Park",
              date: "2016-10-02",
            },
          ],
        },
      };
    },

    // toggle filters show status
    computed: {
      showApp() {
        return this.$utils.checkFilterShowing.call(this, "App");
      },
      showRadio() {
        return this.$utils.checkFilterShowing.call(this, "Radio");
      },
    },

    created() {
      this.init();
    },

    methods: {
      init() {},
      getAllColumn() {},
      show() {
        this.$refs.add.show();
      },
      showSetting() {
        this.$refs.setting.show();
      },
    },
  };
</script>

<style scoped>
  .filter {
    text-align: left;
    margin-bottom: 10px;
  }

  .pager {
    margin-top: 15px;
    text-align: left;
  }
</style>
