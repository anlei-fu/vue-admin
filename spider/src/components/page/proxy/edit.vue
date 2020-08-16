<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll height="400px">
        <FormItem v-if="showProxyType" label="ProxyType" prop="proxyType">
          <MySelect v-model="query.proxyType" enum="ProxyType" width="100%" />
        </FormItem>
        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>
        <FormItem v-if="showProtocol" label="Protocol" prop="protocol">
          <MySelect v-model="query.proxyProtocol" enum="ProxyProtocol" width="100%" />
        </FormItem>
        <FormItem v-if="showAccount" label="Account" prop="account">
          <Input v-model="query.account" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showPassword" label="Password" prop="password">
          <Input v-model="query.password" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showMaxUseCount" label="MaxUseCount" prop="maxUseCount">
          <Input v-model="query.maxUseCount" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showBlockTimeout" label="BlockTimeout" prop="blockTimeoutTime">
          <Input v-model="query.blockTimeoutTime" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showBlockTimeoutTime" label="BlocTimeoutTime" prop="blockTimeoutTime">
          <MyDateTime v-model="query.blockTimeoutTime" />
        </FormItem>
        <FormItem v-if="showBlockMaxCount" label="BlockMaxCount" prop="blockMaxCount">
          <Input v-model="query.blockMaxCount" placeholder="Input value" />
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
          "ProxyType",
          "EnableStatus",
          "Protocol",
          "Account",
          "Password",
          "MaxUseCount",
          "BlockMaxCount",
          "BlockTimeout",
          "BlockTimeoutTime",
        ]),
        showingOptionalFields: [
          "Protocol",
          "MaxUseCount",
          "BlockMaxCount",
          "EnableStatus",
          "ProxyType",
        ],
        rules: {
          ip: [utils.require(), utils.ip()],
          port: [utils.require(), utils.port()],
          maxUseCount: [utils.range(1, 1000)],
          blockMaxCount: [utils.range(1, 15)],
        },
        api: "proxy",
        query: {
          id: null,
          proxyType: null,
          enableStatus: null,
          proxyProtocol: null,
          blockTimeoutTime: null,
          ip: null,
          port: null,
          account: null,
          password: null,
          maxUseCount: null,
          blockMaxCount: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsShow.call(this);
      utils.copyFieldsFrom(this.query, this.model);
    },
    watch: {
      model(newVal) {
        utils.copyFieldsFrom(this.query, newVal);
      },
      showingOptionalFields(newVal) {
        utils.changeShowOptionalFields.call(this, newVal);
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
