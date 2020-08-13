<template>
  <div>
    <div>
      <span style="float:right">
        <Icon type="md-settings" size="20" @click="showSetting" />
      </span>
    </div>
    <div class="filter">
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
      </span>

      <BatchDeleteButton @click="batchDelete" />
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
      @delete="showDelete"
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

    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
import add from "./add";

export default {
  components: {
    add,
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
              lable: "SiteAccountId",
              value: "SiteAccountId",
            },
          ],
          enabledFilters: ["TimeRange", "SiteId", "SiteAccountId"],
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
              title: "SiteAccountId",
              slot: "siteAccountId",
              key: "siteAccountId",
            },
            {
              title: "Cookie",
              slot: "cookie",
              key: "cookie",
            },
            {
              title: "LoginIp",
              slot: "loginIp",
              key: "loginIp",
            },
            {
              title: "CurrentBlockCount",
              slot: "currentBlockCount",
              key: "currentBlockCount",
            },
            {
              title: "CurrentUseCount",
              slot: "currentUseCount",
              key: "currentUseCount",
            },
            {
              title: "ExpireTime",
              slot: "expireTime",
              key: "expireTime",
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
              title: "Site",
              slot: "siteId",
              key: "siteId",
              format: {
                type: "enum",
                pattern: "Site",
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
              title: "Cookie",
              slot: "cookie",
              key: "cookie",
            },
            {
              title: "LoginIp",
              slot: "loginIp",
              key: "loginIp",
            },
            {
              title: "CurBCon",
              slot: "currentBlockCount",
              key: "currentBlockCount",
            },
            {
              title: "CurUCon",
              slot: "currentUseCount",
              key: "currentUseCount",
            },
            {
              title: "Expire",
              slot: "expireTime",
              key: "expireTime",
              format: {
                type: "date",
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
            "siteAccountId",
            "loginIp",
            "currentBlockCount",
            "currentUseCount",
            "expireTime",
            "createTime",
            "test",
          ],
        },
      },

      siteId: null,
      accountOptions: [],
      addSetting: {
        model: {},
        title: "add",
      },

      timeRange: [],

      query: {
        siteAccountId: null,
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
  watch: {
    async siteId(newVal) {
      this.query.siteAccountId = null;
      this.accountOptions = [];
      let resp = await this.$api.siteAccount.getBySite({ siteId: this.siteId });
      this.accountOptions = resp.data;
    },
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

    showSiteAccountId() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "SiteAccountId"
      );
    },
  },

  methods: {
    showAdd() {
      this.addSetting.title = "add";
      this.addSetting.model = {};
      this.$refs.add.show();
    },

    showDelete(row) {
      this.$utils.showComfirm.call(
        this,
        "Warning",
        `are you sure to delete this data?`,
        () => {
          this.$utils.handleNormalRequest.call(this, async () => {
            let resp = await this.$api.cookie.deleteById({ id: row.id });
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
        this.$api.cookie.getList(this.query)
      );
    },
  },
};
</script>