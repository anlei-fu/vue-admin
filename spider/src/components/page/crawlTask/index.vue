<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
            <MySelect
        v-model="query.downSystemId"
        title="System"
        enum="System"
        width="200px"
      />
      <MySelect v-model="query.siteId" title="Site" enum="Site" width="200px" />
      <MySelect
        v-model="query.taskStatus"
        title="TaskStatus"
        enum="TaskStatus"
        width="200px"
      />
      <MySelect
        v-model="query.taskResult"
        title="ResultType"
        enum="TaskResult"
        width="200px"
      />
      <MySelect
        v-model="query.dataSyncStatus"
        title="DataSyncStatus"
        enum="SyncStatus"
        width="200px"
      />
      <MySelect
        v-model="query.urlSyncStatus"
        title="UrlSyncStatus"
        enum="SyncStatus"
        width="200px"
      />
      <MySelect
        v-model="query.crawlerId"
        title="Crawler"
        enum="Crawler"
        width="200px"
      />
      <MySelect
        v-model="query.bindLastStatus"
        title="BindResult"
        enum="BindResult"
        width="200px"
      />
      <MySelect
        v-model="query.dispatchStatus"
        title="DispatchResult"
        enum="DispatchResult"
        width="200px"
      />
      <MySelect
        v-model="query.proxyId"
        title="Proxy"
        enum="Proxy"
        width="200px"
      />
      <MySelect
        title="EnableStatus"
        enum="EnableStatus"
        width="200px"
      />
       <span>
        <MyRadioGroup v-model="radioKey" :options="radioOptions" width="200px" />
        <Input v-model="keyword" style="width: 200px;" />
      </span>
      <span>
        <QueryButton @click="getData(true)" />
      </span>
    </MyFilter>
    <MyTable
      ref="table"
      @dspRcd="showDispatchRecord"
      @bdRcd="showBindRecord"
      filter
      border
      stripe
      columnFilter
      :columns="pageSetting.table.columns"
      :datas="data.list"
      :selectedColumns="pageSetting.table.showingColumns"
    />
    <MyPager
      :current="query.pageIndex"
      :total="data.total"
      @onSizeChanged="onPageSizeChanged"
      @onIndexChanged="onPageIndexChanged"
    />
    <dispatchRecordViewer ref="dispatch" />
    <bindRecordViewer ref="bind" />
    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
import utils from "./../../../common";
import bindRecordViewer from "./bindRecordViewer";
import dispatchRecordViewer from "./dispatchRecordViewer";
export default {
  components: {
    bindRecordViewer,
    dispatchRecordViewer,
  },
  data() {
    return {
      pageSetting: {
        filters: {
      
        },
        table: {
          columns: [
            utils.column("id"),
            utils.enumColumn("downSystemId", "System", "System"),
            utils.enumColumn("siteId", "Site", "Site"),
            utils.column("downSystemSiteName","DssName"),
            utils.enumColumn("taskStatus", null, "Status", { width: "100px" }),
            utils.enumColumn("crawlerId", "Crawler", "Crler"),
            utils.enumColumn("bindLastResult", "BindResult", "BdRst"),
            utils.column("bindLastMsg", "BdMsg"),
            utils.column("bindCount", "BdCnt"),
            utils.dateColumn("bindLastTime", "BdTm", "MM-dd hh:mm", {
              width: "110px",
            }),
            utils.dateColumn("bindTimeoutTime", "BdTmt", "MM-dd hh:mm", {
              width: "110px",
            }),
            utils.enumColumn("dispatchLastResult", "DispatchResult", "DspRst"),
            utils.dateColumn("dispatchLastTime", "DspTm", "MM-dd hh:mm", {
              width: "110px",
            }),
            utils.column("dispatchLastMsg", "DspMsg"),
            utils.dateColumn(
              "taskExecuteTimeoutTime",
              "ExeTmt",
              "MM-dd hh:mm",
              { width: "110px" }
            ),
            utils.enumColumn("siteAccountId", "Account", "Acc"),
            utils.enumColumn("proxyId", "Proxy", "Pro"),
            utils.dateColumn("taskStartTime", "StTm"),
            utils.dateColumn("taskFinishTime", "FnshTm","MM-dd hh:mm"),
            utils.column("urlSuccessCount", "SUrlCnt"),
            utils.column("urlFailedCount", "FUrlCnt"),
            utils.column("urlNewCount", "NewCnt"),
            utils.column("urlBadCount", "BadCnt"),
            utils.column("averageSpeedOfAll", "AllSpd"),
            utils.column("averageSpeedOfSuccess", "ScsSpd"),
            utils.column("medianSpeedOfSuccess", "MdnSpd"),
            utils.column("maxSpeedOfSuccess", "MxSpd"),
            utils.enumColumn("urlSyncStatus", "SyncStatus", "UrlSync"),
            utils.enumColumn("dataSyncStatus", "SyncStatus", "DtSync"),
            utils.column("dataFile", "DtFile"),
            utils.enumColumn("taskResult", "TaskResult", "Result"),
            utils.dateColumn("createTime", "Ctime", "MM-dd hh:mm"),
            utils.operateColumn(
              [utils.operation("bdRcd"), utils.operation("dspRcd")],
              {
                width: "150px",
              }
            ),
          ],
          showingColumns: [
            "test",
            "downSystemId",
            "downSystemSiteName",
            "siteId",
            // "taskExecuteTimeoutTime",
            // "bindTimeoutTime",
            "taskStatus",
            "bindCount",
            // "bindLastResult",
            "bindLastTime",

            // "dispatchLastResult",
            "dispatchLastTime",
            // "taskStartTime",
            // "taskFinishTime",
            // "enableStatus",
            "taskResult",
            "createTime",
          ],
        },
      },
      api: "crawlTask",
      timeRange: [],
      radioKey: "downSystemSiteName",
      keyword: "",
      radioOptions: utils.radioOptions(["downSystemSiteName"]),
      query: {
        siteId: null,
        downSystemId: null,
        taskStatus: null,
        taskResult: null,
        crawlerId: null,
        bindLastStatus: null,
        dispatchStatus: null,
        dataSyncStatus: null,
        urlSyncStatus: null,
        proxyId: null,
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
    if (!utils.restoreIndex("/crawlTask/index", this)) this.getData(true);
  },
  beforeDestroy() {
    utils.snapShotIndex("/crawlTask/index", this);
  },
 
  methods: {
    showBindRecord(row) {
      this.$refs.bind.show(row.id);
    },
    showDispatchRecord(row) {
      this.$refs.dispatch.show(row.id);
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
