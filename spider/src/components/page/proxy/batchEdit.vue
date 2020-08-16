<template>
  <MyModal :title="title" ref="modal" @ok="ok">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll>
        <FormItem v-if="showProxyType" label="ProxyType" prop="proxyType">
          <MySelect v-model="query.proxyType" enum="ProxyType" width="100%" />
        </FormItem>
        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>
        <FormItem v-if="showProtocol" label="ProxyProtocol" prop="protocol">
          <MySelect v-model="query.protocol" enum="ProxyProtocol" width="100%" />
        </FormItem>
        <FormItem v-if="showPassword" label="Password" prop="password">
          <Input v-model="query.password" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showMaxUseCount" label="MaxUseCount" prop="maxUseCount">
          <Input v-model="query.maxUseCount" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showBlockMaxCount" label="BlockMaxCount" prop="blockMaxCount">
          <Input v-model="query.blockMaxCount" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showBlockTimeout" label="BlockTimeout" prop="blockMaxCount">
          <Input v-model="query.blockTimeout" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showBlockTimeoutTime" label="BlockTimeoutTime" prop="blockMaxCount">
          <Input v-model="query.blockTimeoutTime" placeholder="Input value" />
        </FormItem>
      </MyScroll>
    </Form>
  </MyModal>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: utils.batchEditProps(),
    data() {
      return {
        optionalFields: utils.options([
          "ProxyType",
          "EnableStatus",
          "Protocol",
          "Password",
          "MaxUseCount",
          "BlockMaxCount",
          "BlockTimeout",
          "BlockTimeoutTime",
        ]),
        showingOptionalFields: ["EnableStatus"],
        rules: {
          maxUseCount: [utils.range(1, 1000)],
          blockMaxCount: [utils.range(1, 15)],
        },
        api: "proxy",
        query: {
          proxyType: null,
          enableStatus: null,
          protocol: null,
          account: null,
          password: null,
          maxUseCount: null,
          blockMaxCount: null,
          blockTimeout: null,
          blockTimeoutTime: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsShow.call(this);
    },
    watch: {
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
        utils.batchEdit.call(this);
      },
    },
  };
</script>
