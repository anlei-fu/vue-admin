<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="45%">
    <Form ref="form"  :model="query" :rules="rules" :label-width="150">
      <div class="form-container" style="max-height:500px;overflow-y: scroll;">
      <FormItem label="DownSystem" prop="downSystemId">
        <MySelect v-model="query.downSystemId" enum="System" width="100%" />
      </FormItem>
      <FormItem label="Site" prop="siteId">
        <MySelect v-model="query.siteId" enum="Site" width="100%" />
      </FormItem>
      <FormItem label="Name" prop="name">
        <Input v-model="query.name" placeholder="Input value" />
      </FormItem>
      <FormItem label="Type" prop="downSystemSiteType">
        <MySelect
          v-model="query.downSystemSiteType"
          enum="DownSystemSiteType"
          width="100%"
        />
      </FormItem>
      <FormItem label="Desc" prop="description">
        <Input v-model="query.description" placeholder="Input value" />
      </FormItem>
      <FormItem label="ExpectedUrlSize" prop="bloomExpectedUrlSize">
        <Input v-model="query.bloomExpectedUrlSize" placeholder="Input value" />
      </FormItem>
      <FormItem label="Fpp" prop="bloomFpp">
        <Input v-model="query.bloomFpp" placeholder="Input value" />
      </FormItem>

      <FormItem label="CrawlType" prop="crawlerCrawlType">
        <MySelect
          v-model="query.crawlerCrawlType"
          enum="CrawlType"
          width="100%"
        />
      </FormItem>
      <FormItem label="AutoDownloadPage" prop="crawlerAutoDownloadPage">
        <MySelect
          v-model="query.crawlerAutoDownloadPage"
          enum="YesNo"
          width="100%"
        />
      </FormItem>
      <FormItem label="EnableStatus" prop="enableStatus">
        <MySelect
          v-model="query.enableStatus"
          enum="EnableStatus"
          width="100%"
        />
      </FormItem>
      <FormItem label="Script" prop="scriptPath">
        <MyFileUploader v-model="query.scriptPath" />
      </FormItem>
      <FormItem label="Encoding" prop="crawlerPageEncoding">
        <Input v-model="query.crawlerPageEncoding" placeholder="Input value" />
      </FormItem>
      <FormItem label="UrlMxCchCnt" prop="urlMaxCacheCount">
        <Input v-model="query.urlMaxCacheCount" placeholder="Input value" />
      </FormItem>
      <FormItem label="Encodes" prop="urlEncodes">
        <Input v-model="query.urlEncodes" placeholder="Input value" />
      </FormItem>
      <FormItem label="MtchPttns" prop="urlMatchPatterns">
        <Input v-model="query.urlMatchPatterns" placeholder="Input value" />
      </FormItem>

      <FormItem label="UrlBtchCnt" prop="taskUrlBatchCount">
        <Input v-model="query.taskUrlBatchCount" placeholder="Input value" />
      </FormItem>
      <FormItem label="TskMxCnt" prop="taskMaxCount">
        <Input v-model="query.taskMaxCount" placeholder="Input value" />
      </FormItem>
      <FormItem label="TskMxRunCnt" prop="taskMaxRunningCount">
        <Input v-model="query.taskMaxRunningCount" placeholder="Input value" />
      </FormItem>
      <FormItem label="Timeout" prop="taskTimeout">
        <Input v-model="query.taskTimeout" placeholder="Input value" />
      </FormItem>
      <FormItem label="BdTmt" prop="taskBindTimeout">
        <Input v-model="query.taskBindTimeout" placeholder="Input value" />
      </FormItem>
      <FormItem label="UrlMaxDepth" prop="urlMaxDepth">
        <Input v-model="query.urlMaxDepth" placeholder="Input value" />
      </FormItem>
      <FormItem label="UrlMxCrwlCnt" prop="urlMaxCrawlCount">
        <Input v-model="query.urlMaxCrawlCount" placeholder="Input value" />
      </FormItem>
      <FormItem label="TaskUrlMaxFailCount" prop="taskUrlMaxFailCount">
        <Input v-model="query.taskUrlMaxFailCount" placeholder="Input value" />
      </FormItem>
      <FormItem
        label="TskUrlMxCntnslyFail"
        prop="taskUrlMaxContinuouslyFailCount"
      >
        <Input
          v-model="query.taskUrlMaxContinuouslyFailCount"
          placeholder="Input value"
        />
      </FormItem>
      <FormItem label="TskUrlMxCon" prop="taskUrlMaxConcurrency">
        <Input
          v-model="query.taskUrlMaxConcurrency"
          placeholder="Input value"
        />
      </FormItem>
      <FormItem label="RnlmtMxDays" prop="runLimitMaxDays">
        <Input v-model="query.runLimitMaxDays" placeholder="Input value" />
      </FormItem>
      <FormItem label="RnlmtMxHour" prop="runLimitMaxHours">
        <Input v-model="query.runLimitMaxHours" placeholder="Input value" />
      </FormItem>
      <FormItem label="AutoBlnce" prop="runLimitAllowAutoBalance">
        <MySelect
          v-model="query.runLimitAllowAutoBalance"
          enum="YesNo"
          width="100%"
        />
      </FormItem>
      </div>
    </Form>
  </MyModal>
</template>
<script>
import utils from "./../../../common";
export default {
  props: utils.addProps(),
  data() {
    return {
      rules: {
        siteId: [utils.require()],
        downSystemId: [utils.require()],
        name: [utils.require()],
        downSystemSiteType: [utils.require()],
        priority: [utils.range(1, 10)],
        crawlerPageTimeout: [utils.range(3000, 600000)],
        urlMaxCacheCount: [utils.range(1000, 20000)],
        urlMaxCrawlCount: [utils.range(1, 20)],
        bloomExpectedUrlSize: [utils.range(3000, 2000000000), utils.require()],
        bloomFpp: [utils.range(0.2, 0.7), utils.require()],
        taskUrlBatchCount: [utils.range(1, 1000)],
        taskMaxCount: [utils.range(1, 20)],
        taskMaxRunningCount: [utils.range(1, 1000)],
        taskTimeout: [utils.range(1, 120)],
        taskBindTimeout: [utils.range(1, 240)],
        urlMaxDepth: [utils.range(1, 100)],
        urlEncodes: [utils.jsonObject()],
        urlMatchPatterns: [utils.jsonArray()],
        taskUrlMaxFailCount: [utils.range(10, 500)],
        taskUrlMaxContinuouslyFailCount: [utils.range(1, 30)],
        taskUrlMaxConcurrency: [utils.range(1, 1000)],
        runLimitMaxDays: [utils.range(0, 7)],
        runLimitMaxHours: [utils.range(0, 24)],
      },
      api: "downSystemSite",
      query: {
        siteId: null,
        scriptPath: null,
        downSystemId: null,
        name: null,
        downSystemSiteType: null,
        description: null,
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
        taskBindTimeout: null,
        taskTimeout: null,
        taskUrlMaxFailCount: null,
        taskUrlMaxContinuouslyFailCount: null,
        taskUrlMaxConcurrency: null,
        runLimitMaxDays: null,
        runLimitMaxHours: null,
        runLimitAllowAutoBalance: null,
      },
    };
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
<style scoped>
.form-container{
    display: flex;
    flex-wrap: wrap;
}
.form-container >div{
    display: inline-block;
    width: 47%;
}
</style>