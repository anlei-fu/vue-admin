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
      </MyScroll>
    </Form>
  </MyModal>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: {
      ids: {
        type: Array,
        default: () => [],
      },
      title: {
        type: String,
        default: "title",
      },
    },

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
        ]),
        showingOptionalFields: ["EnableStatus"],
        rules: {
          priority: [utils.range(1, 10)],
          crawlerPageTimeout: [utils.range(3000, 600000)],
          urlMaxCacheCount: [utils.range(1000, 20000)],
          urlMaxCrawlCount: [utils.range(1, 20)],
          taskUrlBatchCount: [utils.range(1, 1000)],
          taskMaxWaitToBindCount: [utils.range(1, 20)],
          taskMaxRunningCount: [utils.range(1, 1000)],
          taskTimeout: [utils.range(1, 120)],
          urlMaxDepth: [utils.range(1, 100)],
          taskUrlMaxFailCount: [utils.range(10, 500)],
          taskUrlMaxContinuouslyFailCount: [utils.range(1, 30)],
          taskUrlMaxConcurrency: [utils.range(1, 1000)],
        },
        query: {
          enableStatus: null,
          priority: null,
          taskUrlBatchCount: null,
          taskMaxWaitToBindCount: null,
          taskMaxRunningCount: null,
          taskTimeout: null,
          ids: null,
        },
      };
    },
    computed: {
      showEnableStatus() {
        return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
      },
      showPriority() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Priority");
      },

      showUrlMaxCacheCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "UrlMaxCacheCount");
      },

      showTaskUrlBatchCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskUrlBatchCount");
      },

      showTaskMaxWaitToBindCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskMaxWaitToBindCount");
      },

      showTaskMaxRunningCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskMaxRunningCount");
      },

      showTaskTimeout() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskTimeout");
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
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$utils.handleNormalRequest.call(this, async () => {
              this.query.ids = this.ids;
              let resp = await this.$api.downSystemSite.updateBatch(this.query);
              if (resp.code == 100) {
                this.$emit("success", this.query);
                this.close();
              }

              return resp;
            });
          }
        });
      },
    },
  };
</script>
<style scoped>
  .footer {
    text-align: right;
  }
</style>
