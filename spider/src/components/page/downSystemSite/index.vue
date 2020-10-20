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
      <MySelect
        v-show="showSiteId"
        v-model="query.siteId"
        title="Site"
        enum="Site"
        width="200px"
      />
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
      :datas="data.list"
      @del="showDelete"
      @edit="showEdit"
      @seeds="showSeedUrl"
      @blkRule="showBlockRule"
      @clone="clone"
      @rstJb="resetJob"
      @balance="balance"
      @rstCon="resetConcurrency"
      @dsptch="showDownSystemSiteDispatch"
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
    <seed ref="seed" />
    <downSystemSiteDispatch ref="downSystemSiteDispatch" />
    <blockRule ref="blockRule" />
    <balance ref="balance" />
    <resetJob ref="resetJob" />
    <batchEdit
      ref="batchEdit"
      :ids="batchEditSetting.ids"
      @success="onBatchEditSuccess"
    />
    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
import add from "./add";
import edit from "./edit";
import batchEdit from "./batchEdit";
import utils from "./../../../common";
import seed from "./seedUrlViewer";
import blockRule from "./blockRuleViewer";
import downSystemSiteDispatch from "./downSystemSiteDispatchViewer";
import balance from "./balance";
import resetJob from "./resetJob";
export default {
  components: {
    edit,
    add,
    batchEdit,
    seed,
    blockRule,
    downSystemSiteDispatch,
    balance,
    resetJob,
  },
  data() {
    return {
      pageSetting: {
        filters: {
          options: utils.options([
            "TimeRange",
            "Type",
            "SiteId",
            "DownSystemId",
            "CrawlerCrawlType",
            "CrawlerAutoDownloadPage",
            "EnableStatus",
            "RadioGroup",
          ]),
          enabledFilters: [
            "TimeRange",
            "SiteId",
            "Type",
            "DownSystemId",
            "CrawlerCrawlType",
            "CrawlerAutoDownloadPage",
            "EnableStatus",
            "RadioGroup",
          ],
        },
        table: {
          columns: [
            utils.CHECKBOX_COLUMN,
            utils.column("id"),
            utils.enumColumn("downSystemId", "System", "System",{ width: "120px" }),
            utils.enumColumn("siteId", "Site", "Site"),
            utils.linkColumn("name", "Name","homepageUrl", { width: "150px" }),
            utils.column("description"),
            utils.enumColumn(
              "downSystemSiteType",
              "DownSystemSiteType",
              "Type"
            ),
            utils.column("priority"),
            utils.column("scriptPath", "Script"),
            utils.column("crawlerPageEncoding", "Encd"),
            utils.column("crawlerPageTimeout", "PgTmt"),
            utils.enumColumn("crawlerCrawlType", "CrawlType", "CrlTp"),
            utils.enumColumn("crawlerAutoDownloadPage", "YesNo", "AtDldPg"),
            utils.column("bloomExpectedUrlSize", "EptUrlSz"),
            utils.column("bloomFpp", "Fpp"),
            utils.column("taskUrlBatchCount", "BchCnt"),
            utils.negativeProgress(
              "tskRate",
              "taskMaxCount",
              "taskCurrentCount"
            ),
            utils.column("taskMaxCount", "MxTsk"),
            utils.column("taskCurrentCount", "CrtTsk"),
            utils.negativeProgress(
              "concur",
              "taskMaxRunningCount",
              "taskCurrentRunningCount"
            ),
            utils.column("taskMaxRunningCount", "MxCon"),
            utils.column("taskCurrentRunningCount", "CrtCon"),
            utils.column("taskTimeout", "TaskTut"),
            utils.column("taskBindTimeout", "BdTut"),
            utils.column("taskUrlMaxFailCount", "TskUMxF"),
            utils.column("taskUrlMaxContinuouslyFailCount", "TskUMxCF"),
            utils.column("taskUrlMaxConcurrency", "TskUMxCon"),
            utils.negativeProgress(
              "urlCplt",
              "urlTotalCount",
              "urlFinishedCount"
            ),
            utils.positiveProgress("urlBdRt", "urlTotalCount", "urlBadCount"),
            utils.column("urlMaxCacheCount", "MxCache"),
            utils.column("urlFinishedCount", "FnshdUrl"),
            utils.column("urlBadCount", "BadUrl"),
            utils.column("urlTotalCount", "TtlUrl"),
            utils.column("urlEncodes", "Encodes"),
            utils.column("urlMaxCrawlCount", "UrlMxTry"),
            utils.column("urlMaxDepth", "UrlMxDep"),
            utils.column("urlMatchPatterns", "Patterns"),
            utils.column("runLimitMaxDays", "LmtMdays"),
            utils.column("runLimitMaxHours", "LmtMhours"),
            utils.column("urlFailedRetryTimeout", "UrlFRtryTmt"),
            utils.column("urlFailedRetryJobInterval", "UrlFRtryIn"),
            utils.dateColumn(
              "urlNextFailedRetryJobExecuteTime",
              "NRtryJb",
              "yyyy-MM-dd hh:mm"
            ),
             utils.dateColumn(
              "urlLastFailedRetryJobExecuteTime",
              "LFRtryJb",
              "yyyy-MM-dd hh:mm"
            ),
            utils.column("urlResetTimeout", "UrlRstTmt"),
            utils.column("urlResetJobInterval", "UrlRstIn"),
            utils.dateColumn(
              "urlNextResetJobExecuteTime",
              "NRstJb",
              "yyyy-MM-dd hh:mm"
            ),
            utils.dateColumn(
              "urlLastResetJobExecuteTime",
              "NRstJb",
              "yyyy-MM-dd hh:mm"
            ),
            utils.column("urlCacheTimeout", "UrlCchTmt"),
            utils.column("urlCacheTimeoutJobInterval", "UrlCchIn"),
            utils.dateColumn(
              "urlNextCacheTimeoutJobExecuteTime",
              "NCchJb",
              "yyyy-MM-dd hh:mm"
            ),
             utils.dateColumn(
              "urlLastCacheTimeoutJobExecuteTime",
              "LCchJb",
              "yyyy-MM-dd hh:mm"
            ),
            utils.enumColumn("runLimitAllowAutoBalance", "YesNo", "Balance"),
            utils.enumColumn("enableStatus", null, "Status"),
            utils.dateColumn("createTime", "CTime"),
            utils.operateColumn(
              [
                utils.operation("edit"),
                utils.operation("del"),
                utils.operation("clone"),
                utils.operation("balance"),
                utils.operation("rstCon"),
                utils.operation("rstJb"),
                utils.operation("blkRule"),
                utils.operation("seeds"),
                utils.operation(
                  "dsptch",
                  (row) => row.downSystemSiteType == 2
                ),
              ],
              { width: "480px" }
            ),
          ],
          showingColumns: [
            // "Checkbox",
            // "siteId",
            "name",
            "downSystemId",
            "downSystemSiteType",
            // "crawlerCrawlType",
            // "tskRate",
            "concur",
            // "taskTimeout",
            "urlCplt",
            // "urlBdRt",
            "enableStatus",
            // "createTime",
            "test",
          ],
        },
      },
      editSetting: utils.editSetting(),
      addSetting: utils.addSetting(),
      batchEditSetting: utils.batchEditSetting(),
      api: "downSystemSite",
      timeRange: [],
      radioKey: "name",
      radioOptions: utils.radioOptions(["name"]),
      query: {
        siteId: null,
        name:null,
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
    utils.initFilterOptionShows.call(this);
    if (!utils.restoreIndex("/downSystemSite/index", this)) this.getData(true);
  },
  beforeDestroy() {
    utils.snapShotIndex("/downSystemSite/index", this);
  },
  watch: {
    "pageSetting.filters.enabledFilters"(newVal) {
      utils.changeShowingFilters.call(this, newVal);
    },
  },
  methods: {
    showAdd(model, title) {
      utils.showAdd.call(this, model, title);
    },
    showEdit(row) {
      utils.showEdit.call(this, row);
    },

    showBlockRule(row) {
      this.$refs.blockRule.show(row.id);
    },

    showDownSystemSiteDispatch(row) {
      this.$refs.downSystemSiteDispatch.show(row.id);
    },

    showSeedUrl(row) {
      this.$refs.seed.show(row.id);
    },

    clone(row) {
      let model = this.$utils.clone(row);
      model.id = null;
      model.name = null;
      this.addSetting.model = model;
      this.showAdd();
    },

    balance(row) {
      this.$refs.balance.show(row.id);
    },

    resetJob(row) {
      this.$refs.resetJob.show(row);
    },

    resetConcurrency(row) {
      this.$utils.handleNormalRequest.call(this, async () => {
        let resp = await this.$api.downSystemSite.resetConcurrency({
          downSystemSiteId: row.id,
        });
        if (resp && resp.code == 100) this.getData();

        return resp;
      });
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
