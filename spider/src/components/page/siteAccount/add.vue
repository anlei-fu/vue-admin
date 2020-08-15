<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Site" prop="siteId">
        <MySelect v-model="query.siteId" enum="Site" width="100%" />
      </FormItem>
      <FormItem label="Account" prop="account">
        <Input v-model="query.account" placeholder="Input value" />
      </FormItem>

      <template v-if="optionalFields.length > 0">
        <Divider orientation="left">Optional Filter</Divider>
        <FormItem label="Fields">
          <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
        </FormItem>
      </template>

      <MyScroll>
        <FormItem v-if="showNickName" label="NickName" prop="nickName">
          <Input v-model="query.nickName" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showLoginType" label="LoginType" prop="loginType">
          <MySelect v-model="query.loginType" enum="LoginType" width="100%" />
        </FormItem>
        <FormItem v-if="showAccountType" label="AccountType" prop="enableStatus">
          <MySelect v-model="query.accountType" enum="AccountType" width="100%" />
        </FormItem>
        <FormItem v-if="showValidated" label="Validated" prop="enableStatus">
          <MySelect v-model="query.validated" enum="YesNo" width="100%" />
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
          "EnableStatus",
          "NickName",
          "Phone",
          "Email",
          "Password",
          "Description",
        ]),
        showingOptionalFields: ["Email", "Phone", "Password"],
        rules: {
          siteId: [utils.require()],
          account: [utils.require()],
          emial: [utils.email()],
          phone: [utils.phone],
        },
        query: {
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
          blockCurrentCount: null,
          description: null,
          id: null,
        },
      };
    },
    created() {
      this.$utils.copyFieldsFrom(this.query, this.model);
    },

    computed: {
      showAccountType() {
        return this.$utils.arrayHas(this.showingOptionalFields, "AccountType");
      },

      showValidated() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Validated");
      },
      showLoginType() {
        return this.$utils.arrayHas(this.showingOptionalFields, "LoginType");
      },

      showNickName() {
        return this.$utils.arrayHas(this.showingOptionalFields, "NickName");
      },
      showEnableStatus() {
        return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
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

      showDescription() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Description");
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
              return this.$api.siteAccount.add(this.query);
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
