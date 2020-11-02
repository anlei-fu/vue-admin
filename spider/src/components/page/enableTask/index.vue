<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
      <span v-show="showRadioGroup">
        <MyRadioGroup
          v-model="radioKey"
          :options="radioOptions"
          width="200px"
        />
        <Input v-model="keyword" style="width: 200px" />
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
      @del="showDelete"
      :selectedColumns="pageSetting.table.showingColumns"
    />
    <MyPager
      :current="query.pageIndex"
      :total="data.total"
      @onSizeChanged="onPageSizeChanged"
      @onIndexChanged="onPageIndexChanged"
    />
    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
import utils from "./../../../common";
export default {
  components: {
  },
  data() {
    return {
      pageSetting: {
        filters: {
          options: utils.options(["TimeRange", "RadioGroup"]),
          enabledFilters: ["TimeRange", "RadioGroup"],
        },
        table: {
          columns: [
            utils.CHECKBOX_COLUMN,
            utils.column("id"),
            utils.column("downSystemSiteId"),
            utils.column("downSystemSiteName"),
            utils.column("disableReason"),
            utils.dateColumn("createTime", "CTime", "yyyy-MM-dd hh:mm"),
            utils.dateColumn("enableTime", "ETime", "yyyy-MM-dd hh:mm"),
            utils.dateColumn("executeTime", "EexTime", "yyyy-MM-dd hh:mm"),
            utils.operateColumn([utils.operation("del")]),
          ],
          showingColumns: [
            "Checkbox",
            "downSystemSiteName",
            // "priority",
            "disableReason",
            "createTime",
            "enableTime",
            "executeTime",
            "test"
          ],
        },
      },
      api: "enableTask",
      timeRange: [],
      radioKey: "downSystemSiteName",
      keyword:"",
      radioOptions: utils.radioOptions(["downSystemSiteName"]),
      query: {
        downSystemSiteName: null,
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
    if (!utils.restoreIndex("/enableTask/index", this)) this.getData(true);
  },
  beforeDestroy() {
    utils.snapShotIndex("/enableTask/index", this);
  },
  watch: {
    "pageSetting.filters.enabledFilters"(newVal) {
      utils.changeShowingFilters.call(this, newVal);
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
