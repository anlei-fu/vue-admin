<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
      <MySelect
        v-show="showParentSiteId"
        v-model="query.parentSiteId"
        title="ParentSite"
        enum="Site"
        width="200px"
      />
      <MySelect
        v-show="showNeedUseCookie"
        v-model="query.needUseCookie"
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
      @delete="showDelete"
      :selectedColumns="pageSetting.table.showingColumns"
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
            "TimeRange",
            "ParentSiteId",
            "needUseCookie",
            "LoginNeedVcode",
            "LoginCaptaType",
            "EnableStatus",
            "NeedUseProxy",
            "RadioGroup",
          ]),
          enabledFilters: [
            "TimeRange",
            "ParentSiteId",
            "needUseCookie",
            "LoginNeedVcode",
            "LoginCaptaType",
            "NeedUseProxy",
            "EnableStatus",
            "RadioGroup",
          ],
        },
        table: {
          columns: [
            utils.CHECKBOX_COLUMN,
            utils.column("id"),
            utils.column("name"),
            utils.column("description", "Desc"),
            utils.enumColumn("parentSiteId", "Site", "PSite"),
            utils.column("domain"),
            utils.column("homePageUrl", "HmPg"),
            utils.enumColumn("loginNeedVcode", "YesNo", "LgNdVcd"),
            utils.enumColumn("loginCaptaType", null, "LgCptTy"),
            utils.enumColumn("needUseCookie", "YesNo", "NdCk"),
            utils.enumColumn("needUseProxy", "YesNo", "NdPro"),
            utils.column("loginScriptId", "LgScript"),
            utils.column("ipMinuteSpeedLimit", "IpMinLmt"),
            utils.column("ipHourSpeedLimit", "IpHrLmt"),
            utils.column("ipDaySpeedLimit", "IpDayLmt"),
            utils.column("ipDelayTimeout", "IpDlTmt(s)"),
            utils.column("ipBlockTimeout", "IpBlkTmt(min)", { width: "120px" }),
            utils.enumColumn("accountAllowCrossIp", "YesNo", "CrsIp"),
            utils.enumColumn("accountAllowMultiple", "YesNo", "Mltpl"),
            utils.column("accountMinuteSpeedLimit", "AccMinLmt"),
            utils.column("accountHourSpeedLimit", "AccHrLmt"),
            utils.column("accountDaySpeedLimit", "AccDayLmt"),
            utils.column("accountMaxBlockCount", "AccMxB"),
            utils.column("accountBlockTimeout", "AccBlkTmt(h)"),
            utils.column("accountMaxCookieCount", "AccMxCk"),
            utils.column("accountDelayTimeout", "AcctDlTmt(s)"),
            utils.column("cookieMaxBlockCount", "CkMxBlk"),
            utils.column("cookieExpireTimeout", "CkExp"),
            utils.column("cookieDelayTimeout", "CkDTmt(s)"),
            utils.enumColumn("enableStatus", null, "Status"),
            utils.dateColumn("createTime", "CTime"),
            utils.operateColumn(
              [utils.operation("edit"), utils.operation("delete")],
              { width: "150px" }
            ),
          ],
          showingColumns: [
            "Checkbox",
            "name",
            "needUseCookie",
            "needUseProxy",
            "ipDelayTimeout",
            "ipBlockTimeout",
            "ipMinuteSpeedLimit",
            "accountAllowCrossIp",
            "accountAllowMultiple",
            "enableStatus",
            // "createTime",
            "test",
          ],
        },
      },
      editSetting: utils.editSetting(),
      addSetting: utils.addSetting(),
      batchEditSetting: utils.batchEditSetting(),
      radioKey: "name",
      keyword: "",
      radioOptions: utils.radioOptions(["name", "domain"]),
      api: "site",
      timeRange: [],
      query: {
        parentSiteId: null,
        needUseCookie: null,
        loginNeedVcode: null,
        loginCaptaType: null,
        needUseProxy: null,
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
      debugger;
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
