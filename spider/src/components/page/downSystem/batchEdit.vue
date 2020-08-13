<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="37%">
    <Form ref="form" :model="query" :rules="rules" :label-width="140">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll>
        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>

        <FormItem v-if="showPriority" label="priority" prop="priority">
          <Input v-model="query.priority" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showTaskMaxRunningCount"
          label="taskMaxRunningCount"
          prop="TaskMaxRunningCount"
        >
          <Input v-model="query.taskMaxRunningCount" placeholder="Input value" />
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
          label: "Priority",
          value: "Priority",
        },

        {
          label: "TaskMaxRunningCount",
          value: "TaskMaxRunningCount",
        },
      ],
      showingOptionalFields: ["Priority", "EnableStatus"],
      rules: {
        priority: [
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
      },
      query: {
        enableStatus: null,
        priority: null,
        taskMaxRunningCount: null,
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

    showDescription() {
      return this.$utils.arrayHas(this.showingOptionalFields, "Description");
    },

    showTaskMaxRunningCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "TaskMaxRunningCount"
      );
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
            let resp = await this.$api.downSystem.updateBatch(this.query);
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