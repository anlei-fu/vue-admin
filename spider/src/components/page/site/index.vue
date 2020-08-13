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
        v-show="showParentSiteId"
        v-model="query.parentSiteId"
        title="ParentSite"
        enum="Site"
        width="200px"
      />

      <MySelect
        v-show="showCrawlNeedUseCookie"
        v-model="query.crawlNeedUseCookie"
        title="NeedCookie"
        enum="YesNo"
        width="200px"
      />

      <MySelect
        v-show="showLoginNeedVcode"
        v-model="query.loginNeedVcode"
        title="LoginNeedVcode"
        enum="YesNo"
        width="200px"
      />

      <MySelect
        v-show="showLoginCaptaType"
        v-model="query.loginCaptaType"
        title="LoginCaptaType"
        enum="LoginCaptaType"
        width="200px"
      />

      <MySelect
        v-show="showNeedUseProxy"
        v-model="query.needUseProxy"
        title="NeedProxy"
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
        <Input v-model="keyword" style="width:200px;" />
      </span>

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
      :selectedColumns="pageSetting.table.showingColumns"
      @edit="showEdit"
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
              lable: "ParentSiteId",
              value: "ParentSiteId",
            },
            {
              lable: "CrawlNeedUseCookie",
              value: "CrawlNeedUseCookie",
            },
            {
              lable: "LoginNeedVcode",
              value: "LoginNeedVcode",
            },
            {
              lable: "LoginCaptaType",
              value: "LoginCaptaType",
            },
            {
              lable: "NeedUseProxy",
              value: "NeedUseProxy",
            },
            {
              lable: "EnableStatus",
              value: "EnableStatus",
            },
              {
              lable: "RadioGroup",
              value: "RadioGroup",
            },
          ],
          enabledFilters: [
            "TimeRange",
            "ParentSiteId",
            "CrawlNeedUseCookie",
            "LoginNeedVcode",
            "LoginCaptaType",
            "NeedUseProxy",
            "EnableStatus",
            "RadioGroup"
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
              title: "Name",
              slot: "name",
              key: "name",
            },
            {
              title: "Domain",
              slot: "domain",
              key: "domain",
            },
            {
              title: "Description",
              slot: "description",
              key: "description",
            },
            {
              title: "HomePageUrl",
              slot: "homePageUrl",
              key: "homePageUrl",
            },
            {
              title: "ParentSiteId",
              slot: "parentSiteId",
              key: "parentSiteId",
            },
            {
              title: "CrawlNeedUseCookie",
              slot: "crawlNeedUseCookie",
              key: "crawlNeedUseCookie",
              format: {
                type: "enum",
                pattern: "YesNo",
              },
            },
            {
              title: "LoginScriptId",
              slot: "loginScriptId",
              key: "loginScriptId",
            },
            {
              title: "LoginNeedVcode",
              slot: "loginNeedVcode",
              key: "loginNeedVcode",
              format: {
                type: "enum",
                pattern: "YesNo",
              },
            },
            {
              title: "LoginCaptaType",
              slot: "loginCaptaType",
              key: "loginCaptaType",
              format: {
                type: "enum",
                pattern: "LoginCaptaType",
              },
            },
            {
              title: "NeedUseProxy",
              slot: "needUseProxy",
              key: "needUseProxy",
              format: {
                type: "enum",
                pattern: "YesNo",
              },
            },
            {
              title: "IpDelayTimeout",
              slot: "ipDelayTimeout",
              key: "ipDelayTimeout",
            },
            {
              title: "IpBlockTimeout",
              slot: "ipBlockTimeout",
              key: "ipBlockTimeout",
            },
            {
              title: "IpHourSpeedLimit",
              slot: "ipHourSpeedLimit",
              key: "ipHourSpeedLimit",
            },
            {
              title: "IpMinuteSpeedLimit",
              slot: "ipMinuteSpeedLimit",
              key: "ipMinuteSpeedLimit",
            },
            {
              title: "IpDaySpeedLimit",
              slot: "ipDaySpeedLimit",
              key: "ipDaySpeedLimit",
            },
            {
              title: "AccountAllowCrossIp",
              slot: "accountAllowCrossIp",
              key: "accountAllowCrossIp",
            },
            {
              title: "AccountAllowMultiple",
              slot: "accountAllowMultiple",
              key: "accountAllowMultiple",
            },
            {
              title: "AccountMinuteSpeedLimit",
              slot: "accountMinuteSpeedLimit",
              key: "accountMinuteSpeedLimit",
            },
            {
              title: "AccountHourSpeedLimit",
              slot: "accountHourSpeedLimit",
              key: "accountHourSpeedLimit",
            },
            {
              title: "AccountDaySpeedLimit",
              slot: "accountDaySpeedLimit",
              key: "accountDaySpeedLimit",
            },
            {
              title: "AccountMaxBlockCount",
              slot: "accountMaxBlockCount",
              key: "accountMaxBlockCount",
            },
            {
              title: "AccountBlockTimeout",
              slot: "accountBlockTimeout",
              key: "accountBlockTimeout",
            },
            {
              title: "AccountMaxCookieCount",
              slot: "accountMaxCookieCount",
              key: "accountMaxCookieCount",
            },
            {
              title: "AccountDelayTimeout",
              slot: "accountDelayTimeout",
              key: "accountDelayTimeout",
            },
            {
              title: "CookieMaxBlockCount",
              slot: "cookieMaxBlockCount",
              key: "cookieMaxBlockCount",
            },
            {
              title: "CookieExpireTimeout",
              slot: "cookieExpireTimeout",
              key: "cookieExpireTimeout",
            },
            {
              title: "CookieDelayTimeout",
              slot: "cookieDelayTimeout",
              key: "cookieDelayTimeout",
            },
            {
              title: "EnableStatus",
              slot: "enableStatus",
              key: "enableStatus",
              format: {
                type: "enum",
                pattern: "EnableStatus",
              },
            },
            {
              title: "CreateTime",
              slot: "createTime",
              key: "createTime",
              format: {
                type: "date",
              },
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
              title: "Id",
              slot: "id",
              key: "id",
            },
            {
              title: "Name",
              slot: "name",
              key: "name",
            },

            {
              title: "Desc",
              slot: "description",
              key: "description",
            },
            {
              title: "PSite",
              slot: "parentSiteId",
              key: "parentSiteId",
                 format: {
                type: "enum",pattern:"Site"
              },
            },
            {
              title: "Domain",
              slot: "domain",
              key: "domain",
            },
            {
              title: "Home",
              slot: "homePageUrl",
              key: "homePageUrl",
            },
                        {
              title: "LoginNeedVcode",
              slot: "loginNeedVcode",
              key: "loginNeedVcode",
              format: {
                type: "enum",
                pattern: "YesNo",
              },
            },
            {
              title: "LoginCaptaType",
              slot: "loginCaptaType",
              key: "loginCaptaType",
              format: {
                type: "enum",
                pattern: "LoginCaptaType",
              },
            },
            {
              title: "NeedCookie",
              slot: "crawlNeedUseCookie",
              key: "crawlNeedUseCookie",
                 format: {
                type: "enum",pattern:"YesNo"
              },
            },
            {
              title: "NeedProxy",
              slot: "needUseProxy",
              key: "needUseProxy",
                format: {
                type: "enum",pattern:"YesNo"
              },
            },
            {
              title: "LoginScript",
              slot: "loginScriptId",
              key: "loginScriptId",
            },

            {
              title: "IpDTut",
              slot: "ipDelayTimeout",
              key: "ipDelayTimeout",
            },
            {
              title: "IpBTut",
              slot: "ipBlockTimeout",
              key: "ipBlockTimeout",
            },
            {
              title: "IpHLmt",
              slot: "ipHourSpeedLimit",
              key: "ipHourSpeedLimit",
            },
            {
              title: "IpMLmt",
              slot: "ipMinuteSpeedLimit",
              key: "ipMinuteSpeedLimit",
            },
            {
              title: "IpDLmt",
              slot: "ipDaySpeedLimit",
              key: "ipDaySpeedLimit",
            },
            {
              title: "AccCrossIp",
              slot: "accountAllowCrossIp",
              key: "accountAllowCrossIp",
                 format: {
                type: "enum",
                pattern: "YesNo",
              },
            },
            {
              title: "AcctMulti",
              slot: "accountAllowMultiple",
              key: "accountAllowMultiple",
                 format: {
                type: "enum",
                pattern: "YesNo",
              },
            },
            {
              title: "AccountMLmt",
              slot: "accountMinuteSpeedLimit",
              key: "accountMinuteSpeedLimit",
            },
            {
              title: "AccountHLmt",
              slot: "accountHourSpeedLimit",
              key: "accountHourSpeedLimit",
            },
            {
              title: "AccountDLmt",
              slot: "accountDaySpeedLimit",
              key: "accountDaySpeedLimit",
            },
            {
              title: "AccountMaxB",
              slot: "accountMaxBlockCount",
              key: "accountMaxBlockCount",
            },
            {
              title: "AccountBTut",
              slot: "accountBlockTimeout",
              key: "accountBlockTimeout",
            },
            {
              title: "AccountMaxCk",
              slot: "accountMaxCookieCount",
              key: "accountMaxCookieCount",
            },
            {
              title: "AccountDTut",
              slot: "accountDelayTimeout",
              key: "accountDelayTimeout",
            },
            {
              title: "CookieMaxB",
              slot: "cookieMaxBlockCount",
              key: "cookieMaxBlockCount",
            },
            {
              title: "CookieExp",
              slot: "cookieExpireTimeout",
              key: "cookieExpireTimeout",
            },
            {
              title: "CookieDTut",
              slot: "cookieDelayTimeout",
              key: "cookieDelayTimeout",
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
            "name",
            "crawlNeedUseCookie",
            "needUseProxy",
            "ipDelayTimeout",
            "ipBlockTimeout",
            "ipHourSpeedLimit",
            "accountAllowCrossIp",
            "accountAllowMultiple",
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

      radioKey: "name",
      keyword: "",
      radioOptions: [
        {
          label:"Name",
          value:"name"
        },
               {
          label:"Domain",
          value:"domain"
        },
      ],

      timeRange: [],

      query: {
        parentSiteId: null,
        crawlNeedUseCookie: null,
        loginNeedVcode: null,
        loginCaptaType: null,
        needUseProxy: null,
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

    showParentSiteId() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "ParentSiteId"
      );
    },

    showCrawlNeedUseCookie() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "CrawlNeedUseCookie"
      );
    },

    showLoginNeedVcode() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "LoginNeedVcode"
      );
    },

    showLoginCaptaType() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "LoginCaptaType"
      );
    },

    showNeedUseProxy() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "NeedUseProxy"
      );
    },

    showEnableStatus() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "EnableStatus"
      );
    },
      showRadioGroup() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "RadioGroup"
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
            let resp = await this.$api.site.deleteById({ id: row.id });
            if (resp.code == 100)
               this.data.list = this.data.list.filter((x) => x.id != row.id);
              this.data.total-=1;

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
              async () => this.$api.site.deleteBatch(this.getIds()),
              true
            );
          }
        );
      }
    },

    checkCount() {
      let items = this.$refs.table.getSelection();
      if (items.length == 0) {
                this.$Message.info("no data selected");return false;

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

      this.$utils.resetFields(
        this.query,
        null,
        this.$utils.pickObjectArrayFileds(this.radioOptions, "value")
      );

      this.query[this.radioKey] = this.keyword;

      this.query.createTimeStart = this.timeRange[0];
      this.query.createTimeEnd = this.timeRange[1];

      this.$utils.getListData.call(this, () =>
        this.$api.site.getList(this.query)
      );
    },
  },
};
</script>