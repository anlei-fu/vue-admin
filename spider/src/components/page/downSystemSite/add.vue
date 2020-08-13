<template>
  <MyModal title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Site" prop="siteId">
        <MySelect v-model="query.siteId" enum="Site" width="100%" />
      </FormItem>

      <FormItem label="DownSystem" prop="downSystemId">
        <MySelect v-model="query.downSystemId" enum="System" width="100%" />
      </FormItem>

      <template v-if="optionalFields.length>0">
        <Divider orientation="left">Optional Filter</Divider>
        <FormItem label="Fields">
          <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
        </FormItem>
      </template>

      <MyScroll>
        <FormItem v-if="showCrawlerCrawlType" label="CrawlType" prop="crawlerCrawlType">
          <MySelect v-model="query.crawlerCrawlType" enum="CrawlType" width="100%" />
        </FormItem>

        <FormItem
          v-if="showCrawlerAutoDownloadPage"
          label="AutoDownloadPage"
          prop="crawlerAutoDownloadPage"
        >
          <MySelect
            v-model="query.crawlerAutoDownloadPage"
            enum="YesNo"
            width="100%"
          />
        </FormItem>

        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>

        <FormItem v-if="showCrawlerPageEncoding" label="Encoding" prop="crawlerPageEncoding">
          <Input v-model="query.crawlerPageEncoding" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showUrlMaxCacheCount" label="UrlMaxCacheCount" prop="urlMaxCacheCount">
          <Input v-model="query.urlMaxCacheCount" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showUrlEncodes" label="Encodes" prop="urlEncodes">
          <Input v-model="query.urlEncodes" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showUrlMatchPatterns" label="MatchPatterns" prop="urlMatchPatterns">
          <Input v-model="query.urlMatchPatterns" placeholder="Input value" />
        </FormItem>

        <FormItem
          v-if="showBloomExpectedUrlSize"
          label="ExpectedUrlSize"
          prop="bloomExpectedUrlSize"
        >
          <Input v-model="query.bloomExpectedUrlSize" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showBloomFpp" label="Fpp" prop="bloomFpp">
          <Input v-model="query.bloomFpp" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showTaskUrlBatchCount" label="UrlBatchCount" prop="taskUrlBatchCount">
          <Input v-model="query.taskUrlBatchCount" placeholder="Input value" />
        </FormItem>

        <FormItem
          v-if="showTaskMaxWaitToBindCount"
          label="MaxWaitToBindCount"
          prop="taskMaxWaitToBindCount"
        >
          <Input v-model="query.taskMaxWaitToBindCount" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showTaskMaxRunningCount" label="MaxRunningCount" prop="taskMaxRunningCount">
          <Input v-model="query.taskMaxRunningCount" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showTaskTimeout" label="Timeout" prop="taskTimeout">
          <Input v-model="query.taskTimeout" placeholder="Input value" />
        </FormItem>
          <FormItem v-if="showUrlMaxDepth" label="UrlMaxDepth" prop="urlMaxDepth">
          <Input v-model="query.urlMaxDepth" placeholder="Input value" />
        </FormItem>
         <FormItem v-if="showUrlMaxCrawlCount" label="UrlMaxCrawlCount" prop="urlMaxCrawlCount">
          <Input v-model="query.urlMaxCrawlCount" placeholder="Input value" />
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
    const validator= (rule,value,cb)=>{
      if(!value){
        cb(new Error("empty"));
        return;
      }

        cb();
    }
    return {
      optionalFields: [
        {
          label: "CrawlerCrawlType",
          value: "CrawlerCrawlType",
        },
        {
          label: "CrawlerAutoDownloadPage",
          value: "CrawlerAutoDownloadPage",
        },
        {
          label: "EnableStatus",
          value: "EnableStatus",
        },
        {
          label: "PageEncoding",
          value: "CrawlerPageEncoding",
        },
        {
          label: "MaxCacheCount",
          value: "UrlMaxCacheCount",
        },
          {
          label: "UrlMaxDepth",
          value: "UrlMaxDepth",
        },
        {
          label: "UrlMaxCrawlCount",
          value: "UrlMaxCrawlCount",
        },
        {
          label: "Encodes",
          value: "UrlEncodes",
        },
        {
          label: "MatchPatterns",
          value: "UrlMatchPatterns",
        },
        {
          label: "ExpectedUrlSize",
          value: "BloomExpectedUrlSize",
        },
        {
          label: "Fpp",
          value: "BloomFpp",
        },
        {
          label: "UrlBatchCount",
          value: "TaskUrlBatchCount",
        },
        {
          label: "MaxWaitToBindCount",
          value: "TaskMaxWaitToBindCount",
        },
        {
          label: "MaxRunningCount",
          value: "TaskMaxRunningCount",
        },
        {
          label: "Timeout",
          value: "TaskTimeout",
        },
      ],
      showingOptionalFields: [
        "CrawlerCrawlType",
        "TaskTimeout",
        "TaskMaxRunningCount",
        "BloomExpectedUrlSize",
        "UrlEncodes",
        "CrawlerAutoDownloadPage",
      ],
      rules: {
        siteId: [
          {
            validator,
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        downSystemId: [
          {
            validator,
            required: true,
            message: "field can not be empty",
            trigger: "blur",
          },
        ],
        priority: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        crawlerPageTimeout: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        urlMaxCacheCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        urlMaxCrawlCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        bloomExpectedUrlSize: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        bloomFpp: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskUrlBatchCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskMaxWaitToBindCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskMaxRunningCount: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskTimeout: [
          {
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
      },
      query: {
        siteId: null,
        downSystemId: null,
        crawlerCrawlType: null,
        crawlerAutoDownloadPage: null,
        enableStatus: null,
        crawlerPageEncoding: null,
        urlMaxDepth:null,
        urlMaxCrawlCount:null,
        urlMaxCacheCount: null,
        urlEncodes: null,
        urlMatchPatterns: null,
        bloomExpectedUrlSize: null,
        bloomFpp: null,
        taskUrlBatchCount: null,
        taskMaxWaitToBindCount: null,
        taskMaxRunningCount: null,
        taskTimeout: null,
        id: null,
      },
    };
  },
  created() {
    this.$utils.copyFieldsFrom(this.query, this.model);
  },

  computed: {
    
showUrlMaxDepth() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "UrlMaxDepth"
      );
    },
    showUrlMaxCrawlCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "UrlMaxCrawlCount"
      );
    },
    showCrawlerCrawlType() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "CrawlerCrawlType"
      );
    },

    showCrawlerAutoDownloadPage() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "CrawlerAutoDownloadPage"
      );
    },

    showEnableStatus() {
      return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
    },

    showCrawlerPageEncoding() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "CrawlerPageEncoding"
      );
    },

    showUrlMaxCacheCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "UrlMaxCacheCount"
      );
    },

    showUrlEncodes() {
      return this.$utils.arrayHas(this.showingOptionalFields, "UrlEncodes");
    },

    showUrlMatchPatterns() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "UrlMatchPatterns"
      );
    },

    showBloomExpectedUrlSize() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "BloomExpectedUrlSize"
      );
    },

    showBloomFpp() {
      return this.$utils.arrayHas(this.showingOptionalFields, "BloomFpp");
    },

    showTaskUrlBatchCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "TaskUrlBatchCount"
      );
    },

    showTaskMaxWaitToBindCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "TaskMaxWaitToBindCount"
      );
    },

    showTaskMaxRunningCount() {
      return this.$utils.arrayHas(
        this.showingOptionalFields,
        "TaskMaxRunningCount"
      );
    },

    showTaskTimeout() {
      return this.$utils.arrayHas(this.showingOptionalFields, "TaskTimeout");
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
            return this.$api.downSystemSite.add(this.query);
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