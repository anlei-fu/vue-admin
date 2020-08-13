<template>
  <MyModal title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="90">
      <FormItem label="Type" prop="type">
        <Input v-model="query.type" placeholder="Input value" />
      </FormItem>

      <FormItem label="Value" prop="value">
        <Input v-model="query.value" placeholder="Input value" />
      </FormItem>

      <FormItem label="Label" prop="label">
        <Input v-model="query.label" placeholder="Input value" />
      </FormItem>
       <FormItem label="Color" prop="color">
        <Input v-model="query.color" placeholder="Input value" />
      </FormItem>

      <template v-if="optionalFields.length>0">
        <Divider orientation="left">Optional Filter</Divider>
        <FormItem label="Fields">
          <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
        </FormItem>
      </template>

     
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
      optionalFields: [],
      showingOptionalFields: [],
      rules: {
        type: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        value: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        label: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
      },
      query: {
        type: null,
        value: null,
        label: null,
        color:null,
      },
    };
  },
  created() {
    this.$utils.copyFieldsFrom(this.query, this.model);
  },

  computed: {
    
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
            return this.$api.dictionary.add(this.query);
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