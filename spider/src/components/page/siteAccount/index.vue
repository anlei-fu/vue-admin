<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <MyFilter>
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
        <Input v-model="keyword" style="width: 200px;" />
      </span>
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
      :selectedColumns="pageSetting.table.showingColumns"
      @delete="showDelete"
      @edit="showEdit"
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
            "AccountType",
            "Validated",
            "TimeRange",
            "LoginType",
            "SiteId",
            "EnableStatus",
            "RadioGroup",
          ]),
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
          columns: [
            utils.CHECKBOX_COLUMN,
            utils.enumColumn("siteId", "Site", "Site"),
            utils.column("account"),
            utils.column("nickName", "NName"),
            utils.column("description", "Desc"),
            utils.enumColumn("loginType", null, "LgTp"),
            utils.enumColumn("accountType", null),
            utils.enumColumn("validated", "YesNo"),
            utils.column("phone"),
            utils.column("email"),
            utils.column("password", "Pwd"),
            utils.dateColumn("lastLoginTime", "LstLgTime"),
            utils.column("lastLoginIp", "LIp"),
            utils.positiveProgress("usage", "maxUseCount", "currentUseCount"),
            utils.column("maxUseCount", "MxCon"),
            utils.column("currentUseCount", "CurCon"),
            utils.positiveProgress(
              "blkRate",
              "maxBlockCount",
              "blockCurrentCount"
            ),
            utils.column("maxBlockCount", "MxBlkCnt"),
            utils.column("blockCurrentCount", "BlkCnt"),
            utils.dateColumn("delayTimeoutTime", "DltmtTime"),
            utils.dateColumn("blockTimeoutTime", "BlkTmtTime", "MM-dd hh:mm", {
              width: "110px",
            }),
            utils.enumColumn("enableStatus", null, "Status"),
            utils.dateColumn("createTime", "CTime"),
            utils.operateColumn(
              [utils.operation("edit"), utils.operation("delete")],
              { width: "150px" }
            ),
          ],
          showingColumns: [
            "Checkbox",
            "account",
            "siteId",
            // "phone",
            // "email",
            "usage",
            "blkRate",
            "blockTimeoutTime",
            "enableStatus",
            // "createTime",
            "test",
          ],
        },
      },
      editSetting: utils.editSetting(),
      addSetting: utils.addSetting(),
      batchEditSetting: utils.batchEditSetting(),
      api: "siteAccount",
      radioKey: "account",
      keyword: "",
      radioOptions: utils.radioOptions(["account", "phone", "email"]),
      timeRange: [],
      query: {
        accountType: null,
        validated: null,
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
      utils.getData.call(this, reset, true, true);
    },
  },
};
</script>
