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
        optionalFields: utils.options(["EnableStatus", "Priority", "TaskMaxRunningCount"]),
        showingOptionalFields: ["Priority", "EnableStatus"],
        rules: {
          priority: [utils.range(1, 10)],
          taskMaxRunningCount: [utils.range(0, 1000)],
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
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskMaxRunningCount");
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
