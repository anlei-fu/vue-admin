<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="60%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Name" prop="name">
        <Input v-model="query.name" placeholder="Input value" />
      </FormItem>
      <template v-if="optionalFields.length > 0">
        <Divider orientation="left">Optional Filter</Divider>
        <FormItem label="Fields">
          <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
        </FormItem>
      </template>
      <MyScroll height="180px">
        <FormItem v-if="showParentSiteId" label="ParentSite" prop="parentSiteId">
          <MySelect v-model="query.parentSiteId" enum="parentSiteId" width="100%" />
        </FormItem>
        <FormItem v-if="showNeedUseCookie" label="NeedUseCookie" prop="YesNo">
          <MySelect v-model="query.needUseCookie" enum="YesNo" width="100%" />
        </FormItem>
        <FormItem v-if="showLoginNeedVcode" label="LoginNeedVcode" prop="loginNeedVcode">
          <MySelect v-model="query.loginNeedVcode" enum="YesNo" width="100%" />
        </FormItem>
        <FormItem v-if="showLoginCaptaType" label="LoginCaptaType" prop="loginCaptaType">
          <MySelect v-model="query.loginCaptaType" enum="LoginCaptaType" width="100%" />
        </FormItem>
        <FormItem v-if="showNeedUseProxy" label="NeedUseProxy" prop="needUseProxy">
          <MySelect v-model="query.needUseProxy" enum="YesNo" width="100%" />
        </FormItem>
        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>
        <FormItem v-if="showDomain" label="Domain" prop="domain">
          <Input v-model="query.domain" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showHomePageUrl" label="HomePageUrl" prop="homepageUrl">
          <Input v-model="query.homepageUrl" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showIpDelayTimeout" label="IpDelayTimeout" prop="ipDelayTimeout">
          <Input v-model="query.ipDelayTimeout" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showIpBlockTimeout" label="IpBlockTimeout" prop="ipBlockTimeout">
          <Input v-model="query.ipBlockTimeout" placeholder="Input value" />
        </FormItem>

        <FormItem
          v-if="showIpMinuteSpeedLimit"
          label="IpMinuteSpeedLimit"
          prop="ipMinuteSpeedLimit"
        >
         <Input v-model="query.ipMinuteSpeedLimit" placeholder="Input value" />
        </FormItem>
          <FormItem
            v-if="showIp10MinuteSpeedLimit"
            label="Ip10MinuteSpeedLimit"
            prop="ip10MinuteSpeedLimit"
          >
           <Input v-model="query.ip10MinuteSpeedLimit" placeholder="Input value" />
          </FormItem>
          <FormItem v-if="showIpHourSpeedLimit" label="IpHourSpeedLimit" prop="ipHourSpeedLimit">
            <Input v-model="query.ipHourSpeedLimit" placeholder="Input value" />
          </FormItem>
        <FormItem v-if="showIpDaySpeedLimit" label="IpDaySpeedLimit" prop="ipDaySpeedLimit">
          <Input v-model="query.ipDaySpeedLimit" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showAccountAllowCrossIp"
          label="AccountAllowCrossIp"
          prop="accountAllowCrossIp"
        >
          <MySelect v-model="query.accountAllowCrossIp" enum="YesNo" width="100%" />
        </FormItem>
        <FormItem
          v-if="showAccountAllowMultiple"
          label="AccountAllowMultiple"
          prop="accountAllowMultiple"
        >
          <MySelect v-model="query.accountAllowMultiple" enum="YesNo" width="100%" />
        </FormItem>
        <FormItem
          v-if="showAccountMinuteSpeedLimit"
          label="AccountMinuteSpeedLimit"
          prop="accountMinuteSpeedLimit"
        >
          <Input v-model="query.accountMinuteSpeedLimit" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showAccountHourSpeedLimit"
          label="AccountHourSpeedLimit"
          prop="accountHourSpeedLimit"
        >
          <Input v-model="query.accountHourSpeedLimit" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showAccountDaySpeedLimit"
          label="AccountDaySpeedLimit"
          prop="accountDaySpeedLimit"
        >
          <Input v-model="query.accountDaySpeedLimit" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showAccountMaxBlockCount"
          label="AccountMaxBlockCount"
          prop="accountMaxBlockCount"
        >
          <Input v-model="query.accountMaxBlockCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showAccountBlockTimeout"
          label="AccountBlockTimeout"
          prop="accountBlockTimeout"
        >
          <Input v-model="query.accountBlockTimeout" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showAccountMaxCookieCount"
          label="AccountMaxCookieCount"
          prop="accountMaxCookieCount"
        >
          <Input v-model="query.accountMaxCookieCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showAccountDelayTimeout"
          label="AccountDelayTimeout"
          prop="accountDelayTimeout"
        >
          <Input v-model="query.accountDelayTimeout" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showCookieMaxBlockCount"
          label="CookieMaxBlockCount"
          prop="cookieMaxBlockCount"
        >
          <Input v-model="query.cookieMaxBlockCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showCookieExpireTimeout"
          label="CookieExpireTimeout"
          prop="cookieExpireTimeout"
        >
          <Input v-model="query.cookieExpireTimeout" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showCookieDelayTimeout"
          label="CookieDelayTimeout"
          prop="cookieDelayTimeout"
        >
          <Input v-model="query.cookieDelayTimeout" placeholder="Input value" />
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
  props: utils.addProps(),
  data() {
    return {
      optionalFields: utils.options([
        "ParentSiteId",
        "NeedUseCookie",
        "LoginNeedVcode",
        "LoginCaptaType",
        "NeedUseProxy",
        "EnableStatus",
        "Domain",
        "HomePageUrl",
        "IpDelayTimeout",
        "IpBlockTimeout",
        "IpMinuteSpeedLimit",
        "Ip10MinuteSpeedLimit",
        "IpHourSpeedLimit",
        "IpDaySpeedLimit",
        "AccountAllowCrossIp",
        "AccountAllowMultiple",
        "AccountMinuteSpeedLimit",
        "AccountHourSpeedLimit",
        "AccountDaySpeedLimit",
        "AccountMaxBlockCount",
        "AccountBlockTimeout",
        "AccountMaxCookieCount",
        "AccountDelayTimeout",
        "CookieMaxBlockCount",
        "CookieExpireTimeout",
        "CookieDelayTimeout",
        "Description",
      ]),
      showingOptionalFields: [
        "HomePageUrl",
        "NeedUseProxy",
        "NeedUseCookie",
        "CrawlerAutoDownloadPage",
        "IpMinuteSpeedLimit",
        "CookieExpireTimeout",
      ],
      rules: {
        name: [utils.require()],
        ipDelayTimeout: [utils.require(), utils.range(0, 100000000)],
        ipBlockTimeout: [utils.range(5, 100000)],
        ipHourSpeedLimit: [utils.range(1, 1000000)],
        ipMinuteSpeedLimit: [utils.range(1, 100000)],
        ip10MinuteSpeedLimit: [utils.range(1, 100000)],
        ipDaySpeedLimit: [utils.range(1, 10000000)],
        accountMinuteSpeedLimit: [utils.range(1, 100)],
        accountHourSpeedLimit: [utils.range(1, 3000)],
        accountDaySpeedLimit: [utils.range(1, 30000)],
        accountMaxBlockCount: [utils.range(1, 20)],
        accountBlockTimeout: [utils.range(1, 3000)],
        accountMaxCookieCount: [utils.range(1, 3000)],
        accountDelayTimeout: [utils.range(1, 3000)],
        cookieMaxBlockCount: [utils.range(1, 20)],
        cookieExpireTimeout: [utils.range(1, 3000)],
        cookieDelayTimeout: [utils.range(1, 3000)],
        homepageUrl: [utils.url()],
      },
      api: "site",
      query: {
        parentSiteId: null,
        needUseCookie: null,
        loginNeedVcode: null,
        loginCaptaType: null,
        needUseProxy: null,
        enableStatus: null,
        name: null,
        domain: null,
        homepageUrl: null,
        ipDelayTimeout: null,
        ipBlockTimeout: null,
        ipHourSpeedLimit: null,
        ipMinuteSpeedLimit: null,
        ip10MinuteSpeedLimit: null,
        ipDaySpeedLimit: null,
        accountAllowCrossIp: null,
        accountAllowMultiple: null,
        accountMinuteSpeedLimit: null,
        accountHourSpeedLimit: null,
        accountDaySpeedLimit: null,
        accountMaxBlockCount: null,
        accountBlockTimeout: null,
        accountMaxCookieCount: null,
        accountDelayTimeout: null,
        cookieMaxBlockCount: null,
        cookieExpireTimeout: null,
        cookieDelayTimeout: null,
        description: null,
        id: null,
      },
    };
  },
  beforeMount() {
    utils.initOptionsFieldsShows.call(this);
    utils.copyFieldsFrom(this.query, this.model);
      utils.restoreOptionalFields("/site/add",this);
    },
    beforeDestroy(){
       utils.snapShotOptionalFields("/site/add",this);
    },
  watch: {
    model(newVal) {
      this.$utils.resetQuery(this.query);
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
