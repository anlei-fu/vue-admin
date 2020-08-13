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
              lable: "ProxyType",
              value: "ProxyType",
            },
            {
              lable: "EnableStatus",
              value: "EnableStatus",
            },
            {
              lable: "Protocol",
              value: "Protocol",
            },
            {
              lable: "RadioGroup",
              value: "RadioGroup",
            },
          ],
          enabledFilters: [
            "TimeRange",
            "ProxyType",
            "EnableStatus",
            "Protocol",
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
              title: "Ip",
              slot: "ip",
              key: "ip",
            },
            {
              title: "Port",
              slot: "port",
              key: "port",
            },
            {
              title: "Account",
              slot: "account",
              key: "account",
            },
            {
              title: "Password",
              slot: "password",
              key: "password",
            },
            {
              title: "Protocol",
              slot: "protocol",
              key: "protocol",
              format: {
                type: "enum",
                pattern: "ProxyProtocol",
              },
            },
            {
              title: "ProxyType",
              slot: "proxyType",
              key: "proxyType",
              format: {
                type: "enum",
                pattern: "ProxyType",
              },
            },
            {
              title: "MaxUseCount",
              slot: "maxUseCount",
              key: "maxUseCount",
            },
            {
              title: "CurrentUseCount",
              slot: "currentUseCount",
              key: "currentUseCount",
            },
            {
              title: "BlockMaxCount",
              slot: "blockMaxCount",
              key: "blockMaxCount",
            },
            {
              title: "BlockCurrentCount",
              slot: "blockCurrentCount",
              key: "blockCurrentCount",
            },
            {
              title: "BlockTimeout",
              slot: "blockTimeout",
              key: "blockTimeout",
              format: {
                type: "date",
              },
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
              title: "Ip",
              slot: "ip",
              key: "ip",
            },
            {
              title: "Port",
              slot: "port",
              key: "port",
            },
            {
              title: "Account",
              slot: "account",
              key: "account",
            },
            {
              title: "Pwd",
              slot: "password",
              key: "password",
            },
            {
              title: "Protocol",
              slot: "protocol",
              key: "protocol",
            },
            {
              title: "Type",
              slot: "proxyType",
              key: "proxyType",
              format: {
                type: "enum",
                pattern: "ProxyType",
              },
            },
            {
              title: "MaxCon",
              slot: "maxUseCount",
              key: "maxUseCount",
            },
            {
              title: "CurCon",
              slot: "currentUseCount",
              key: "currentUseCount",
            },
            {
              title: "BMaxCon",
              slot: "blockMaxCount",
              key: "blockMaxCount",
            },
            {
              title: "BCurCon",
              slot: "blockCurrentCount",
              key: "blockCurrentCount",
            },
            {
              title: "BTimeout",
              slot: "blockTimeout",
              key: "blockTimeout",
            },
            {
              title: "BTimeoutTime",
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
              width: "120px",
              isOperation: true,
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
            "ip",
            "port",
            "protocol",
            "proxyType",
            "maxUseCount",
            "currentUseCount",
            "blockMaxCount",
            "blockCurrentCount",
            "blockTimeout",
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

      radioKey: "ip",
      keyword: "",
      radioOptions: [
        { label: "Ip", value: "ip" },
        { label: "Account", value: "account" },
      ],

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
    showRadioGroup() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "TimeRange"
      );
    },
    showProxyType() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "ProxyType"
      );
    },

    showEnableStatus() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "EnableStatus"
      );
    },

    showProtocol() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "Protocol"
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
            let resp = await this.$api.proxy.deleteById({ id: row.id });
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
              async () => this.$api.proxy.deleteBatch(this.getIds()),
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
        this.$api.proxy.getList(this.query)
      );
    },
  },
};
</script>