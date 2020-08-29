<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
      <MySelect v-show="showSiteId" v-model="query.siteId" title="Site" enum="Site" width="200px" />
      <MySelect
        v-show="showDownSystemId"
        v-model="query.downSystemId"
        title="System"
        enum="System"
        width="200px"
      />
      <MySelect
        v-show="showTaskStatus"
        v-model="query.taskStatus"
        title="TaskStatus"
        enum="TaskStatus"
        width="200px"
      />
      <MySelect
        v-show="showTaskExecuteResultType"
        v-model="query.taskExecuteResultType"
        title="ResultType"
        enum="TaskResult"
        width="200px"
      />
      <MySelect
        v-show="showCrawlerId"
        v-model="query.crawlerId"
        title="Crawler"
        enum="Crawler"
        width="200px"
      />
      <MySelect
        v-show="showBindLastStatus"
        v-model="query.bindLastStatus"
        title="BindResult"
        enum="BindResult"
        width="200px"
      />
      <MySelect
        v-show="showDispatchStatus"
        v-model="query.dispatchStatus"
        title="DispatchResult"
        enum="DispatchResult"
        width="200px"
      />
      <MySelect
        v-show="showProxyId"
        v-model="query.proxyId"
        title="Proxy"
        enum="Proxy"
        width="200px"
      />
      <MySelect
        v-show="showEnableStatus"
        v-model="query.enableStatus"
        title="EnableStatus"
        enum="EnableStatus"
        width="200px"
      />
      <span>
        <QueryButton @click="getData(true)" />
      </span>
    </MyFilter>
    <MyTable
      ref="table"
      @dsphRcd="showDispatchRecord"
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
          options: utils.options([
            "TimeRange",
            "SiteId",
            "DownSystemId",
            "TaskStatus",
            "TaskExecuteResultType",
            "CrawlerId",
            "BindLastStatus",
            "DispatchStatus",
            "ProxyId",
            "EnableStatus",
          ]),
          enabledFilters: [
            "TimeRange",
            "SiteId",
            "DonwSystemId",
            "TaskStatus",
            "TaskExecuteResultType",
            "CrawlerId",
            "BindLastStatus",
            "DispatchStatus",
            "ProxyId",
            "EnableStatus",
          ],
        },
        table: {
          columns: [
            utils.column("id"),
            utils.enumColumn("downSystemId", "System", "System"),
            utils.enumColumn("siteId", "Site", "Site"),
            utils.enumColumn("taskStatus", null, "Status",{width:"100px"}),
            utils.enumColumn("taskResult", "TaskResult", "Result"),
            utils.enumColumn("crawlerId", "Crawler", "Crler"),
            utils.enumColumn("bindLastResult", "BindResult", "BdRst"),
            utils.column("bindLastMsg", "BdMsg"),
            utils.dateColumn("bindLastTime","BdTm","MM-dd hh:mm",{width:"110px"}),
            utils.column("bindCount", "BdCnt"),
             utils.dateColumn("bindTimeoutTime", "BdTmt","MM-dd hh:mm",{width:"110px"}),
            utils.enumColumn(
              "dispatchLastResult",
              "DispatchResult",
              "DspRst"
            ),
            utils.dateColumn("dispatchLastTime","DspTm","MM-dd hh:mm",{width:"110px"}),
            utils.column("dispatchLastMsg", "DspMsg"),
            utils.dateColumn("taskTimeoutTime", "ExeTmt","MM-dd hh:mm",{width:"110px"}),
            utils.enumColumn("siteAccountId", "Account", "Acc"),
            utils.enumColumn("proxyId", "Proxy", "Pro"),
            utils.dateColumn("taskStartTime", "StTm"),
            utils.dateColumn("taskFinishTime", "FnshTm"),
            utils.column("successUrlCount", "SucUrlCnt"),
            utils.column("urlFailedCount", "FailCnt"),
            utils.column("urlNewCount", "NewCnt"),
            utils.column("urlBadCount", "BadCnt"),
            utils.column("averageSpeedOfAll", "SpdOfAll"),
            utils.column("averageSpeedOfSuccess", "SpdOfSuc"),
            utils.column("medianSpeedOfSuccess", "MedianSpdOfSuc"),
            utils.column("maxSpeedOfSuccess", "MxSpdOfSuc"),
            utils.dateColumn("createTime", "Ctime"),
            utils.operateColumn(
              [
                utils.operation("bdRcd"),
                utils.operation("dsphRcd"),
              ],
              {
                width: "150px",
              }
            ),
          ],
          showingColumns: [
            "test",
            "downSystemId",
            "siteId",
            "taskTimeoutTime",
            "bindTimeoutTime",
            "taskStatus",
            "taskResult",
            "bindLastResult",
            "bindLastTime",
            "bindCount",
            "dispatchLastResult",
            "dispatchLastTime"
            // "taskStartTime",
            // "taskFinishTime",
            // "enableStatus",
            // "createTime",
          ],
        },
      },
      api: "crawlTask",
      timeRange: [],
      query: {
        siteId: null,
        downSystemId: null,
        taskStatus: null,
        taskExecuteResultType: null,
        crawlerId: null,
        bindLastStatus: null,
        dispatchStatus: null,
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
    utils.initFilterOptionShows.call(this);
    this.getData(true);
  },
  watch: {
    "pageSetting.filters.enabledFilters"(newVal) {
      utils.changeShowingFilters.call(this, newVal);
    },
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
      utils.getData.call(this, reset, false, true);
    },
  },
};
</script>
