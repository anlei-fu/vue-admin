<template>
  <div>
    <div>
      <span style="float:right">
        <Icon type="md-settings" size="20" @click="showSetting" />
      </span>
    </div>
    <div class="filter">
      <MyDateRange v-model="timeRange" />

      <MySelect
        v-show="showSiteId"
        v-model="query.siteId"
        title="Site"
        enum="Site"
        width="200px"
      />

      <MySelect
        v-show="showDownSystemSiteId"
        v-model="query.downSystemSiteId"
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
        enum="ProxyId"
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
    </div>
    <ListBody
      ref="table"
      filter
      border
      stripe
      columnFilter
      :columns="pageSetting.table.defaultShowingColumns"
      :datas="data.list"
      :selectedColumns="pageSetting.table.showingColumns"
    />
    <div class="pager">
      <MyPager
        :current="query.pageIndex"
        :total="data.total"
        @onSizeChanged="onPageSizeChanged"
        @onIndexChanged="onPageIndexChanged"
      />
    </div>

    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      pageSetting: {
        filters: {
          options: [
            {
              lable: "TimeRange",
              value: "TimeRange",
            },
            {
              lable: "SiteId",
              value: "SiteId",
            },
            {
              lable: "DownSystemSiteId",
              value: "DownSystemSiteId",
            },
            {
              lable: "TaskStatus",
              value: "TaskStatus",
            },
            {
              lable: "TaskExecuteResultType",
              value: "TaskExecuteResultType",
            },
            {
              lable: "CrawlerId",
              value: "CrawlerId",
            },
            {
              lable: "BindLastStatus",
              value: "BindLastStatus",
            },
            {
              lable: "DispatchStatus",
              value: "DispatchStatus",
            },
            {
              lable: "ProxyId",
              value: "ProxyId",
            },
            {
              lable: "EnableStatus",
              value: "EnableStatus",
            },
          ],
          enabledFilters: [
            "TimeRange",
            "SiteId",
            "DownSystemSiteId",
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
          allColumns: [
            {
              title: "Id",
              slot: "id",
              key: "id",
            },
            {
              title: "SiteId",
              slot: "siteId",
              key: "siteId",
              format: {
                type: "enum",
                pattern: "Site",
              },
            },
            {
              title: "DownSystemSiteId",
              slot: "downSystemSiteId",
              key: "downSystemSiteId",
              format: {
                type: "enum",
                pattern: "System",
              },
            },
            {
              title: "TaskTimeoutTime",
              slot: "taskTimeoutTime",
              key: "taskTimeoutTime",
            },
            {
              title: "TaskStatus",
              slot: "taskStatus",
              key: "taskStatus",
            },
            {
              title: "TaskExecuteResultType",
              slot: "taskExecuteResultType",
              key: "taskExecuteResultType",
            },
            {
              title: "CrawlerId",
              slot: "crawlerId",
              key: "crawlerId",
            },
            {
              title: "BindLastStatus",
              slot: "bindLastStatus",
              key: "bindLastStatus",
            },
            {
              title: "BindLastMsg",
              slot: "bindLastMsg",
              key: "bindLastMsg",
            },
            {
              title: "BindLastTime",
              slot: "bindLastTime",
              key: "bindLastTime",
            },
            {
              title: "BindCount",
              slot: "bindCount",
              key: "bindCount",
            },
            {
              title: "DispatchStatus",
              slot: "dispatchStatus",
              key: "dispatchStatus",
            },
            {
              title: "DispatchTime",
              slot: "dispatchTime",
              key: "dispatchTime",
            },
            {
              title: "DispatchMsg",
              slot: "dispatchMsg",
              key: "dispatchMsg",
            },
            {
              title: "CookieId",
              slot: "cookieId",
              key: "cookieId",
            },
            {
              title: "Cookie",
              slot: "cookie",
              key: "cookie",
            },
            {
              title: "ProxyId",
              slot: "proxyId",
              key: "proxyId",
            },
            {
              title: "TaskStartTime",
              slot: "taskStartTime",
              key: "taskStartTime",
            },
            {
              title: "TaskFinishTime",
              slot: "taskFinishTime",
              key: "taskFinishTime",
            },
            {
              title: "SuccessUrlCount",
              slot: "successUrlCount",
              key: "successUrlCount",
            },
            {
              title: "UrlFailedCount",
              slot: "urlFailedCount",
              key: "urlFailedCount",
            },
            {
              title: "UrlNewCount",
              slot: "urlNewCount",
              key: "urlNewCount",
            },
            {
              title: "UrlBadCount",
              slot: "urlBadCount",
              key: "urlBadCount",
            },
            {
              title: "AverageSpeedOfAll",
              slot: "averageSpeedOfAll",
              key: "averageSpeedOfAll",
            },
            {
              title: "AverageSpeedOfSuccess",
              slot: "averageSpeedOfSuccess",
              key: "averageSpeedOfSuccess",
            },
            {
              title: "MeanSpeedOfSuccess",
              slot: "meanSpeedOfSuccess",
              key: "meanSpeedOfSuccess",
            },
            {
              title: "MaxSpeedOfSuccess",
              slot: "maxSpeedOfSuccess",
              key: "maxSpeedOfSuccess",
            },
            {
              title: "EnableStatus",
              slot: "enableStatus",
              key: "enableStatus",
            },
            {
              title: "CreateTime",
              slot: "createTime",
              key: "createTime",
            },
          ],
          defaultShowingColumns: [
            {
              title: "Id",
              slot: "id",
              key: "id",
            },      {
              title: "System",
              slot: "downSystemId",
              key: "downSystemId",
                   format:{
		      type:"enum",pattern:"System"
	      }
            },
            {
              title: "Site",
              slot: "siteId",
              key: "siteId",
                   format:{
		      type:"enum",pattern:"Site"
	      }
            },

           
            {
              title: "TStatus",
              slot: "taskStatus",
              key: "taskStatus",
              format: {
                type: "enum",
                pattern: "TaskStatus",
              },
            },
            {
              title: "Result",
              slot: "taskExecuteResultType",
              key: "taskExecuteResultType",
              format: {
                type: "enum",
                pattern: "TaskResult",
              },
            },
            {
              title: "Crawler",
              slot: "crawlerId",
              key: "crawlerId",
                format: {
                type: "enum",
                pattern: "Crawler",
              },
            },
            {
              title: "BdResult",
              slot: "bindLastResult",
              key: "bindLastResult",
              format: {
                type: "enum",
                pattern: "BindResult",
              },
            },
            {
              title: "BdMsg",
              slot: "bindLastMsg",
              key: "bindLastMsg",
            },
            {
              title: "BdTime",
              slot: "bindLastTime",
              key: "bindLastTime",
              format: {
                type: "date",
              },
            },
            {
              title: "BdCnt",
              slot: "bindCount",
              key: "bindCount",
            },
            {
              title: "DspthResult",
              slot: "dispatchLastResult",
              key: "dispatchLastResult",
              format: {
                type: "enum",
                pattern: "DispatchResult",
              },
            },
            {
              title: "DsptchTime",
              slot: "dispatchLastTime",
              key: "dispatchLastTime",
              format: {
                type: "date",
              },
            },
            {
              title: "DsptchMsg",
              slot: "dispatchLastMsg",
              key: "dispatchLastMsg",
            },
             
              {
              title: "Bdimeout",
              slot: "bindTimeoutTime",
              key: "bindTimeoutTime",
              format: {
                type: "date",
              },
            },
            {
              title: "Timeout",
              slot: "taskTimeoutTime",
              key: "taskTimeoutTime",
              format: {
                type: "date",
              },
            },
            {
              title: "Account",
              slot: "siteAccountId",
              key: "siteAccountId",
               format: {
                type: "enum",
                pattern: "Account",
              },
            },
            {
              title: "Proxy",
              slot: "proxyId",
              key: "proxyId",
                format: {
                type: "enum",
                pattern: "Proxy",
              },
            },
            {
              title: "Start",
              slot: "taskStartTime",
              key: "taskStartTime",
              format: {
                type: "date",
              },
            },
            {
              title: "Finish",
              slot: "taskFinishTime",
              key: "taskFinishTime",
              format: {
                type: "date",
              },
            },
            {
              title: "SucUrlCnt",
              slot: "successUrlCount",
              key: "successUrlCount",
            },
            {
              title: "FailCnt",
              slot: "urlFailedCount",
              key: "urlFailedCount",
            },
            {
              title: "NewCnt",
              slot: "urlNewCount",
              key: "urlNewCount",
            },
            {
              title: "BadCnt",
              slot: "urlBadCount",
              key: "urlBadCount",
            },
            {
              title: "SpdOfAll",
              slot: "averageSpeedOfAll",
              key: "averageSpeedOfAll",
            },
            {
              title: "SpdOfSuc",
              slot: "averageSpeedOfSuccess",
              key: "averageSpeedOfSuccess",
            },
            {
              title: "MeanSpdOfSuc",
              slot: "meanSpeedOfSuccess",
              key: "meanSpeedOfSuccess",
            },
            {
              title: "MaxSpdOfSuc",
              slot: "maxSpeedOfSuccess",
              key: "maxSpeedOfSuccess",
            },
            {
              title: "CTime",
              slot: "createTime",
              key: "createTime",
              format: {
                type: "date",
              },
            },
          ],
          showingColumns: [
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

      timeRange: [],

      query: {
        siteId: null,
        downSystemSiteId: null,
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
      // data set
      data: {
        total: 0,
        list: [],
      },
    };
  },

  created() {
    this.getData(true);
  },

  // toggle filters show status
  computed: {
    showTimeRange() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "TimeRange"
      );
    },

    showSiteId() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "SiteId"
      );
    },

    showDownSystemSiteId() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "DownSystemSiteId"
      );
    },

    showTaskStatus() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "TaskStatus"
      );
    },

    showTaskExecuteResultType() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "TaskExecuteResultType"
      );
    },

    showCrawlerId() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "CrawlerId"
      );
    },

    showBindLastStatus() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "BindLastStatus"
      );
    },

    showDispatchStatus() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "DispatchStatus"
      );
    },

    showProxyId() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "ProxyId"
      );
    },

    showEnableStatus() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "EnableStatus"
      );
    },
  },

  methods: {
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
      if (reset) {
        this.query.pageIndex = 1;
      }

      this.query.createTimeStart = this.timeRange[0];
      this.query.createTimeEnd = this.timeRange[1];

      this.$utils.getListData.call(this, () =>
        this.$api.crawlTask.getList(this.query)
      );
    },
  },
};
</script>