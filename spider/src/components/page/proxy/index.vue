<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <PageSetting ref="setting" :setting="pageSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
      <MySelect
        v-show="showProxyType"
        v-model="query.proxyType"
        title="ProxyType"
        enum="ProxyType"
        width="200px"
      />
      <MySelect
        v-show="showEnableStatus"
        v-model="query.enableStatus"
        title="EnableStatus"
        enum="EnableStatus"
        width="200px"
      />
      <MySelect
        v-show="showProtocol"
        v-model="query.protocol"
        title="Protocol"
        enum="Protocol"
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
              "ProxyType",
              "EnableStatus",
              "Protocol",
              "RadioGroup",
            ]),
            enabledFilters: ["TimeRange", "ProxyType", "EnableStatus", "Protocol", "RadioGroup"],
          },
          table: {
            columns: [
              utils.CHECKBOX_COLUMN,
              utils.column("ip"),
              utils.column("port"),
              utils.column("account"),
              utils.column("password", "Pwd"),
              utils.enumColumn("proxyProtocol", null, "Prtcl"),
              utils.enumColumn("proxyType", null, "Type"),
              utils.positiveProgress("usage", "maxUseCount", "currentUseCount"),
              utils.column("maxUseCount", "MxCon"),
              utils.column("currentUseCount", "CurCon"),
              utils.negativeProgress("blkRt", "blockMaxCount", "blockCurrentCount"),
              utils.column("blockMaxCount", "BlkMxCnt"),
              utils.column("blockCurrentCount", "BCrtCnt"),
              utils.column("blockTimeout", "BTmt(min)"),
              utils.dateColumn("blockTimeoutTime","BlkTmtTm"),
              utils.enumColumn("enableStatus", null, "Status"),
              utils.dateColumn("createTime"),
              utils.operateColumn([utils.operation("edit"), utils.operation("delete")],{width:"150px"}),
            ],
            showingColumns: [
              "Checkbox",
              "ip",
              "port",
              "protocol",
              "proxyType",
              "usage",
              "blockRate",
              "blockTimeout",
              "enableStatus",
              "createTime",
              "test",
            ],
          },
        },
        editSetting: utils.editSetting(),
        addSetting: utils.addSetting(),
        batchEditSetting: utils.batchEditSetting(),
        radioKey: "ip",
        keyword: "",
        radioOptions: utils.radioOptions(["account", "ip"]),
        api: "proxy",
        timeRange: [],
        query: {
          proxyType: null,
          enableStatus: null,
          protocol: null,
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
        utils.changeShowingFilters.call(this,newVal);
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
