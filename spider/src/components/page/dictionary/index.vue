<template>
  <div>
    <MyPageSettingButton @click="showSetting" />
    <MyFilter>
      <MyDateRange v-model="timeRange" />
      <span v-show="showRadioGroup">
        <MyRadioGroup v-model="radioKey" :options="radioOptions" width="200px" />
        <Input v-model="keyword" style="width: 200px;" />
      </span>
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
    <batchEdit
      ref="batchEdit"
      :ids="batchEditSetting.ids"
      :title="batchEditSetting.title"
      @success="onBatchEditSuccess"
    />
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
            options: utils.options(["TimeRange", "RadioGroup"]),
            enabledFilters: ["TimeRange", "RadioGroup"],
          },
          table: {
            columns: [
              utils.CHECKBOX_COLUMN,
              utils.column("type"),
              utils.column("label"),
              utils.column("value"),
              utils.column("color"),
              utils.column("sortNumber"),
              utils.dateColumn("createTime", "Ctime"),
              utils.operateColumn([utils.operation("edit"), utils.operation("delete")],{width:"150px"}),
            ],
            showingColumns: [],
          },
        },
        api: "dictionary",
        editSetting: utils.editSetting(),
        addSetting: utils.addSetting(),
        batchEditSetting: utils.batchEditSetting("Change Type"),
        radioKey: "type",
        keyword: "",
        radioOptions: utils.radioOptions(["type", "label"]),
        timeRange: [],
        query: {
          Type: null,
          Label: null,
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
    if (!utils.restoreIndex("/dictionary/index", this)) this.getData(true);
  },
  beforeDestroy() {
    utils.snapShotIndex("/dictionary/index", this);
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
      showDelete(row) {
        utils.showDelete.call(this, row);
      },
      batchDelete() {
        utils.batchDelete.call(this);
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
