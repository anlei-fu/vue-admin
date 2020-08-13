<template>
  <MyModal title="title" ref="modal" @ok="ok" width="40%">
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
          <FormItem v-if="showBlockTimeoutTime" label="BlocTimeoutTime" prop="blockTimeoutTime">
          <MyDateTime v-model="query.blockTimeoutTime"/>
        </FormItem>
        <FormItem v-if="showBlockMaxCount" label="BlockMaxCount" prop="blockMaxCount">
          <Input v-model="query.blockMaxCount" placeholder="Input value" />
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
          label: "ProxyType",
          value: "ProxyType",
        },
        {
          label: "EnableStatus",
          value: "EnableStatus",
        },
        {
          label: "Protocol",
          value: "Protocol",
        },
        {
          label: "Account",
          value: "Account",
        },
        {
          label: "Password",
          value: "Password",
        },
        {
          label: "MaxUseCount",
          value: "MaxUseCount",
        },
        {
          label: "BlockMaxCount",
          value: "BlockMaxCount",
        },
        {
          label: "BlockTimeout",
          value: "BlockTimeout",
        },
         {
          label: "BlockTimeoutTime",
          value: "BlockTimeoutTime",
        },
      ],
      showingOptionalFields: [
        "Protocol",
        "MaxUseCount",
        "BlockMaxCount",
        "EnableStatus",
        "ProxyType",
      ],
      rules: {
        ip: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
          {
            type: "ip",
            message: "incorrect ip",
            trigger: "blur",
          },
        ],
        port: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
          {
            min: 0,
            max: 63000,
            message: "incorrect port number",
            trigger: "blur",
          },
        ],
        maxUseCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        blockMaxCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
      },
      query: {
        id: null,
        proxyType: null,
        enableStatus: null,
        protocol: null,
        blockTimeoutTime:null,
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
  watch: {
    model(newVal) {
      this.$utils.copyFieldsFrom(this.query, newVal);
    },
  },
  computed: {

   showBlockTimeoutTime() {
      return this.$utils.arrayHas(this.showingOptionalFields, "BlockTimeoutTime");
    },

    showBlockTimeout() {
      return this.$utils.arrayHas(this.showingOptionalFields, "BlockTimeout");
    },
    showProxyType() {
      return this.$utils.arrayHas(this.showingOptionalFields, "ProxyType");
    },

    showEnableStatus() {
      return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
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
            let resp = await this.$api.proxy.updateById(this.query);
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