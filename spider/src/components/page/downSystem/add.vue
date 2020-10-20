<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="100">
      <FormItem label="Name" prop="name">
        <Input v-model="query.name" placeholder="Input value" />
      </FormItem>
      <template v-if="optionalFields.length > 0">
        <Divider orientation="left">Optional Filter</Divider>
        <FormItem label="Fields">
          <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
        </FormItem>
      </template>
      <MyScroll height="180px">
        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>
        <FormItem v-if="showPriority" label="Priority" prop="priority">
          <Input v-model="query.priority" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showDescription" label="Description" prop="description">
          <Input v-model="query.description" placeholder="Input value" />
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
        <FormItem v-if="showDataQueue" label="DataQueue" prop="dataQueue">
          <Input v-model="query.dataQueue" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showTaskMaxCon" label="TaskMaxCon" prop="taskMaxRunningCount">
          <Input v-model="query.taskMaxRunningCount" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showDescription" label="Description" prop="description">
          <Input v-model="query.description" placeholder="Input value" />
        </FormItem>
      </MyScroll>
    </Form>
  </MyModal>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: utils.addProps(),
    data() {
      return {
        optionalFields: utils.options([
          "EnableStatus",
          "Priority",
          "Description",
          "AppKey",
          "AppSecret",
          "DataUrl",
          "DataQueue",
          "TaskMaxCon",
        ]),
        showingOptionalFields: ["DataQueue", "TaskMaxCon", "Priority"],
        rules: {
          name: [utils.require()],
          priority: [utils.range(1, 10)],
          taskMaxRunningCount: [utils.range(0, 1000)],
          dataUrl: [utils.url()],
        },
        api: "downSystem",
        query: {
          enableStatus: null,
          name: null,
          priority: null,
          description: null,
          appKey: null,
          appSecret: null,
          dataUrl: null,
          dataQueue: null,
          taskMaxRunningCount: null,
          id: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsFieldsShows.call(this);
      utils.copyFieldsFrom(this.query, this.model);
    utils.restoreOptionalFields("/downSystem/add",this);
    },
    beforeDestroy(){
       utils.snapShotOptionalFields("/downSystem/add",this);
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
        utils.add.call(this);
      },
    },
  };
</script>
