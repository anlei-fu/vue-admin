<template>
  <div>
    <div>
      <span style="float: right;">
        <Icon type="md-settings" size="20" @click="showSetting" />
      </span>
    </div>
    <div class="filter">
      <MyTimeRange v-model="timeRange" />

      <span>
        <MyRadioGroup v-show="showRadio" v-model="radioKey" :options="radioOptions" width="200px" />
        <Input v-model="keyword" />
      </span>

      <QueryButton @click="getData(true)" />

      <CreateButton @click="showAdd" />

      <BatchEditButton @click="batchEdit" />

      <BatchDeleteButton @click="batchDelete" />
    </div>
    <ListBody ref="table" filter border stripe columnFilter :columns="pageSetting.table.defaultShowingColumns" :datas="data.list" @edit="showEdit" />
    <div class="pager">
      <MyPager :total="data.total" @onSizeChanged="onPageSizeChanged" @onIndexChanged="onPageIndexChanged" />
    </div>

    <add ref="add"></add>

    <edit ref="edit" />

    <batchEdit ref="batchEdit" :ids="batchEditSetting.ids" />

    <edit ref="batchEdit" />

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
                label: "DonwSystemSite",
                value: "DonwSystemSiteId",
              },
              {
                label: "BloomStatus",
                value: "BloomLoadingStatus",
                  format:{
		      type:"enum",pattern:"BloomLoadingStatus"
	      }
              },
              {
                label: "Status",
                value: "EnableStatus",
              },
            ],
            enabledFilters: ["DonwSystemSiteId", "BloomLoadingStatus", "EnableStatus"],
          },
          table: {
            allColumns: [
              {
                title: "Id",
                slot: "id",
                key: "id",
              },
              {
                title: "DonwSystemSiteId",
                slot: "donwSystemSiteId",
                key: "donwSystemSiteId",
              },
              {
                title: "Bloom",
                slot: "bloom",
                key: "bloom",
              },
              {
                title: "BloomLoadingStatus",
                slot: "bloomLoadingStatus",
                key: "bloomLoadingStatus",
              },
              {
                title: "TotalCount",
                slot: "totalCount",
                key: "totalCount",
              },
              {
                title: "LastLoadingTime",
                slot: "lastLoadingTime",
                key: "lastLoadingTime",
              },
              {
                title: "LastDumpTime",
                slot: "lastDumpTime",
                key: "lastDumpTime",
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
                title: "Checkbox",
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
                title: "DSystemSite",
                slot: "donwSystemSiteId",
                key: "donwSystemSiteId",
              },
              {
                title: "BloomStatus",
                slot: "bloomLoadingStatus",
                key: "bloomLoadingStatus",
              },
              {
                title: "TotalCnt",
                slot: "totalCount",
                key: "totalCount",
              },
              {
                title: "LLoad",
                slot: "lastLoadingTime",
                key: "lastLoadingTime",
              },
              {
                title: "LDump",
                slot: "lastDumpTime",
                key: "lastDumpTime",
              },
              {
                title: "EStatus",
                slot: "enableStatus",
                key: "enableStatus",
              },
              {
                title: "CTime",
                slot: "createTime",
                key: "createTime",
              },
              {
                title: "Operation",
                key: "test",
                slot: "test",
                isOperation: true,
                operations: [
                  {
                    name: "edit",
                    label: "Edit",
                  },
                ],
              },
            ],
            showingColumns: [],
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

        radioKey: "",
        keyword: "",
        radioOptions: [],

        timeRange: [],

        query: {
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

    // toggle filters show status
    computed: {
      showDonwSystemSiteId() {
        return this.$utils.arrayHas(this.pageSetting.filters.enabledFilters, "DonwSystemSiteId");
      },

      showBloomLoadingStatus() {
        return this.$utils.arrayHas(this.pageSetting.filters.enabledFilters, "BloomLoadingStatus");
      },

      showEnableStatus() {
        return this.$utils.arrayHas(this.pageSetting.filters.enabledFilters, "EnableStatus");
      },
    },

    methods: {
      showAdd() {
        this.editSetting.mode = "add";
        this.editSetting.data = {};
        this.$refs.add.show();
      },

      showEdit(row) {
        this.editSetting.mode = "edit";
        this.editSetting.data = row;
        this.$refs.edit.show();
      },

      batchEdit() {
        if (this.checkCount()) {
          this.batchEditSetting.ids = this.getIds();
          this.$refs.batchEdit.show();
        }
      },

      batchDelete() {
        if (this.checkCount()) {
          this.$utils.showConfirm("Warning", `are you sure to delete these data?`, () => {
            this.$utils.doNormalRequest(async () => $this.$api.siteUrlBloom.deleteBatch(this.getIds()));
          });
        }
      },

      checkCount() {
        let items = this.$refs.table.getSelection();
        if (items == 0) {
          return false;
        }
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
        if (reset) {
          this.pageIndex = 1;
        }

        this.$utils.resetFields(this.query, null, this.$utils.pickObjectArrayFileds(this.radioGroupOptions, "value"));

        this.query[this.radioKey] = this.keyword;

        this.query.createTimeStart = timeRange[0];
        this.query.createTimeEnd = timeRange[1];

        this.$utils.getListData(() => this.$api.siteUrlBloom.getList(this.query));
      },
    },
  };
</script>
