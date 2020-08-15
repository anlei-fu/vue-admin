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
      <MyScroll>
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

        <FormItem v-if="showTaskMaxRunningCount" label="MaxRunningCount" prop="taskMaxRunningCount">
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
    props: {
      model: {
        type: Object,
        default: () => {},
      },
      title: {
        type: String,
        default: "",
      },
    },
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
          "TaskMaxRunningCount",
        ]),
        showingOptionalFields: ["DataQueue", "TaskMaxRunningCount", "Priority"],
        rules: {
          name: [utils.require()],
          priority: [utils.range(1, 10)],
          taskMaxRunningCount: [utils.range(0, 1000)],
          dataUrl: [utils.url()],
        },
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
    created() {
      this.$utils.copyFieldsFrom(this.query, this.model);
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

      showAppKey() {
        return this.$utils.arrayHas(this.showingOptionalFields, "AppKey");
      },

      showAppSecret() {
        return this.$utils.arrayHas(this.showingOptionalFields, "AppSecret");
      },

      showDataUrl() {
        return this.$utils.arrayHas(this.showingOptionalFields, "DataUrl");
      },

      showDataQueue() {
        return this.$utils.arrayHas(this.showingOptionalFields, "DataQueue");
      },

      showTaskMaxRunningCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskMaxRunningCount");
      },
    },

    watch: {
      model(newVal) {
        this.$utils.copyFieldsFrom(this.query, newVal);
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
              return this.$api.downSystem.add(this.query);
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
