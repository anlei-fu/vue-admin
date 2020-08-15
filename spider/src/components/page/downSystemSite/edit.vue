<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
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
        <FormItem v-if="showScriptPath" label="Script" prop="scriptPath">
          <MyFileUploader v-model="query.scriptPath" />
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
        <FormItem
          v-if="showTaskUrlMaxFailCount"
          label="TaskUrlMaxFailCount"
          prop="taskUrlMaxFailCount"
        >
          <Input v-model="query.taskUrlMaxFailCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showTaskUrlMaxContinuouslyFailCount"
          label="TaskUrlMaxContinuouslyFailCount"
          prop="taskUrlMaxContinuouslyFailCount"
        >
          <Input v-model="query.taskUrlMaxContinuouslyFailCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showTaskUrlMaxConcurrency"
          label="TaskUrlMaxConcurrency"
          prop="taskUrlMaxConcurrency"
        >
          <Input v-model="query.taskUrlMaxConcurrency" placeholder="Input value" />
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
          "CrawlerCrawlType",
          "ScriptPath",
          "CrawlerAutoDownloadPage",
          "EnableStatus",
          "CrawlerPageEncoding",
          "UrlMaxCacheCount",
          "UrlEncodes",
          "UrlMatchPatterns",
          "TaskUrlBatchCount",
          "UrlMaxDepth",
          "UrlMaxCrawlCount",
          "TaskMaxWaitToBindCount",
          "TaskMaxRunningCount",
          "TaskTimeout",
          "TaskUrlMaxFailCount",
          "TaskUrlMaxContinuouslyFailCount",
          "TaskUrlMaxConcurrency",
        ]),
        showingOptionalFields: [
          "CrawlerCrawlType",
          "TaskTimeout",
          "TaskMaxRunningCount",
          "UrlEncodes",
          "CrawlerAutoDownloadPage",
        ],
        rules: {
          priority: [utils.range(1, 10)],
          crawlerPageTimeout: [utils.range(3000, 600000)],
          urlMaxCacheCount: [utils.range(1000, 20000)],
          urlMaxCrawlCount: [utils.range(1, 20)],
          bloomExpectedUrlSize: [utils.range(3000, 20000000)],
          bloomFpp: [utils.range(0.2, 0.7)],
          taskUrlBatchCount: [utils.range(1, 1000)],
          taskMaxWaitToBindCount: [utils.range(1, 20)],
          taskMaxRunningCount: [utils.range(1, 1000)],
          taskTimeout: [utils.range(1, 120)],
          urlMaxDepth: [utils.range(1, 100)],
          taskUrlMaxFailCount: [utils.range(10, 500)],
          taskUrlMaxContinuouslyFailCount: [utils.range(1, 30)],
          taskUrlMaxConcurrency: [utils.range(1, 1000)],
        },
        query: {
          id: null,
          scriptPath: null,
          siteId: null,
          downSystemId: null,
          crawlerCrawlType: null,
          crawlerAutoDownloadPage: null,
          enableStatus: null,
          crawlerPageEncoding: null,
          urlMaxCacheCount: null,
          urlEncodes: null,
          urlMatchPatterns: null,
          urlMaxDepth: null,
          urlMaxCrawlCount: null,
          taskUrlBatchCount: null,
          taskMaxWaitToBindCount: null,
          taskMaxRunningCount: null,
          taskTimeout: null,
          taskUrlMaxFailCount: null,
          taskUrlMaxContinuouslyFailCount: null,
          taskUrlMaxConcurrency: null,
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
        return this.$utils.arrayHas(this.showingOptionalFields, "UrlMaxDepth");
      },
      showScriptPath() {
        return this.$utils.arrayHas(this.showingOptionalFields, "ScriptPath");
      },
      showUrlMaxCrawlCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "UrlMaxCrawlCount");
      },
      showCrawlerCrawlType() {
        return this.$utils.arrayHas(this.showingOptionalFields, "CrawlerCrawlType");
      },

      showCrawlerAutoDownloadPage() {
        return this.$utils.arrayHas(this.showingOptionalFields, "CrawlerAutoDownloadPage");
      },

      showEnableStatus() {
        return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
      },

      showCrawlerPageEncoding() {
        return this.$utils.arrayHas(this.showingOptionalFields, "CrawlerPageEncoding");
      },

      showUrlMaxCacheCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "UrlMaxCacheCount");
      },

      showUrlEncodes() {
        return this.$utils.arrayHas(this.showingOptionalFields, "UrlEncodes");
      },

      showUrlMatchPatterns() {
        return this.$utils.arrayHas(this.showingOptionalFields, "UrlMatchPatterns");
      },

      showBloomExpectedUrlSize() {
        return this.$utils.arrayHas(this.showingOptionalFields, "BloomExpectedUrlSize");
      },

      showBloomFpp() {
        return this.$utils.arrayHas(this.showingOptionalFields, "BloomFpp");
      },

      showTaskUrlBatchCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskUrlBatchCount");
      },

      showTaskMaxWaitToBindCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskMaxWaitToBindCount");
      },

      showTaskMaxRunningCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskMaxRunningCount");
      },

      showTaskTimeout() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskTimeout");
      },
      showTaskUrlMaxFailCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskUrlMaxFailCount");
      },
      showTaskUrlMaxContinuouslyFailCount() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskUrlMaxContinuouslyFailCount");
      },
      showTaskUrlMaxConcurrency() {
        return this.$utils.arrayHas(this.showingOptionalFields, "TaskUrlMaxConcurrency");
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
