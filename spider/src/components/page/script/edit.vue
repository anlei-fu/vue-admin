<template>
  <MyModal title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="50">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>

      <MyScroll>
        <FormItem v-if="showScriptType" label="ScriptType" prop="scriptType">
          <MySelect v-model="query.scriptType" enum="ScriptType" width="100%" />
        </FormItem>

        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>

        <FormItem v-if="showDescription" label="Description" prop="description">
          <Input v-model="query.description" placeholder="Input value" />
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
    return {
      optionalFields: [
        {
          label: "ScriptType",
          value: "ScriptType",
        },
        {
          label: "EnableStatus",
          value: "EnableStatus",
        },
        {
          label: "description",
          value: "Description",
        },
      ],
      showingOptionalFields: ["ScriptType","EnableStatus"],
      rules: {
        path: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        downSiteId: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
      },
      query: {
        scriptType: null,
        downSiteId: null,
        enableStatus: null,
        path: null,
        description: null,
        id: null,
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
    

    showScriptType() {
      return this.$utils.arrayHas(this.showingOptionalFields, "ScriptType");
    },

    showEnableStatus() {
      return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
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
            let resp = await this.$api.script.updateById(this.query);
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