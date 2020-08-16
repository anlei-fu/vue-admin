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
    props: utils.batchEditProps(),
    data() {
      return {
        optionalFields: utils.options(["EnableStatus", "Priority", "TaskMaxRunningCount"]),
        showingOptionalFields: ["Priority", "EnableStatus"],
        rules: {
          priority: [utils.range(1, 10)],
          taskMaxRunningCount: [utils.range(0, 1000)],
        },
        api: "downSystem",
        query: {
          enableStatus: null,
          priority: null,
          taskMaxRunningCount: null,
          ids: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsShow.call(this);
    },
    watch: {
      showingOptionalFields(newVal) {
        utils.changeShowOptionalFields.call(this, newVal);
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
