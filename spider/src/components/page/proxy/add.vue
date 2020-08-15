<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="100">
      <FormItem label="Ip" prop="ip">
        <Input v-model="query.ip" placeholder="Input value" />
      </FormItem>

      <FormItem label="Port" prop="port">
        <Input v-model="query.port" placeholder="Input value" />
      </FormItem>

      <template v-if="optionalFields.length > 0">
        <Divider orientation="left">Optional Filter</Divider>
        <FormItem label="Fields">
          <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
        </FormItem>
      </template>

      <MyScroll>
        <FormItem v-if="showProxyType" label="ProxyType" prop="proxyType">
          <MySelect v-model="query.proxyType" enum="ProxyType" width="100%" />
        </FormItem>

        <FormItem v-if="showEnableStatus" label="Status" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>

        <FormItem v-if="showProtocol" label="Protocol" prop="protocol">
          <MySelect v-model="query.protocol" enum="ProxyProtocol" width="100%" />
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
          "ProxyType",
          "EnableStatus",
          "Protocol",
          "Account",
          "Password",
          "MaxUseCount",
          "BlockMaxCount",
          "BlockTimeout",
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
        query: {
          proxyType: null,
          blockTimeoutTime: null,
          enableStatus: null,
          protocol: null,
          ip: null,
          port: null,
          account: null,
          password: null,
          maxUseCount: null,
          blockMaxCount: null,
        },
      };
    },
    created() {
      this.$utils.copyFieldsFrom(this.query, this.model);
    },

    computed: {
      showProxyType() {
        return this.$utils.arrayHas(this.showingOptionalFields, "ProxyType");
      },

      showEnableStatus() {
        return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
      },
      showBlockTimeout() {
        return this.$utils.arrayHas(this.showingOptionalFields, "BlockTimeout");
      },

      showProtocol() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Protocol");
      },

      showAccount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Account");
      },

      showPassword() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Password");
      },

      showMaxUseCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "MaxUseCount");
      },

      showBlockMaxCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "BlockMaxCount");
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
              return this.$api.proxy.add(this.query);
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
