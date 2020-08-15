<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="30%">
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
      const validator = (rule, value, cb) => {
        if (!value) throw new Error("failed");

        cb();
      };
      return {
        optionalFields: [],
        showingOptionalFields: [],
        rules: {
          siteAccountId: [utils.require()],
          cookie: [utils.require()],
          loginIp: [utils.require()],
          expireTime: [utils.require()],
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
              let data = this.$utils.clone(this.query);
              data.expireTime = this.$utils.formatDate(new Date(data.expireTime));
              return this.$api.cookie.add(data);
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
