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
  import utils from "./../../../common";
  export default {
    props: utils.addProps(),
    data() {
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
        api: "cookie",
        query: {
          siteAccountId: null,
          cookie: null,
          loginIp: null,
          expireTime: null,
          id: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsFieldsShows.call(this);
      utils.copyFieldsFrom(this.query, this.model);
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
