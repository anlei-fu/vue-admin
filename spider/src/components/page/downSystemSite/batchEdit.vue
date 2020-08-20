<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="140">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll>
        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>
        <FormItem v-if="showPriority" label="Priority" prop="priority">
          <Input v-model="query.priority" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showUrlMaxCacheCount" label="UrlMaxCacheCount" prop="urlMaxCacheCount">
          <Input v-model="query.urlMaxCacheCount" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showTaskUrlBatchCount" label="TaskUrlBatchCount" prop="taskUrlBatchCount">
          <Input v-model="query.taskUrlBatchCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showTaskMaxWaitToBindCount"
          label="TaskMaxWaitToBindCount"
          prop="taskMaxWaitToBindCount"
        >
          <Input v-model="query.taskMaxWaitToBindCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showTaskMaxRunningCount"
          label="TaskMaxRunningCount"
          prop="taskMaxRunningCount"
        >
          <Input v-model="query.taskMaxRunningCount" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showTaskTimeout" label="TaskTimeout" prop="taskTimeout">
          <Input v-model="query.taskTimeout" placeholder="Input value" />
        </FormItem>
          <FormItem v-if="showTaskBindTimeout" label="BdTmt" prop="taskBindTimeout">
          <Input v-model="query.taskBindTimeout" placeholder="Input value" />
        </FormItem>
      </MyScroll>
    </Form>
  </MyModal>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: utils.batchEditProps(),
    data() {
      return {
        optionalFields: utils.options([
          "EnableStatus",
          "UrlMaxCacheCount",
          "Priority",
          "TaskUrlBatchCount",
          "TaskMaxWaitToBindCount",
          "TaskMaxRunningCount",
          "TaskTimeout",
          "TaskBindTimeout",
        ]),
        showingOptionalFields: ["EnableStatus"],
        rules: {
          priority: [utils.range(1, 10)],
          crawlerPageTimeout: [utils.range(3000, 600000)],
          urlMaxCacheCount: [utils.range(1000, 20000)],
          urlMaxCrawlCount: [utils.range(1, 20)],
          taskUrlBatchCount: [utils.range(1, 1000)],
          taskMaxWaitToBindCount: [utils.range(1, 200)],
          taskMaxRunningCount: [utils.range(1, 1000)],
          taskTimeout: [utils.range(1, 120)],
          taskBindTimeout: [utils.range(1, 240)],
          urlMaxDepth: [utils.range(1, 100)],
          taskUrlMaxFailCount: [utils.range(10, 500)],
          taskUrlMaxContinuouslyFailCount: [utils.range(1, 30)],
          taskUrlMaxConcurrency: [utils.range(1, 1000)],
        },
        api: "downSystemSite",
        query: {
          enableStatus: null,
          priority: null,
          taskUrlBatchCount: null,
          taskMaxWaitToBindCount: null,
          taskMaxRunningCount: null,
          taskTimeout: null,
          taskBindTimeout:null,
          ids: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsFieldsShows.call(this);
    },
    watch: {
      showingOptionalFields(newVal) {
        utils.changeShowingOptionalFields.call(this, newVal);
      },
    },
    methods: {
      show() {
        this.$refs.modal.show();
      },
      close() {
        this.$refs.modal.close();
      },
      ok() {
        utils.batchEdit.call(this);
      },
    },
  };
</script>
