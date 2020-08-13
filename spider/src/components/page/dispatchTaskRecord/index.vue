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

    <span><QueryButton @click="getData(true)" /></span>
      
    </div>
    <ListBody ref="table" filter border stripe columnFilter :columns="pageSetting.table.defaultShowingColumns" :datas="data.list" />
    <div class="pager">
      <MyPager :total="data.total" @onSizeChanged="onPageSizeChanged" @onIndexChanged="onPageIndexChanged" />
    </div>

    <PageSetting ref="setting" :setting="pageSetting" />
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        pageSetting: {
          filters: {
            options: [
              {
                label: "DispatchResult",
                value: "DispatchResult",
              },
            ],
            enabledFilters: ["DispatchResult"],
          },
          table: {
            allColumns: [
              {
                title: "Id",
                slot: "id",
                key: "id",
              },
              {
                title: "CrawlTaskId",
                slot: "crawlTaskId",
                key: "crawlTaskId",
              },
              {
                title: "DispatchResult",
                slot: "dispatchResult",
                key: "dispatchResult",
              },
              {
                title: "DispatchMsg",
                slot: "dispatchMsg",
                key: "dispatchMsg",
              },
              {
                title: "CreateTime",
                slot: "createTime",
                key: "createTime",
                    format:{
		      type:"date",
	      }
              },
            ],
            defaultShowingColumns: [
              {
                title: "Id",
                slot: "id",
                key: "id",
              },
              {
                title: "CrawlTaskId",
                slot: "crawlTaskId",
                key: "crawlTaskId",
              },
              {
                title: "DispatchResult",
                slot: "dispatchResult",
                key: "dispatchResult",
                 format:{
		      type:"enum",pattern:"DispatchResult"
	      }
              },
              {
                title: "DispatchMsg",
                slot: "dispatchMsg",
                key: "dispatchMsg",
              },
              {
                title: "CreateTime",
                slot: "createTime",
                key: "createTime",
              },
            ],
            showingColumns: [],
          },
        },

        radioKey: "",
        keyword: "",
        radioOptions: [
          {
            label: "crawlTaskId",
            value: "crawlTaskId",
          },
        ],

        timeRange: [],

        query: {
          crawlTaskId: null,
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
      showDispatchResult() {
        return this.$utils.arrayHas(this.pageSetting.filters.enabledFilters, "DispatchResult");
      },
    },

    methods: {
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

        this.$utils.getListData(() => this.$api.dispatchTaskRecord.getList(this.query));
      },
    },
  };
</script>
