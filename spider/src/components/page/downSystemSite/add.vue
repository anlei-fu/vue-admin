<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
        <FormItem label="DownSystem" prop="downSystemId">
        <MySelect v-model="query.downSystemId" enum="System" width="100%" />
      </FormItem>
      <FormItem label="Site" prop="siteId">
        <MySelect v-model="query.siteId" enum="Site" width="100%" />
      </FormItem>
      <FormItem
          label="ExpectedUrlSize"
          prop="bloomExpectedUrlSize"
        >
          <Input v-model="query.bloomExpectedUrlSize" placeholder="Input value" />
        </FormItem>
        <FormItem label="Fpp" prop="bloomFpp">
          <Input v-model="query.bloomFpp" placeholder="Input value" />
        </FormItem>
    
      <template v-if="optionalFields.length > 0">
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
        <FormItem v-if="showUrlMaxCacheCount" label="UrlMaxCacheCount" prop="urlMaxCacheCount">
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
          v-if="showTaskMaxCount"
          label="MaxWaitToBindCount"
          prop="taskMaxCount"
        >
          <Input v-model="query.taskMaxCount" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showTaskMaxRunningCount" label="MaxRunningCount" prop="taskMaxRunningCount">
          <Input v-model="query.taskMaxRunningCount" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showTaskTimeout" label="Timeout" prop="taskTimeout">
          <Input v-model="query.taskTimeout" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showTaskBindTimeout" label="BdTmt" prop="taskBindTimeout">
          <Input v-model="query.taskBindTimeout" placeholder="Input value" />
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
    props: utils.addProps(),
    data() {
      return {
        optionalFields: utils.options([
          "CrawlerCrawlType",
          "ScriptPath",
          "CrawlerAutoDownloadPage",
          "EnableStatus",
          "CrawlerPageEncoding",
          "UrlMaxCacheCount",
          "UrlMaxDepth",
          "UrlMaxCrawlCount",
          "UrlEncodes",
          "UrlMatchPatterns",
          "TaskUrlBatchCount",
          "TaskMaxCount",
          "TaskMaxRunningCount",
          "TaskTimeout",
          "TaskBindTimeout",
          "TaskUrlMaxFailCount",
          "TaskUrlMaxContinuouslyFailCount",
          "TaskUrlMaxConcurrency",
        ]),
        showingOptionalFields: [
          // "CrawlerCrawlType",
          // "TaskTimeout",
          // "TaskMaxRunningCount",
          // "BloomExpectedUrlSize",
          // "UrlEncodes",
          // "CrawlerAutoDownloadPage",
        ],
        rules: {
          siteId: [utils.require()],
          downSystemId: [utils.require()],
          priority: [utils.range(1, 10)],
          crawlerPageTimeout: [utils.range(3000, 600000)],
          urlMaxCacheCount: [utils.range(1000, 20000)],
          urlMaxCrawlCount: [utils.range(1, 20)],
          bloomExpectedUrlSize: [utils.range(3000, 2000000000),utils.require()],
          bloomFpp: [utils.range(0.2, 0.7),utils.require()],
          taskUrlBatchCount: [utils.range(1, 1000)],
          taskMaxCount: [utils.range(1, 20)],
          taskMaxRunningCount: [utils.range(1, 1000)],
          taskTimeout: [utils.range(1, 120)],
          taskBindTimeout: [utils.range(1, 240)],
          urlMaxDepth: [utils.range(1, 100)],
          urlEncodes:[utils.jsonArray()],
          urlMatchPatterns:[utils.jsonObject()],
          taskUrlMaxFailCount: [utils.range(10, 500)],
          taskUrlMaxContinuouslyFailCount: [utils.range(1, 30)],
          taskUrlMaxConcurrency: [utils.range(1, 1000)],
        },
        api: "downSystemSite",
        query: {
          siteId: null,
          scriptPath: null,
          downSystemId: null,
          crawlerCrawlType: null,
          crawlerAutoDownloadPage: null,
          enableStatus: null,
          crawlerPageEncoding: null,
          urlMaxDepth: null,
          urlMaxCrawlCount: null,
          urlMaxCacheCount: null,
          urlEncodes: null,
          urlMatchPatterns: null,
          bloomExpectedUrlSize: null,
          bloomFpp: null,
          taskUrlBatchCount: null,
          taskMaxCount: null,
          taskMaxRunningCount: null,
          taskBindTimeout:null,
          taskTimeout: null,
          taskUrlMaxFailCount: null,
          taskUrlMaxContinuouslyFailCount: null,
          taskUrlMaxConcurrency: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsFieldsShows.call(this);
      utils.copyFieldsFrom(this.query, this.model);
    },
    watch: {
      model(newVal) {
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
