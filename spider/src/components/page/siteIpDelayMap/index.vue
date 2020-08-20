<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
     <PageSetting ref="setting" :setting="pageSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
      <MySelect v-show="showSiteId" v-model="query.siteId" title="Site" enum="Site" width="200px" />
      <span v-show="showRadioGroup">
        <MyRadioGroup v-model="radioKey" :options="radioOptions" width="200px" />
        <Input v-model="keyword" style="width: 200px;" />
      </span>
      <span>
        <QueryButton @click="getData(true)" />
        <BatchDeleteButton @click="batchDelete" />
      </span>
    </MyFilter>
    <MyTable
      ref="table"
      filter
      border
      stripe
      columnFilter
      :columns="pageSetting.table.columns"
      :datas="data.list"
      @delete="showDelete"
    />
    <MyPager
      :current="query.pageIndex"
      :total="data.total"
      @onSizeChanged="onPageSizeChanged"
      @onIndexChanged="onPageIndexChanged"
    />
  </div>
</template>
<script>
  import utils from "./../../../common";
  export default {
    components: {},
    data() {
      return {
        pageSetting: {
          filters: {
            options: utils.options(["TimeRange", "SiteId", "RadioGroup"]),
            enabledFilters: ["TimeRange", "SiteId", "RadioGroup"],
          },
          table: {
            columns: [
              utils.CHECKBOX_COLUMN,
              utils.column("id"),
              utils.enumColumn("siteId", "Site", "Site"),
              utils.column("ip"),
              utils.dateColumn("delayTimeoutTime", "DelayTimeout"),
              utils.operateColumn([utils.operation("delete")]),
            ],
            showingColumns: [],
          },
        },
        api: "siteIpDelayMap",
        radioKey: "ip",
        keyword: "",
        radioOptions: [
          {
            label: "Ip",
            value: "ip",
          },
        ],
        timeRange: [],
        query: {
          siteId: null,
          ip: null,
          createTimeStart: null,
          createTimeEnd: null,
          pageIndex: 1,
          pageSize: 10,
        },
        data: utils.data(),
      };
    },
    beforeMount() {
      utils.initFilterOptionShows.call(this);
      this.getData(true);
    },
    watch: {
      "pageSetting.filters.enabledFilters"(newVal) {
        let set = new Set(newVal);
        this.pageSetting.filters.options.forEach((op) => {
            this["show" + op.value] = set.has(op.value);
        });
      },
    },
    methods: {
      batchDelete() {
        utils.batchDelete.call(this);
      },
      showDelete(row) {
        utils.showDelete.call(this, row);
      },
      showSetting() {
        this.$refs.setting.show();
      },
      onPageSizeChanged(newSize) {
        this.query.pageSize = newSize;
        this.getData(true);
      },
      onPageIndexChanged(newIndex) {
        this.query.pageIndex = newIndex;
        this.getData();
      },
      getData(reset) {
        utils.getData.call(this, reset, true, true);
      },
    },
  };
</script>
