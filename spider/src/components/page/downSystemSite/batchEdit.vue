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
      optionalFields: [
        {
          label: "EnableStatus",
          value: "EnableStatus",
        },

        {
          label: "UrlMaxCacheCount",
          value: "UrlMaxCacheCount",
        },
        {
          label: "Priority",
          value: "Priority",
        },

        {
          label: "TaskUrlBatchCount",
          value: "TaskUrlBatchCount",
        },
        {
          label: "TaskMaxWaitToBindCount",
          value: "TaskMaxWaitToBindCount",
        },
        {
          label: "TaskMaxRunningCount",
          value: "TaskMaxRunningCount",
        },
        {
          label: "TaskTimeout",
          value: "TaskTimeout",
        },
      ],
      showingOptionalFields: ["EnableStatus"],
      rules: {
        priority: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],

        urlMaxCacheCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        urlMaxCrawlCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],

        taskUrlBatchCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskMaxWaitToBindCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskMaxRunningCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskTimeout: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
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
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "UrlMaxCacheCount"
      );
    },

    showTaskUrlBatchCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "TaskUrlBatchCount"
      );
    },

    showTaskMaxWaitToBindCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "TaskMaxWaitToBindCount"
      );
    },

    showTaskMaxRunningCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "TaskMaxRunningCount"
      );
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