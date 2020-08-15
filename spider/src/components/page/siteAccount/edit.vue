<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>

      <MyScroll height="350px">
        <FormItem v-if="showLoginType" label="LoginType" prop="loginType">
          <MySelect v-model="query.loginType" enum="LoginType" width="100%" />
        </FormItem>
        <FormItem v-if="showAccountType" label="AccountType" prop="enableStatus">
          <MySelect v-model="query.accountType" enum="AccountType" width="100%" />
        </FormItem>
        <FormItem v-if="showValidated" label="Validated" prop="enableStatus">
          <MySelect v-model="query.validated" enum="YesNo" width="100%" />
        </FormItem>
        <FormItem v-if="showSiteId" label="Site" prop="siteId">
          <MySelect v-model="query.siteId" enum="Site" width="100%" />
        </FormItem>

        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>

        <FormItem v-if="showAccount" label="Account" prop="account">
          <Input v-model="query.account" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showPhone" label="Phone" prop="phone">
          <Input v-model="query.phone" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showBlockTimeoutTime" label="BlockTimeoutTime" prop="blockTimeoutTime">
          <MyDateTime v-model="query.blockTimeoutTime" />
        </FormItem>

        <FormItem v-if="showDelayTimeoutTime" label="DelayTimeoutTime" prop="delayTimeoutTime">
          <MyDateTime v-model="query.delayTimeoutTime" />
        </FormItem>

        <FormItem v-if="showEmail" label="Email" prop="email">
          <Input v-model="query.email" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showPassword" label="Password" prop="password">
          <Input v-model="query.password" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showDescription" label="Description" prop="description">
          <Input v-model="query.description" placeholder="Input value" />
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
          "AccountType",
          "Validated",
          "LoginType",
          "SiteId",
          "EnableStatus",
          "Account",
          "Phone",
          "Email",
          "Password",
          "BlockTimeoutTime",
          "DelayTimeoutTime",
          "Description",
        ]),
        showingOptionalFields: ["Password"],
        rules: {
          emial: [utils.email()],
          phone: [utils.phone],
        },
        query: {
          id: null,
          accountType: null,
          validated: null,
          loginType: null,
          siteId: null,
          enableStatus: null,
          account: null,
          nickName: null,
          phone: null,
          email: null,
          password: null,
          blockTimeoutTime: null,
          delayTimeouttIME: null,
          description: null,
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
      showAccountType() {
        return this.$utils.arrayHas(this.showingOptionalFields, "AccountType");
      },

      showValidated() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Validated");
      },

      showBlockTimeoutTime() {
        return this.$utils.arrayHas(this.showingOptionalFields, "BlockTimeoutTime");
      },

      showDelayTimeoutTime() {
        return this.$utils.arrayHas(this.showingOptionalFields, "DelayTimeoutTime");
      },

      showNickName() {
        return this.$utils.arrayHas(this.showingOptionalFields, "NickName");
      },

      showLoginType() {
        return this.$utils.arrayHas(this.showingOptionalFields, "LoginType");
      },

      showSiteId() {
        return this.$utils.arrayHas(this.showingOptionalFields, "SiteId");
      },

      showEnableStatus() {
        return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
      },

      showCreateTime() {
        return this.$utils.arrayHas(this.showingOptionalFields, "CreateTime");
      },

      showAccount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Account");
      },

      showPhone() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Phone");
      },

      showEmail() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Email");
      },

      showPassword() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Password");
      },

      showBlockCurrentCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "BlockCurrentCount");
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
              let resp = await this.$api.siteAccount.updateById(this.query);
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
