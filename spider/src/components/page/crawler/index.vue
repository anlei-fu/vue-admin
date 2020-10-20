<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
      <MySelect
        v-show="showCrawlerType"
        v-model="query.crawlerType"
        title="CrawlerType"
        enum="CrawlerType"
        width="200px"
      />
      <MySelect
        v-show="showHeartbeatStatus"
        v-model="query.heartbeatStatus"
        title="HeartbeatStatus"
        enum="HeartbeatStatus"
        width="200px"
      />
      <MySelect
        v-show="showEnableStatus"
        v-model="query.enableStatus"
        title="EnableStatus"
        enum="EnableStatus"
        width="200px"
      />
      <span v-show="showRadioGroup">
        <MyRadioGroup v-model="radioKey" :options="radioOptions" width="200px" />
        <Input v-model="keyword" style="width: 200px;" />
      </span>
      <span>
        <QueryButton @click="getData(true)" />
        <CreateButton @click="showAdd" />
        <BatchEditButton @click="showBatchEdit" />
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
      :selectedColumns="pageSetting.table.showingColumns"
      :datas="data.list"
      @delete="showDelete"
      @edit="showEdit"
    />
    <MyPager
      :current="query.pageIndex"
      :total="data.total"
      @onSizeChanged="onPageSizeChanged"
      @onIndexChanged="onPageIndexChanged"
    />
    <add
      ref="add"
      :model="addSetting.model"
      :title="addSetting.title"
      @success="onBatchEditSuccess"
    ></add>
    <edit
      ref="edit"
      :model="editSetting.model"
      :title="editSetting.title"
      @success="onEditSuccess"
    />
    <batchEdit ref="batchEdit" :ids="batchEditSetting.ids" @success="onBatchEditSuccess" />
    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
import add from "./add";
import edit from "./edit";
import batchEdit from "./batchEdit";
import utils from "./../../../common";
export default {
  components: {
    edit,
    add,
    batchEdit,
  },
  data() {
    return {
      pageSetting: {
        filters: {
          options: utils.options([
            "TimeRange",
            "CrawlerType",
            "HeartbeatStatus",
            "HeartbeatLostCount",
            "EnableStatus",
            "RadioGroup",
          ]),
          enabledFilters: [
            "TimeRange",
            "CrawlerType",
            "HeartbeatStatus",
            "HeartbeatLostCount",
            "EnableStatus",
            "RadioGroup",
          ],
        },
        table: {
          columns: [
            utils.CHECKBOX_COLUMN,
            utils.column("name"),
            utils.column("clientVersion", "Vs"),
            utils.column("ip", null, { width: "130px" }),
            utils.column("port"),
            utils.column("description", "Desc"),
            utils.column("uniqueId", "UId"),
            utils.column("key"),
            utils.enumColumn("crawlerType", null, "CrlerTp"),
            utils.positiveProgress(
              "usage",
              "maxConcurrency",
              "currentConcurrency"
            ),
            utils.column("maxConcurrency", "MxCon"),
            utils.column("currentConcurrency", "CrtCon"),
            utils.column("heartbeatLostCount", "LosCnt"),
            utils.dateColumn("heartbeatLastTime", "HbTm", "MM-dd hh:mm", {
              width: "110px",
            }),
            utils.enumColumn("heartbeatStatus", null, "HbSt"),
            utils.enumColumn("enableStatus", null, "Status"),
            utils.dateColumn("createTime", "CTime"),
            utils.operateColumn(
              [utils.operation("edit"), utils.operation("delete")],
              { width: "130px" }
            ),
          ],
          showingColumns: [
            "Checkbox",
            // "clientVersion",
            "name",
            "ip",
            "crawlerType",
            // "port",
            "usage",
            "heartbeatStatus",
            "heartbeatLastTime",
            "heartbeatLostCount",
            "enableStatus",
            // "createTime",
            "test",
            "lastSyncConcurrencyTime",
          ],
        },
      },
      editSetting: utils.editSetting(),
      addSetting: utils.addSetting(),
      batchEditSetting: utils.batchEditSetting(),
      radioKey: "ip",
      keyword: "",
      radioOptions: utils.radioOptions(["ip", "name", "clientVersion"]),
      api: "crawler",
      timeRange: [],
      query: {
        crawlerType: null,
        heartbeatStatus: null,
        heartbeatLostCount: null,
        enableStatus: null,
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
    if (!utils.restoreIndex("/crawler/index", this)) this.getData(true);
  },
  beforeDestroy() {
    utils.snapShotIndex("/crawler/index", this);
  },
  watch: {
    "pageSetting.filters.enabledFilters"(newVal) {
      utils.changeShowingFilters.call(this, newVal);
    },
  },
  methods: {
    showAdd() {
      utils.showAdd.call(this);
    },
    showEdit(row) {
      utils.showEdit.call(this, row);
    },
    onEditSuccess(row) {
      utils.onEditSuccess.call(this, row);
    },
    showBatchEdit() {
      utils.showBatchEdit.call(this);
    },
    onBatchEditSuccess(data) {
      utils.onBatchEditSuccess.call(this, data);
    },
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
