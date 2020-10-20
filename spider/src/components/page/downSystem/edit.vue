<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="100">
      <FormItem label="Fields">
        <MyCheckBoxGroup
          v-model="showingOptionalFields"
          :options="optionalFields"
        />
      </FormItem>
      <MyScroll height="180px">
        <FormItem v-if="showName" label="Name" prop="name">
          <Input v-model="query.name" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showEnableStatus" label="Status" prop="enableStatus">
          <MySelect
            v-model="query.enableStatus"
            enum="EnableStatus"
            width="100%"
          />
        </FormItem>
        <FormItem v-if="showPriority" label="Priority" prop="priority">
          <Input v-model="query.priority" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showAppKey" label="AppKey" prop="appKey">
          <Input v-model="query.appKey" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showAppSecret" label="AppSecret" prop="appSecret">
          <Input v-model="query.appSecret" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showDataUrl" label="DataUrl" prop="dataUrl">
          <Input v-model="query.dataUrl" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showDataQueue" label="DataQ" prop="dataQueue">
          <Input v-model="query.dataQueue" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showTaskMaxCon"
          label="TMaxCon"
          prop="taskMaxRunningCount"
        >
          <Input
            v-model="query.taskMaxRunningCount"
            placeholder="Input value"
          />
        </FormItem>
      </MyScroll>
    </Form>
  </MyModal>
</template>
<script>
import utils from "./../../../common";
export default {
  props: utils.editProps(),
  data() {
    return {
      optionalFields: utils.options([
        "Name",
        "EnableStatus",
        "Priority",
        "Description",
        "AppKey",
        "AppSecret",
        "DataUrl",
        "DataQueue",
        "TaskMaxCon",
      ]),
      showingOptionalFields: [
        "EnableStatus",
        "DataQueue",
        "TaskMaxCon",
        "Priority",
      ],
      rules: {
        priority: [utils.range(1, 10)],
        taskMaxRunningCount: [utils.range(0, 1000)],
        dataUrl: [utils.url()],
      },
      api: "downSystem",
      query: {
        id: null,
        enableStatus: null,
        name: null,
        priority: null,
        description: null,
        appKey: null,
        appSecret: null,
        dataUrl: null,
        dataQueue: null,
        taskMaxRunningCount: null,
      },
    };
  },
  beforeMount() {
    utils.initOptionsFieldsShows.call(this);
    utils.copyFieldsFrom(this.query, this.model);
    utils.restoreOptionalFields("/downSystem/edit",this);
    },
    beforeDestroy(){
       utils.snapShotOptionalFields("/downSystem/edit",this);
    },
  watch: {
    model(newVal) {
      utils.copyFieldsFrom(this.query, newVal);
    },
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
      utils.edit.call(this);
    },
  },
};
</script>
