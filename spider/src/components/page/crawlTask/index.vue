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
      @dispatchRecord="showDispatchRecord"
      @bindRecord="showBindRecord"
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
              utils.enumColumn("taskStatus", null, "TStatus"),
              utils.enumColumn("taskExecuteResultType", "TaskResult", "Result"),
              utils.enumColumn("crawlerId", "Crawler", "Crawler"),
              utils.enumColumn("bindLastResult", "BindResult", "BdResult"),
              utils.column("bindLastMsg", "BdMsg"),
              utils.dateColumn("bindLastTime"),
              utils.column("bindCount", "BdCnt"),
              utils.enumColumn("dispatchLastResult", "DispatchResult", "DspthResult"),
              utils.dateColumn("dispatchLastTime"),
              utils.column("dispatchLastMsg", "DsptchMsg"),
              utils.dateColumn("bindTimeoutTime", "BdTut"),
              utils.dateColumn("taskTimeoutTime", "ExeTut"),
              utils.enumColumn("siteAccountId", "Account", "Account"),
              utils.enumColumn("proxyId", "Proxy", "Proxy"),
              utils.dateColumn("taskStartTime", "Start"),
              utils.dateColumn("taskFinishTime", "Finish"),
              utils.column("successUrlCount", "SucUrlCnt"),
              utils.column("urlFailedCount", "FailCnt"),
              utils.column("urlNewCount", "NewCnt"),
              utils.column("urlBadCount", "BadCnt"),
              utils.column("averageSpeedOfAll", "SpdOfAll"),
              utils.column("averageSpeedOfSuccess", "SpdOfSuc"),
              utils.column("meanSpeedOfSuccess", "MeanSpdOfSuc"),
              utils.column("maxSpeedOfSuccess", "MaxSpdOfSuc"),
              utils.dateColumn("createTime", "Ctime"),
              utils.operateColumn([
                utils.operation("bindRecord"),
                utils.operation("dispatchRecord"),
              ]),
            ],
            showingColumns: [
              "test",
              "downSystemId",
              "siteId",
              "taskTimeoutTime",
              "bindTimeoutTime",
              "taskStatus",
              "taskExecuteResultType",
              "bindLastStatus",
              "bindCount",
              "dispatchStatus",
              "taskStartTime",
              "taskFinishTime",
              "enableStatus",
              "createTime",
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
      utils.initFilterOptionShow.call(this);
      this.getData(true);
    },
    watch: {
      "pageSetting.filters.enabledFilters"(newVal) {
        let set = new Set(newVal);
        this.pageSetting.filters.options.forEach((op) => {
          if (set.has(op.value)) {
            this["show" + op.value] = true;
          } else {
            this["show" + op.value] = false;
          }
        });
      },
    },
    methods: {
      showBindRecord(row) {
        debugger;
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
