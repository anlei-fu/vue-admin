<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
      <MySelect
        v-show="showDownSystemId"
        v-model="query.downSystemId"
        title="System"
        enum="System"
        width="200px"
      />
      <MySelect v-show="showSiteId" v-model="query.siteId" title="Site" enum="Site" width="200px" />
      <MySelect
        v-show="showCrawlerCrawlType"
        v-model="query.crawlerCrawlType"
        title="CrawlType"
        enum="CrawlType"
        width="200px"
      />
      <MySelect
        v-show="showCrawlerAutoDownloadPage"
        v-model="query.crawlerAutoDownloadPage"
        title="AutoDownloadPage"
        enum="YesNo"
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
        <CreateButton @click="showAdd" />
        <BatchEditButton @click="batchEdit" />
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
      @edit="showEdit"
      :selectedColumns="pageSetting.table.showingColumns"
    />
    <MyPager
      :current="query.pageIndex"
      :total="data.total"
      @onSizeChanged="onPageSizeChanged"
      @onIndexChanged="onPageIndexChanged"
    />
    <add ref="add" :model="addSetting.model" :title="addSetting.title"></add>
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
              "SiteId",
              "DownSystemId",
              "CrawlerCrawlType",
              "CrawlerAutoDownloadPage",
              "EnableStatus",
            ]),
            enabledFilters: [
              "TimeRange",
              "SiteId",
              "DownSystemId",
              "CrawlerCrawlType",
              "CrawlerAutoDownloadPage",
              "EnableStatus",
            ],
          },
          table: {
            columns: [
              utils.CHECKBOX_COLUMN,
              utils.enumColumn("downSystemId", "System", "System"),
              utils.enumColumn("siteId", "Site", "Site"),
              utils.column("priority"),
              utils.column("scriptPath", "Script"),
              utils.column("crawlerPageEncoding", "Encoding"),
              utils.column("crawlerPageTimeout", "PageTut"),
              utils.enumColumn("crawlerCrawlType", "CrawlType", "CrawlType"),
              utils.enumColumn("crawlerAutoDownloadPage", "YesNo", "DldPage"),
              utils.column("urlMaxCacheCount", "MaxCache"),
              utils.column("urlFinishedCount", "UrlFinished"),
              utils.column("urlBadCount", "UrlBad"),
              utils.column("urlTotalCount", "UrlTotal"),
              utils.column("urlEncodes", "Encodes"),
              utils.column("urlMaxCrawlCount", "MaxTry"),
              utils.column("urlMaxDepth", "MaxDepth"),
              utils.column("urlMatchPatterns", "Patterns"),
              utils.column("bloomExpectedUrlSize", "EptUrlSe"),
              utils.column("bloomFpp", "Fpp"),
              utils.column("taskUrlBatchCount", "BatchCnt"),
              utils.negativeProgress("bindRate", "taskMaxWaitToBindCount", "taskCurrentBindCount"),
              utils.column("taskMaxWaitToBindCount", "MaxBd"),
              utils.column("taskCurrentBindCount", "CurBd"),
              utils.negativeProgress(
                "concurrency",
                "taskMaxRunningCount",
                "taskCurrentRunningCount"
              ),
              utils.column("taskMaxRunningCount", "MaxCon"),
              utils.column("taskCurrentRunningCount", "CurCon"),
              utils.column("taskTimeout", "TaskTut"),
              utils.column("taskUrlMaxFailCount", "TUMaxFail"),
              utils.column("taskUrlMaxContinuouslyFailCount", "TUMCFail"),
              utils.column("taskUrlMaxConcurrency", "TUMaxCon"),
              utils.enumColumn("enableStatus", null, "Status"),
              utils.dateColumn("createTime", "CTime"),
              utils.operateColumn([utils.operation("edit"), utils.operation("delete")]),
            ],
            showingColumns: [
              "Checkbox",
              "siteId",
              "downSystemId",
              "priority",
              "crawlerCrawlType",
              "bindRate",
              "concurrency",
              "taskTimeout",
              "enableStatus",
              "createTime",
              "test",
            ],
          },
        },
        editSetting: utils.editSetting(),
        addSetting: utils.addSetting(),
        batchEditSetting: utils.batchEditSetting(),
        api: "downSystemSite",
        timeRange: [],
        query: {
          siteId: null,
          downSystemId: null,
          crawlerCrawlType: null,
          crawlerAutoDownloadPage: null,
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
      showAdd() {
        utils.showAdd.call(this);
      },
      showEdit(row) {
        utils.showEdit.call(this, row);
      },
      onEditSuccess(row) {
        utils.onEditSuccess.call(this, row);
      },
      batchEdit() {
        utils.batchEdit.call(this);
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
        utils.getData.call(this, reset, false, true);
      },
    },
  };
</script>
