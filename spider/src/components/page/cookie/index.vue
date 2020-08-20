<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
      <MySelect v-show="showSiteId" v-model="siteId" title="Site" enum="Site" width="200px" />
      <MySelect
        v-show="showSiteAccountId"
        v-model="query.siteAccountId"
        :options="accountOptions"
        title="Account"
        value="id"
        label="account"
        width="200px"
      />
      <span>
        <QueryButton @click="getData(true)" />
        <CreateButton @click="showAdd" />
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
      :selectedColumns="pageSetting.table.showingColumns"
      @delete="showDelete"
    />
    <MyPager
      :current="query.pageIndex"
      :total="data.total"
      @onSizeChanged="onPageSizeChanged"
      @onIndexChanged="onPageIndexChanged"
    />
    <add ref="add" :model="addSetting.model" :title="addSetting.title"></add>
    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
  import utils from "./../../../common";
  import add from "./add";
  export default {
    components: {
      add,
    },
    data() {
      return {
        pageSetting: {
          filters: {
            options: utils.options(["TimeRange", "SiteId", "SiteAccountId"]),
            enabledFilters: ["TimeRange", "SiteId", "SiteAccountId"],
          },
          table: {
            columns: [
              utils.CHECKBOX_COLUMN,
              utils.enumColumn("siteId", "Site", "Site"),
              utils.enumColumn("siteAccountId", "Account", "Account"),
              utils.column("cookie"),
              utils.column("loginIp"),
              utils.positiveProgress("usage", "maxUseCount", "currentUseCount"),
              utils.column("maxUseCount", "mxUseCount"),
              utils.column("currentUseCount", "CurUCon"),
              utils.positiveProgress("blkRate", "maxBlockCount", "currentBlockCount"),
              utils.column("maxBlockCount", "mxBlkCnt"),
              utils.column("currentBlockCount", "CurBCon"),
              utils.dateColumn("expireTime", "ExpTime"),
              utils.dateColumn("createTime", "CTime"),
              utils.operateColumn([utils.operation("delete")]),
            ],
            showingColumns: [
              "Checkbox",
              "siteId",
              "siteAccountId",
              "loginIp",
              "blkRate",
              "usage",
              "expireTime",
              "createTime",
              "test",
            ],
          },
        },
        api: "cookie",
        siteId: null,
        accountOptions: [],
        addSetting: utils.addSetting(),
        timeRange: [],
        query: {
          siteAccountId: null,
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
      async siteId(newVal) {
        this.query.siteAccountId = null;
        this.accountOptions = [];
        let resp = await this.$api.siteAccount.getBySite({ siteId: this.siteId });
        this.accountOptions = resp.data;
      },
    },
    methods: {
      showAdd() {
        this.addSetting.title = "add";
        this.addSetting.model = {};
        this.$refs.add.show();
      },
      showDelete(row) {
        this.$utils.showComfirm.call(this, "Warning", `are you sure to delete this data?`, () => {
          this.$utils.handleNormalRequest.call(this, async () => {
            let resp = await this.$api.cookie.deleteById({ id: row.id });
            if (resp.code == 100) this.data.list = this.data.list.filter((x) => x.id != row.id);
            this.data.total -= 1;
            return resp;
          });
        });
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
                async () => this.$api.cookie.deleteBatch(this.getIds()),
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
        return this.$utils.pickObjectArrayFileds(this.$refs.table.getSelection(), "id");
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
