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
        v-show="showSiteId"
        v-model="query.siteId"
        title="Site"
        enum="Site"
        width="200px"
      />

      <span v-show="showRadioGroup">
        <MyRadioGroup v-model="radioKey" :options="radioOptions" width="200px" />
        <Input v-model="keyword" style="width:200px;" />
      </span>

      <span>
        <QueryButton @click="getData(true)" />

        <CreateButton @click="showAdd" />
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

    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
import add from "./add";

export default {
  components: {
    add,
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
              lable: "SiteId",
              value: "SiteId",
            },
            {
              lable: "RadioGroup",
              value: "RadioGroup",
            },
          ],
          enabledFilters: ["TimeRange", "SiteId", "RadioGroup"],
        },
        table: {
          allColumns: [
            {
              title: "Id",
              slot: "id",
              key: "id",
            },
            {
              title: "SiteId",
              slot: "siteId",
              key: "siteId",
            },
            {
              title: "Ip",
              slot: "ip",
              key: "ip",
            },
            {
              title: "CreateTime",
              slot: "createTime",
              key: "createTime",
            },
            {
              title: "BlockTimeout",
              slot: "blockTimeout",
              key: "blockTimeout",
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
              title: "Site",
              slot: "siteId",
              key: "siteId",
              format: {
                type: "enum",
                pattern: "Site",
              },
            },
            {
              title: "Ip",
              slot: "ip",
              key: "ip",
            },
            {
              title: "CreateTime",
              slot: "createTime",
              key: "createTime",
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
              title: "Operation",
              key: "test",
              slot: "test",
              isOperation: true,
              operations: [
                {
                  name: "delete",
                  label: "delete",
                },
              ],
            },
          ],
          showingColumns: [],
        },
      },

      addSetting: {
        model: {},
        title: "add",
      },

      radioKey: "ip",
      keyword: "",
      radioOptions: [
        {
          label: "Ip",
          value: "ip",
        },
      ],

      timeRange: [],

      query: {
        siteId: null,
        ip: null,
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

    showSiteId() {
      return this.$utils.arrayHas(
        this.pageSetting.filters.enabledFilters,
        "SiteId"
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

    showDelete(row) {
      this.$utils.showComfirm.call(
        this,
        "Warning",
        `are you sure to delete this data?`,
        () => {
          this.$utils.handleNormalRequest.call(this, async () => {
            let resp = await this.$api.siteIpBlockMap.deleteById({
              id: row.id,
            });
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
              async () => this.$api.siteIpBlockMap.deleteBatch(this.getIds()),
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

      this.$utils.resetFields(
        this.query,
        null,
        this.$utils.pickObjectArrayFileds(this.radioOptions, "value")
      );

      this.query[this.radioKey] = this.keyword;

      this.query.createTimeStart = this.timeRange[0];
      this.query.createTimeEnd = this.timeRange[1];

      this.$utils.getListData.call(this, () =>
        this.$api.siteIpBlockMap.getList(this.query)
      );
    },
  },
};
</script>