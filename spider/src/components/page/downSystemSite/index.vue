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
      @seedUrl="showSeedUrl"
      @blkRule="showBlockRule"
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
    <seed ref="seed"/>
    <blockRule ref="blockRule"/>
    <batchEdit ref="batchEdit" :ids="batchEditSetting.ids" @success="onBatchEditSuccess" />
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
export default {
  components: {
    edit,
    add,
    batchEdit,
    seed,
    blockRule
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
            utils.column("urlMaxCrawlCount", "MxTry"),
            utils.column("urlMaxDepth", "MxDep"),
            utils.column("urlMatchPatterns", "Patterns"),
            utils.enumColumn("enableStatus", null, "Status"),
            utils.dateColumn("createTime", "CTime"),
            utils.operateColumn(
              [
                utils.operation("edit"),
                utils.operation("delete"),
                utils.operation("blkRule"),
                 utils.operation("seedUrl"),
              ],
              { width: "250px" }
            ),
          ],
          showingColumns: [
            "Checkbox",
            "siteId",
            "downSystemId",
            "priority",
            "crawlerCrawlType",
            "tskRate",
            "concur",
            "taskTimeout",
            "urlCplt",
            "urlBdRt",
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
    utils.initFilterOptionShows.call(this);
    this.getData(true);
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
    
    showBlockRule(row){
  this.$refs.blockRule.show(row.id);
    },

    showSeedUrl(row){
     this.$refs.seed.show(row.id);
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
