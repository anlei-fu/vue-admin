<template>
  <MyModal title="title" ref="modal" @ok="ok" width="50%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>

      <MyScroll height="150px">
        <FormItem v-if="showParentSiteId" label="ParentSite" prop="parentSiteId">
          <MySelect v-model="query.parentSiteId" enum="parentSiteId" width="100%" />
        </FormItem>

        <FormItem
          v-if="showCrawlNeedUseCookie"
          label="NeedUseCookie"
          prop="YesNo"
        >
          <MySelect v-model="query.crawlNeedUseCookie" enum="YesNo" width="100%" />
        </FormItem>

        <FormItem v-if="showLoginNeedVcode" label="LoginNeedVcode" prop="loginNeedVcode">
          <MySelect v-model="query.loginNeedVcode" enum="YesNo" width="100%" />
        </FormItem>

        <FormItem v-if="showLoginCaptaType" label="CaptaType" prop="loginCaptaType">
          <MySelect v-model="query.loginCaptaType" enum="LoginCaptaType" width="100%" />
        </FormItem>

        <FormItem v-if="showNeedUseProxy" label=" NeedProxy" prop="needUseProxy">
          <MySelect v-model="query.needUseProxy" enum="YesNo" width="100%" />
        </FormItem>


        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>

        <FormItem v-if="showDomain" label="Domain" prop="domain">
          <Input v-model="query.domain" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showHomePageUrl" label="HomePageUrl" prop="homePageUrl">
          <Input v-model="query.homePageUrl" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showIpDelayTimeout" label="IpDelayTimeout" prop="ipDelayTimeout">
          <Input v-model="query.ipDelayTimeout" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showIpBlockTimeout" label="IpBlockTimeout" prop="ipBlockTimeout">
          <Input v-model="query.ipBlockTimeout" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showIpHourSpeedLimit" label="IpHourSpeedLimit" prop="ipHourSpeedLimit">
          <Input v-model="query.ipHourSpeedLimit" placeholder="Input value" />
        </FormItem>

        <FormItem
          v-if="showIpMinuteSpeedLimit"
          label="IpMinuteSpeedLimit"
          prop="ipMinuteSpeedLimit"
        >
          <Input v-model="query.ipMinuteSpeedLimit" placeholder="Input value" />
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
          label: "EnableStatus",
          value: "EnableStatus",
        },
        {
          label: "Description",
          value: "Description",
        },
          {
          label: "NeedUseCookie",
          value: "CrawlNeedUseCookie",
        },
        {
          label: "NeedVcode",
          value: "LoginNeedVcode",
        },
        {
          label: "CaptaType",
          value: "LoginCaptaType",
        },
        {
          label: "NeedUseProxy",
          value: "NeedUseProxy",
        },

   
        {
          label: "LoginNeedVCode",
          value: "LoginNeedVCode",
        },
         {
          label: "IpMaxBlockCount",
          value: "IpMaxBlockCount",
        },
          {
          label: "IpDelayTimeout",
          value: "IpDelayTimeout",
        },
        {
          label: "IpBlockTimeout",
          value: "IpBlockTimeout",
        },
        
        
        {
          label: "IpMinuteSpeedLimit",
          value: "IpMinuteSpeedLimit",
        },

           {
          label: "IpHoruSpeedLimit",
          value: "IpHoruSpeedLimit",
        },
        {
          label: "IpDaySpeedLimit",
          value: "IpDaySpeedLimit",
        },
        {
          label: "AccountAllowCrossIp",
          value: "AccountAllowCrossIp",
        },

           {
          label: "AccountAllowMultiple",
          value: "AccountAllowMultiple",
        },
         {
          label: "AccountDelayTimeout",
          value: "AccountDelayTimeout",
        },

           {
          label: "AccountMaxBlockCount",
          value: "AccountMaxBlockCount",
        },
          {
          label: "AccountBlockTimeout",
          value: "AccountBlockTimeout",
        },
          {
          label: "AccountMaxCookieCount",
          value: "AccountMaxCookieCount",
        },
        
         {
          label: "AccountMinuteSpeedLimit",
          value: "AccountMinuteSpeedLimit",
        },

           {
          label: "AccountHoruSpeedLimit",
          value: "AccountHoruSpeedLimit",
        },
        {
          label: "AccountDaySpeedLimit",
          value: "AccountDaySpeedLimit",
        },

         {
          label: "CookieMinuteSpeedLimit",
          value: "CookieMinuteSpeedLimit",
        },

           {
          label: "CookieHourSpeedLimit",
          value: "CookieHourSpeedLimit",
        },
        {
          label: "CookieDaySpeedLimit",
          value: "CookieDaySpeedLimit",
        },
        {
          label: "CookieDelayTimeout",
          value: "CookieDelayTimeout",
        },

           {
          label: "CookieExpireTimeout",
          value: "CookieExpireTimeout",
        },
      ],
      showingOptionalFields: ["ScriptType","EnableStatus"],
      rules: {
        name: [
          {
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        ipDelayTimeout: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        ipBlockTimeout: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        ipHourSpeedLimit: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        ipMinuteSpeedLimit: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        ipDaySpeedLimit: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        accountMinuteSpeedLimit: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        accountHourSpeedLimit: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        accountDaySpeedLimit: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        accountMaxBlockCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        accountBlockTimeout: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        accountMaxCookieCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        accountDelayTimeout: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        cookieMaxBlockCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        cookieExpireTimeout: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        cookieDelayTimeout: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
      },
      query: {
        parentSiteId: null,
        crawlNeedUseCookie: null,
        loginNeedVcode: null,
        loginCaptaType: null,
        needUseProxy: null,
        enableStatus: null,
        name: null,
        domain: null,
        homePageUrl: null,
        ipDelayTimeout: null,
        ipBlockTimeout: null,
        ipHourSpeedLimit: null,
        ipMinuteSpeedLimit: null,
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
  created() {
    this.$utils.copyFieldsFrom(this.query, this.model);
  },
  watch: {
    model(newVal) {
      this.$utils.copyFieldsFrom(this.query, newVal);
    },
  },
  computed: {
    

    showParentSiteId() {
      return this.$utils.arrayHas(this.showingOptionalFields, "ParentSiteId");
    },

    showCrawlNeedUseCookie() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "CrawlNeedUseCookie"
      );
    },

    showLoginNeedVcode() {
      return this.$utils.arrayHas(this.showingOptionalFields, "LoginNeedVcode");
    },

    showLoginCaptaType() {
      return this.$utils.arrayHas(this.showingOptionalFields, "LoginCaptaType");
    },

    showNeedUseProxy() {
      return this.$utils.arrayHas(this.showingOptionalFields, "NeedUseProxy");
    },

    showEnableStatus() {
      return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
    },

    showDomain() {
      return this.$utils.arrayHas(this.showingOptionalFields, "Domain");
    },

    showHomePageUrl() {
      return this.$utils.arrayHas(this.showingOptionalFields, "HomePageUrl");
    },

    showIpDelayTimeout() {
      return this.$utils.arrayHas(this.showingOptionalFields, "IpDelayTimeout");
    },

    showIpBlockTimeout() {
      return this.$utils.arrayHas(this.showingOptionalFields, "IpBlockTimeout");
    },

    showIpHourSpeedLimit() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "IpHourSpeedLimit"
      );
    },

    showIpMinuteSpeedLimit() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "IpMinuteSpeedLimit"
      );
    },

    showIpDaySpeedLimit() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "IpDaySpeedLimit"
      );
    },

    showAccountAllowCrossIp() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "AccountAllowCrossIp"
      );
    },

    showAccountAllowMultiple() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "AccountAllowMultiple"
      );
    },

    showAccountMinuteSpeedLimit() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "AccountMinuteSpeedLimit"
      );
    },

    showAccountHourSpeedLimit() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "AccountHourSpeedLimit"
      );
    },

    showAccountDaySpeedLimit() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "AccountDaySpeedLimit"
      );
    },

    showAccountMaxBlockCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "AccountMaxBlockCount"
      );
    },

    showAccountBlockTimeout() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "AccountBlockTimeout"
      );
    },

    showAccountMaxCookieCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "AccountMaxCookieCount"
      );
    },

    showAccountDelayTimeout() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "AccountDelayTimeout"
      );
    },

    showCookieMaxBlockCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "CookieMaxBlockCount"
      );
    },

    showCookieExpireTimeout() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "CookieExpireTimeout"
      );
    },

    showCookieDelayTimeout() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "CookieDelayTimeout"
      );
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
            let resp = await this.$api.site.updateById(this.query);
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