<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
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
    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
  import utils from "./../../../common";
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
            options: utils.options(["TimeRange", "EnableStatus"]),
            enabledFilters: ["TimeRange", "EnableStatus"],
          },
          table: {
            columns: [
              utils.CHECKBOX_COLUMN,
              utils.column("name"),
              utils.column("priority"),
              utils.column("description", "Desc"),
              utils.column("appKey"),
              utils.column("appSecret","Scrt"),
              utils.column("dataUrl"),
              utils.column("dataQueue", "DataQ"),
              utils.negativeProgress(
                "concur",
                "taskMaxRunningCount",
                "taskCurrentRunningCount"
              ),
              utils.column("taskMaxRunningCount", "MxCon"),
              utils.column("taskCurrentRunningCount", "CrtCon"),
              utils.negativeProgress("urlCplt", "urlTotalCount", "urlFinishedCount"),
              utils.positiveProgress("urlBadRt", "urlTotalCount", "urlBadCount"),
              utils.column("urlTotalCount", "TtlUrl"),
              utils.column("urlFinishedCount", "FnsdUrl"),
              utils.column("urlBadCount", "BadUrl"),
              utils.enumColumn("enableStatus", null, "Status"),
              utils.dateColumn("createTime", "CTime"),
              utils.operateColumn([utils.operation("edit"), utils.operation("delete")],{width:"180px"}),
            ],
            showingColumns: [
              "Checkbox",
              "name",
              "priority",
              "concurrency",
              "concur",
              "urlCplt",
              "urlBdRt",
              "enableStatus",
              "createTime",
              "test",
            ],
          },
        },
        editSetting: utils.editSetting(),
        addSetting: utils.addSetting(),
        batchEditSetting: utils.batchEditSetting(),
        api: "downSystem",
        timeRange: [],
        query: {
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
        utils.getData.call(this, reset, false, true);
      },
    },
  };
</script>
