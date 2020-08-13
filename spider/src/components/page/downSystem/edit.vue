<template>
  <MyModal title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="100">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>

      <MyScroll>
        <FormItem v-if="showEnableStatus" label="Status" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
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
          v-if="showTaskMaxRunningCount"
          label="TMaxCon"
          prop="taskMaxRunningCount"
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
     const rangeValidator= (rule,value,cb)=>{
      if(value>=rule.max){
        cb(new Error("over max value"));
        return;
      }

      if(value<rule.min){
        cb(new Error("less than min value"));
        return;
      }


        cb();
    }
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
          label: "Description",
          value: "Description",
        },
        {
          label: "AppKey",
          value: "AppKey",
        },
        {
          label: "AppSecret",
          value: "AppSecret",
        },
        {
          label: "DataUrl",
          value: "DataUrl",
        },
        {
          label: "DataQueue",
          value: "DataQueue",
        },
        {
          label: "MaxRunningCount",
          value: "TaskMaxRunningCount",
        },
      ],
      showingOptionalFields: ["EnableStatus","DataQueue","TaskMaxRunningCount","Priority"],
      rules: {
        name: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        priority: [
          {
            validator:rangeValidator,
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskMaxRunningCount: [
          {
               validator:rangeValidator,
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
      },
      query: {
         id:null,
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
  created() {
    this.$utils.copyFieldsFrom(this.query, this.model);
  },
  watch: {
    model(newVal) {
      this.$utils.copyFieldsFrom(this.query, newVal);
    },
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
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "TaskMaxRunningCount"
      );
    },

    showDescription() {
      return this.$utils.arrayHas(this.showingOptionalFields, "Description");
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
            let resp = await this.$api.downSystem.updateById(this.query);
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