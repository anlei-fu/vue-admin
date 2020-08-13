<template>
  <MyModal title="title" ref="modal" @ok="ok" width="30%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Site">
        <MySelect v-model="siteId" enum="Site" width="100%" />
      </FormItem>

      <FormItem label="Account" prop="siteAccountId">
        <MySelect
          v-model="query.siteAccountId"
          :options="accountOptions"
          value="id"
          label="account"
          width="100%"
        />
      </FormItem>

      <FormItem label="Cookie" prop="cookie">
        <Input v-model="query.cookie" placeholder="Input value" />
      </FormItem>

      <FormItem label="LoginIp" prop="loginIp">
        <Input v-model="query.loginIp" placeholder="Input value" />
      </FormItem>

      <FormItem label="Expire" prop="expireTime">
        <MyDateTime v-model="query.expireTime" width="100%" />
      </FormItem>

      <template v-if="optionalFields.length>0">
        <Divider orientation="left">Optional Filter</Divider>
        <FormItem label="Fields">
          <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
        </FormItem>
      </template>

      <MyScroll></MyScroll>
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
        siteId: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        siteAccountId: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        cookie: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        loginIp: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        expireTime: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
      },
      siteId: null,
      accountOptions: [],
      query: {
        siteAccountId: null,
        cookie: null,
        loginIp: null,
        expireTime: null,
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
    async siteId(newVal) {
      this.query.siteAccountId = null;
      this.accountOptions = [];
      let resp = await this.$api.siteAccount.getBySite({ siteId: this.siteId });
      this.accountOptions = resp.data;
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
            return this.$api.cookie.add(this.query);
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