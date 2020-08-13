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
        v-show="showScriptType"
        v-model="query.scriptType"
        title="ScriptType"
        enum="ScriptType"
        width="200px"
      />

      <MySelect
        v-show="showDownSiteId"
        v-model="query.downSiteId"
        title="DownSiteId"
        enum="DownSiteId"
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

    <edit ref="edit" :model="editSetting.model" :title="editSetting.title" @success="onEditSuccess" />

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
              lable: "ScriptType",
              value: "ScriptType",
            },
            {
              lable: "DownSiteId",
              value: "DownSiteId",
            },
            {
              lable: "EnableStatus",
              value: "EnableStatus",
            },
          ],
          enabledFilters: [
            "TimeRange",
            "ScriptType",
            "DownSiteId",
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
              title: "Description",
              slot: "description",
              key: "description",
            },
            {
              title: "Path",
              slot: "path",
              key: "path",
            },
            {
              title: "ScriptType",
              slot: "scriptType",
              key: "scriptType",
            },
            {
              title: "DownSiteId",
              slot: "downSiteId",
              key: "downSiteId",
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
              title: "DSite",
              slot: "downSiteId",
              key: "downSiteId",
            },
             {
              title: "System",
              slot: "downSystemId",
              key: "downSystemId",
            },
             {
              title: "Site",
              slot: "siteId",
              key: "siteId",
              format:{
		      type:"enum",pattern:"Site"
	      }
            },
             {
              title: "Path",
              slot: "path",
              key: "path",
            },
            {
              title: "Desc",
              slot: "description",
              key: "description",
            },
           
            {
              title: "Type",
              slot: "scriptType",
              key: "scriptType",
                   format:{
		      type:"enum",pattern:"ScriptType"
	      }
            },
           
            {
              title: "Status",
              slot: "enableStatus",
              key: "enableStatus",
                   format:{
		      type:"enum",pattern:"EnableStatus"
	      }
            },
            {
              title: "CTime",
              slot: "createTime",
              key: "createTime",
                  format:{
		      type:"date",
	      }
            },
            {
              title: "Op",
              key: "test",
              slot: "test",
              isOperation: true,
               width:"120px",
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
	"description",
	"path",
	"scriptType",
	"downSiteId",
	"enableStatus",
  "createTime",
  "test"],
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
        scriptType: null,
        downSiteId: null,
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

    showScriptType() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "ScriptType"
      );
    },

    showDownSiteId() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "DownSiteId"
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
            let resp = await this.$api.script.deleteById({ id: row.id });
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
              async () => this.$api.script.deleteBatch(this.getIds()),
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

      this.query.createTimeStart = this.timeRange[0];
      this.query.createTimeEnd = this.timeRange[1];

      this.$utils.getListData.call(this, () =>
        this.$api.script.getList(this.query)
      );
    },
  },
};
</script>