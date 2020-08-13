<template>
  <div>
    <div>
      <span style="float:right">
        <Icon type="md-settings" size="20" @click="showSetting" />
      </span>
    </div>
    <div class="filter">
      <MyDateRange v-model="timeRange" />

      <MySelect v-show="showSiteId" v-model="query.siteId" title="Site" enum="Site" width="200px" />
      <MySelect
        v-show="showLoginType"
        v-model="query.loginType"
        title="LoginType"
        enum="LoginType"
        width="200px"
      />
          <MySelect
        v-show="showAccountType"
        v-model="query.accountType"
        title="AccountType"
        enum="AccountType"
        width="200px"
      />
          <MySelect
        v-show="showValidated"
        v-model="query.validated"
        title="Validated"
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
      :selectedColumns="pageSetting.table.showingColumns"
      @delete="showDelete"
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
              lable: "LoginType",
              value: "LoginType",
            },
            {
              lable: "SiteId",
              value: "SiteId",
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
            "AccountType",
            "Validated",
            "TimeRange",
            "LoginType",
            "SiteId",
            "EnableStatus",
            "RadioGroup",
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
              title: "NickName",
              slot: "nickName",
              key: "nickName",
            },
            {
              title: "Description",
              slot: "description",
              key: "description",
            },
            {
              title: "LoginType",
              slot: "loginType",
              key: "loginType",
            },
            {
              title: "SiteId",
              slot: "siteId",
              key: "siteId",
            },
            {
              title: "Phone",
              slot: "phone",
              key: "phone",
            },
            {
              title: "Email",
              slot: "email",
              key: "email",
            },
            {
              title: "Password",
              slot: "password",
              key: "password",
            },
            {
              title: "LastLoginTime",
              slot: "lastLoginTime",
              key: "lastLoginTime",
              format: {
                type: "date",
              },
            },
            {
              title: "LastLoginIp",
              slot: "lastLoginIp",
              key: "lastLoginIp",
            },
            {
              title: "CurrentUseCount",
              slot: "currentUseCount",
              key: "currentUseCount",
            },
            {
              title: "BlockCurrentCount",
              slot: "blockCurrentCount",
              key: "blockCurrentCount",
            },
            {
              title: "BlockTimeoutTime",
              slot: "blockTimeoutTime",
              key: "blockTimeoutTime",
              format: {
                type: "date",
              },
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
              slot: "account",
              key: "account",
            },
            {
              title: "NName",
              slot: "nickName",
              key: "nickName",
            },
            {
              title: "Desc",
              slot: "description",
              key: "description",
            },
            {
              title: "LType",
              slot: "loginType",
              key: "loginType",
              format: {
                type: "enum",
                pattern: "LoginType",
              },
            },
             {
              title: "AccountType",
              slot: "accountType",
              key: "accountType",
              format: {
                type: "enum",
                pattern: "AccountType",
              },
            },
             {
              title: "Validated",
              slot: "validated",
              key: "validated",
              format: {
                type: "enum",
                pattern: "YesNo",
              },
            },

            {
              title: "Phone",
              slot: "phone",
              key: "phone",
              width: "130px",
            },
            {
              title: "Email",
              slot: "email",
              key: "email",
              width: "130px",
            },
            {
              title: "Pwd",
              slot: "password",
              key: "password",
            },
            {
              title: "LTime",
              slot: "lastLoginTime",
              key: "lastLoginTime",
              format: {
                type: "date",
              },
            },
            {
              title: "LIp",
              slot: "lastLoginIp",
              key: "lastLoginIp",
              width: "120px",
            },
            {
              title: "CurCon",
              slot: "currentUseCount",
              key: "currentUseCount",
            },
            {
              title: "BCon",
              slot: "blockCurrentCount",
              key: "blockCurrentCount",
            },
             {
              title: "DToutTime",
              slot: "delayTimeoutTime",
              key: "delayTimeoutTime",
              format: {
                type: "date",
              },
            },
            {
              title: "BToutTime",
              slot: "blockTimeoutTime",
              key: "blockTimeoutTime",
              format: {
                type: "date",
              },
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
            "account",
            "siteId",
            "phone",
            "email",
            "currentUseCount",
            "blockCurrentCount",
            "blockTimeoutTime",
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

      radioKey: "account",
      keyword: "",
      radioOptions: [
                 {
          label: "Account",
          value: "account",
        },
        {
          label: "Phone",
          value: "phone",
        },
        {
          label: "Email",
          value: "email",
        },

       
      ],

      timeRange: [],

      query: {
        accountType:null,
        validated:null,
        loginType: null,
        siteId: null,
        enableStatus: null,
        email: null,
        phone: null,
        account: null,
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

    showLoginType() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "LoginType"
      );
    },
     showAccountType() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "AccountType"
      );
    },

    showValidated() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "Validated"
      );
    },

    showSiteId() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "SiteId"
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
            let resp = await this.$api.siteAccount.deleteById({ id: row.id });
            if (resp.code == 100){
               this.data.list = this.data.list.filter((x) => x.id != row.id);
              this.data.total-=1;
            }

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
              async () => this.$api.siteAccount.deleteBatch(this.getIds()),
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

      this.$utils.resetFields(
        this.query,
        null,
        this.$utils.pickObjectArrayFileds(this.radioOptions, "value")
      );

      this.query[this.radioKey] = this.keyword;

      this.query.createTimeStart = this.timeRange[0];
      this.query.createTimeEnd = this.timeRange[1];

      this.$utils.getListData.call(this, () =>
        this.$api.siteAccount.getList(this.query)
      );
    },
  },
};
</script>