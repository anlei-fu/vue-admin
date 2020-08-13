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
        v-show="showCrawlerType"
        v-model="query.crawlerType"
        title="CrawlerType"
        enum="CrawlerType"
        width="200px"
      />

      <MySelect
        v-show="showHeartbeatStatus"
        v-model="query.heartbeatStatus"
        title="HeartbeatStatus"
        enum="HeartbeatStatus"
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
      :selectedColumns="pageSetting.table.showingColumns"
      :datas="data.list"
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

    <add
      ref="add"
      :model="addSetting.model"
      :title="addSetting.title"
      @success="onBatchEditSuccess"
    ></add>

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
              lable: "CrawlerType",
              value: "CrawlerType",
            },
            {
              lable: "HeartbeatStatus",
              value: "HeartbeatStatus",
            },
            {
              lable: "HeartbeatLostCount",
              value: "HeartbeatLostCount",
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
            "CrawlerType",
            "HeartbeatStatus",
            "HeartbeatLostCount",
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
              title: "ClientVersion",
              slot: "clientVersion",
              key: "clientVersion",
            },
            {
              title: "Name",
              slot: "name",
              key: "name",
            },
            {
              title: "Ip",
              slot: "ip",
              key: "ip",
            },
            {
              title: "Description",
              slot: "description",
              key: "description",
            },
            {
              title: "CrawlerType",
              slot: "crawlerType",
              key: "crawlerType",
            },
            {
              title: "Key",
              slot: "key",
              key: "key",
            },
            {
              title: "UniqueId",
              slot: "uniqueId",
              key: "uniqueId",
            },
            {
              title: "Port",
              slot: "port",
              key: "port",
            },
            {
              title: "MaxConcurrency",
              slot: "maxConcurrency",
              key: "maxConcurrency",
            },
            {
              title: "CurrentConcurrency",
              slot: "currentConcurrency",
              key: "currentConcurrency",
            },
            {
              title: "HeartbeatStatus",
              slot: "heartbeatStatus",
              key: "heartbeatStatus",
            },
            {
              title: "HeartbeatLastTime",
              slot: "heartbeatLastTime",
              key: "heartbeatLastTime",
            },
            {
              title: "HeartbeatLostCount",
              slot: "heartbeatLostCount",
              key: "heartbeatLostCount",
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
              title: "Name",
              slot: "name",
              key: "name",
            },
            {
              title: "Ip",
              slot: "ip",
              key: "ip",
              width: "150px",
            },
            {
              title: "Port",
              slot: "port",
              key: "port",
            },
            {
              title: "Desc",
              slot: "description",
              key: "description",
            },
            {
              title: "UId",
              slot: "uniqueId",
              key: "uniqueId",
            },
            {
              title: "Key",
              slot: "key",
              key: "key",
            },
            {
              title: "Ver",
              slot: "clientVersion",
              key: "clientVersion",
            },

            {
              title: "Type",
              slot: "crawlerType",
              key: "crawlerType",
              format: {
                type: "enum",
                pattern: "CrawlerType",
              },
            },
            {
              title: "MaxCon",
              slot: "maxConcurrency",
              key: "maxConcurrency",
            },
            {
              title: "CurCon",
              slot: "currentConcurrency",
              key: "currentConcurrency",
            },
            {
              title: "HbStatus",
              slot: "heartbeatStatus",
              key: "heartbeatStatus",
              format: {
                type: "enum",
                pattern: "HeartbeatStatus",
              },
            },
            {
              title: "LastHb",
              slot: "heartbeatLastTime",
              key: "heartbeatLastTime",
              format: {
                type: "date",
              },
            },
            {
              title: "LostHb",
              slot: "heartbeatLostCount",
              key: "heartbeatLostCount",
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
            "clientVersion",
            "name",
            "ip",
            "crawlerType",
            "port",
            "maxConcurrency",
            "currentConcurrency",
            "heartbeatStatus",
            "heartbeatLastTime",
            "heartbeatLostCount",
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
        { label: "Name", value: "name" },
        { label: "ClientVersion", value: "clientVersion" },
      ],

      timeRange: [],

      query: {
        crawlerType: null,
        heartbeatStatus: null,
        heartbeatLostCount: null,
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
    showRadioGroup() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "RadioGroup"
      );
    },
    showTimeRange() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "TimeRange"
      );
    },

    showCrawlerType() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "CrawlerType"
      );
    },

    showHeartbeatStatus() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "HeartbeatStatus"
      );
    },

    showHeartbeatLostCount() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "HeartbeatLostCount"
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

    onBatchEditSuccess(data) {
      debugger;
      let set = new Set(data.ids);
      this.data.list.forEach((x) => {
        if (set.has(x.id)) this.$utils.copyFieldsFrom(x, data);
      });
    },

    batchEdit() {
      if (this.checkCount()) {
        this.batchEditSetting.ids = this.getIds();
        this.$refs.batchEdit.show();
      }
    },

    showDelete(row) {
      this.$utils.showComfirm.call(
        this,
        "Warning",
        `are you sure to delete this data?`,
        () => {
          this.$utils.handleNormalRequest.call(this, async () =>
            this.$api.crawler.deleteById({ id: row.id })
          );
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
              async () => this.$api.crawler.deleteBatch(this.getIds()),
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
        this.$api.crawler.getList(this.query)
      );
    },
  },
};
</script>