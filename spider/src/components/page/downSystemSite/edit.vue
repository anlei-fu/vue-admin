<template>
  <MyModal title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>

      <MyScroll>
        <FormItem v-if="showCrawlerCrawlType" label="CrawlType" prop="crawlerCrawlType">
          <MySelect v-model="query.crawlerCrawlType" enum="CrawlType" width="100%" />
        </FormItem>

        <FormItem
          v-if="showCrawlerAutoDownloadPage"
          label="AutoDownloadPage"
          prop="crawlerAutoDownloadPage"
        >
          <MySelect v-model="query.crawlerAutoDownloadPage" enum="YesNo" width="100%" />
        </FormItem>

        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>

        <FormItem v-if="showCrawlerPageEncoding" label="Encoding" prop="crawlerPageEncoding">
          <Input v-model="query.crawlerPageEncoding" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showUrlMaxCacheCount" label="MaxCacheCount" prop="urlMaxCacheCount">
          <Input v-model="query.urlMaxCacheCount" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showUrlEncodes" label="Encodes" prop="urlEncodes">
          <Input v-model="query.urlEncodes" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showUrlMatchPatterns" label="MatchPatterns" prop="urlMatchPatterns">
          <Input v-model="query.urlMatchPatterns" placeholder="Input value" />
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
     const rangeValidator= (rule,value,cb)=>{
      if(value>=rule.max){
        cb(new Error("over max value"));
        return;
      }

      if(value<rule.min){
        cb(new Error("less than min value"));
        return;
      }


        cb();
    }
    return {
      optionalFields: [
        {
          label: "CrawlType",
          value: "CrawlerCrawlType",
        },
        {
          label: "AutoDownloadPage",
          value: "CrawlerAutoDownloadPage",
        },
        {
          label: "Status",
          value: "EnableStatus",
        },
        {
          label: "Encoding",
          value: "CrawlerPageEncoding",
        },
        {
          label: "MaxCacheCount",
          value: "UrlMaxCacheCount",
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
          label: "UrlBatchCount",
          value: "TaskUrlBatchCount",
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
        "UrlEncodes",
        "CrawlerAutoDownloadPage",
      ],
      rules: {
        priority: [
          {
            validator:rangeValidator,
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        crawlerPageTimeout: [
          {
             validator:rangeValidator,
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        urlMaxCacheCount: [
          {
             validator:rangeValidator,
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        urlMaxCrawlCount: [
          {
             validator:rangeValidator,
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
       
        taskUrlBatchCount: [
          {
             validator:rangeValidator,
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskMaxWaitToBindCount: [
          {
             validator:rangeValidator,
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskMaxRunningCount: [
          {
             validator:rangeValidator,
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
        taskTimeout: [
          {
             validator:rangeValidator,
            min: 0,
            max: 10,
            message: "out of range 0-10 ",
            trigger: "blur",
          },
        ],
      },
      query: {
        id: null,
        siteId: null,
        downSystemId: null,
        crawlerCrawlType: null,
        crawlerAutoDownloadPage: null,
        enableStatus: null,
        crawlerPageEncoding: null,
        urlMaxCacheCount: null,
        urlEncodes: null,
        urlMatchPatterns: null,
        urlMaxDepth:null,
        urlMaxCrawlCount:null,
        taskUrlBatchCount: null,
        taskMaxWaitToBindCount: null,
        taskMaxRunningCount: null,
        taskTimeout: null,
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
            let resp = await this.$api.downSystemSite.updateById(this.query);
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