<template>
  <MyModal :title="title" ref="modal" @ok="ok">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll height="300px">
        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>

        <FormItem v-if="showPassword" label="Password" prop="password">
          <Input v-model="query.password" placeholder="Input value" />
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
          label: "Password",
          value: "Password",
        },
      ],
      showingOptionalFields: ["Password", "EnableStatus"],
      rules: {},
      query: {
        enableStatus: null,
        password: null,
      },
    };
  },
  computed: {
    showEnableStatus() {
      return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
    },

    showPassword() {
      return this.$utils.arrayHas(this.showingOptionalFields, "Password");
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
            let resp = await this.$api.siteAccount.updateBatch(this.query);
            if (resp.code == 100) {
              this.close();
              this.$emit("success", this.query);
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