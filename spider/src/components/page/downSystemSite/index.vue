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
    </div>
    <ListBody
      ref="table"
      filter
      border
      stripe
      columnFilter
      :columns="pageSetting.table.defaultShowingColumns"
      :datas="data.list"
      @delete="showDelete"
      @edit="showEdit"
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
              lable: "DownSystemId",
              value: "DownSystemId",
            },
            {
              lable: "CrawlerCrawlType",
              value: "CrawlerCrawlType",
            },
            {
              lable: "CrawlerAutoDownloadPage",
              value: "CrawlerAutoDownloadPage",
            },
            {
              lable: "EnableStatus",
              value: "EnableStatus",
            },
          ],
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
            },
            {
              title: "ScriptId",
              slot: "scriptId",
              key: "scriptId",
            },
            {
              title: "DownSystemId",
              slot: "downSystemId",
              key: "downSystemId",
            },
            {
              title: "Priority",
              slot: "priority",
              key: "priority",
            },
            {
              title: "CrawlerPageEncoding",
              slot: "crawlerPageEncoding",
              key: "crawlerPageEncoding",
            },
            {
              title: "CrawlerPageTimeout",
              slot: "crawlerPageTimeout",
              key: "crawlerPageTimeout",
            },
            {
              title: "CrawlerCrawlType",
              slot: "crawlerCrawlType",
              key: "crawlerCrawlType",
            },
            {
              title: "CrawlerAutoDownloadPage",
              slot: "crawlerAutoDownloadPage",
              key: "crawlerAutoDownloadPage",
            },
            {
              title: "UrlMaxCacheCount",
              slot: "urlMaxCacheCount",
              key: "urlMaxCacheCount",
            },
            {
              title: "UrlFinishedCount",
              slot: "urlFinishedCount",
              key: "urlFinishedCount",
            },
            {
              title: "UrlBadCount",
              slot: "urlBadCount",
              key: "urlBadCount",
            },
            {
              title: "UrlTotalCount",
              slot: "urlTotalCount",
              key: "urlTotalCount",
            },
            {
              title: "UrlEncodes",
              slot: "urlEncodes",
              key: "urlEncodes",
            },
            {
              title: "UrlMaxCrawlCount",
              slot: "urlMaxCrawlCount",
              key: "urlMaxCrawlCount",
            },
            {
              title: "UrlMatchPatterns",
              slot: "urlMatchPatterns",
              key: "urlMatchPatterns",
            },
            {
              title: "BloomExpectedUrlSize",
              slot: "bloomExpectedUrlSize",
              key: "bloomExpectedUrlSize",
            },
            {
              title: "BloomFpp",
              slot: "bloomFpp",
              key: "bloomFpp",
            },
            {
              title: "BloomLastLoadingTime",
              slot: "bloomLastLoadingTime",
              key: "bloomLastLoadingTime",
            },
            {
              title: "TaskUrlBatchCount",
              slot: "taskUrlBatchCount",
              key: "taskUrlBatchCount",
            },
            {
              title: "TaskMaxWaitToBindCount",
              slot: "taskMaxWaitToBindCount",
              key: "taskMaxWaitToBindCount",
            },
            {
              title: "TaskCurrentBindCount",
              slot: "taskCurrentBindCount",
              key: "taskCurrentBindCount",
            },
            {
              title: "TaskMaxRunningCount",
              slot: "taskMaxRunningCount",
              key: "taskMaxRunningCount",
            },
            {
              title: "TaskCurrentRunningCount",
              slot: "taskCurrentRunningCount",
              key: "taskCurrentRunningCount",
            },
            {
              title: "TaskTimeout",
              slot: "taskTimeout",
              key: "taskTimeout",
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
              key: "Checkbox",
              title: "Ckbox",
              type: "selection",
              width: 60,
              align: "center",
            },
            {
              title: "System",
              slot: "downSystemId",
              key: "downSystemId",
              format: {
                type: "enum",
                pattern: "System",
              },
            },
            {
              title: "Site",
              slot: "siteId",
              key: "siteId",
              format: {
                type: "enum",
                pattern: "Site",
              },
            },

            {
              title: "Priority",
              slot: "priority",
              key: "priority",
            },
            {
              title: "Script",
              slot: "scriptPath",
              key: "scriptPath",
            },
            {
              title: "Encoding",
              slot: "crawlerPageEncoding",
              key: "crawlerPageEncoding",
            },
            {
              title: "PageTut",
              slot: "crawlerPageTimeout",
              key: "crawlerPageTimeout",
            },
            {
              title: "CrawlType",
              slot: "crawlerCrawlType",
              key: "crawlerCrawlType",
              format: {
                type: "enum",
                pattern: "CrawlType",
              },
            },
            {
              title: "DldPage",
              slot: "crawlerAutoDownloadPage",
              key: "crawlerAutoDownloadPage",
                format: {
                type: "enum",
                pattern: "YesNo",
              },
            },
            {
              title: "MaxCache",
              slot: "urlMaxCacheCount",
              key: "urlMaxCacheCount",
            },
            {
              title: "UrlFinished",
              slot: "urlFinishedCount",
              key: "urlFinishedCount",
            },
            {
              title: "UrlBad",
              slot: "urlBadCount",
              key: "urlBadCount",
            },
            {
              title: "UrlTotal",
              slot: "urlTotalCount",
              key: "urlTotalCount",
            },
            {
              title: "Encodes",
              slot: "urlEncodes",
              key: "urlEncodes",
            },
            {
              title: "MaxTry",
              slot: "urlMaxCrawlCount",
              key: "urlMaxCrawlCount",
            },
              {
              title: "MaxDepth",
              slot: "urlMaxDepth",
              key: "urlMaxDepth",
            },
            {
              title: "Patterns",
              slot: "urlMatchPatterns",
              key: "urlMatchPatterns",
            },
            {
              title: "EptUrlSe",
              slot: "bloomExpectedUrlSize",
              key: "bloomExpectedUrlSize",
            },
            {
              title: "Fpp",
              slot: "bloomFpp",
              key: "bloomFpp",
            },
            {
              title: "BatchCnt",
              slot: "taskUrlBatchCount",
              key: "taskUrlBatchCount",
            },
            {
              title: "MaxBd",
              slot: "taskMaxWaitToBindCount",
              key: "taskMaxWaitToBindCount",
            },
            {
              title: "CurBd",
              slot: "taskCurrentBindCount",
              key: "taskCurrentBindCount",
            },
            {
              title: "MaxCon",
              slot: "taskMaxRunningCount",
              key: "taskMaxRunningCount",
            },
            {
              title: "CurCon",
              slot: "taskCurrentRunningCount",
              key: "taskCurrentRunningCount",
            },
            {
              title: "TaskTut",
              slot: "taskTimeout",
              key: "taskTimeout",
            },
            {
              title: "Status",
              slot: "enableStatus",
              key: "enableStatus",
              format: {
                type: "enum",
                pattern: "EnableStatus",
              },
            },
            {
              title: "CTime",
              slot: "createTime",
              key: "createTime",
              format: {
                type: "date",
              },
            },
            {
              title: "Op",
              key: "test",
              slot: "test",
              isOperation: true,
              width: "120px",
              operations: [
                {
                  name: "edit",
                  label: "Edit",
                  match: (row) => true,
                },
                {
                  name: "delete",
                  label: "Delete",
                  match: (row) => true,
                },
              ],
            },
          ],
          showingColumns: [
            "Checkbox",
            "siteId",
            "downSystemId",
            "priority",
            "crawlerCrawlType",
            "taskMaxWaitToBindCount",
            "taskCurrentBindCount",
            "taskMaxRunningCount",
            "taskCurrentRunningCount",
            "taskTimeout",
            "enableStatus",
            "createTime",
            "test",
          ],
        },
      },

      editSetting: {
        model: {},
        title: "edit",
      },

      addSetting: {
        model: {},
        title: "add",
      },

      batchEditSetting: {
        model: "",
        title: "batch edit",
        ids: [],
      },


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

    showDownSystemId() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "DownSystemId"
      );
    },

    showCrawlerCrawlType() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "CrawlerCrawlType"
      );
    },

    showCrawlerAutoDownloadPage() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "CrawlerAutoDownloadPage"
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
    showAdd() {
      this.addSetting.title = "add";
      this.addSetting.model = {};
      this.$refs.add.show();
    },

    showEdit(row) {
      this.editSetting.title = "edit";
      this.editSetting.model = row;
      this.$refs.edit.show();
    },
    onEditSuccess(row) {
      let data = this.data.list.filter((x) => x.id == row.id);
      if (data.length > 0) this.$utils.copyFieldsFrom(data[0], row);
    },

    batchEdit() {
      if (this.checkCount()) {
        this.batchEditSetting.ids = this.getIds();
        this.$refs.batchEdit.show();
      }
    },
    onBatchEditSuccess(data) {
      let set = new Set(data.ids);
      this.data.list.forEach((x) => {
        if (set.has(x.id)) this.$utils.copyFieldsFrom(x, data);
      });
    },

    showDelete(row) {
      this.$utils.showComfirm.call(
        this,
        "Warning",
        `are you sure to delete this data?`,
        () => {
          this.$utils.handleNormalRequest.call(this, async () => {
            let resp = await this.$api.downSystemSite.deleteById({
              id: row.id,
            });
            if (resp.code == 100)
              this.data.list = this.data.list.filter((x) => x.id != row.id);
            this.data.total -= 1;

            return resp;
          });
        }
      );
    },

    batchDelete() {
      if (this.checkCount()) {
        this.$utils.showComfirm.call(
          this,
          "Warning",
          `are you sure to delete these data?`,
          () => {
            this.$utils.handleNormalRequest.call(
              this,
              async () => this.$api.downSystemSite.deleteBatch(this.getIds()),
              true
            );
          }
        );
      }
    },

    checkCount() {
      let items = this.$refs.table.getSelection();
      if (items.length == 0) {
        this.$Message.info("no data selected");
        return false;
      }
      return true;
    },

    getIds() {
      return this.$utils.pickObjectArrayFileds(
        this.$refs.table.getSelection(),
        "id"
      );
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
      if (reset) {
        this.query.pageIndex = 1;
      }


      this.query.createTimeStart = this.timeRange[0];
      this.query.createTimeEnd = this.timeRange[1];

      this.$utils.getListData.call(this, () =>
        this.$api.downSystemSite.getList(this.query)
      );
    },
  },
};
</script>