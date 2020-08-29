<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="100">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll height="180px">
        <FormItem v-if="showCrawlType" label="CrawlType" prop="crawlerCrawlType">
          <MySelect v-model="query.crawlerCrawlType" enum="CrawlType" width="100%" />
        </FormItem>
        <FormItem
          v-if="showAutoDownloadPage"
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
        <FormItem v-if="showPageEncoding" label="Encoding" prop="crawlerPageEncoding">
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
        <FormItem v-if="showTaskMaxCount" label="MaxWaitToBindCount" prop="taskMaxCount">
          <Input v-model="query.taskMaxCount" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showTaskMaxCon" label="MaxRunningCount" prop="taskMaxRunningCount">
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
        <FormItem v-if="showTaskUrlMaxFCnt" label="TaskUrlMaxFCnt" prop="taskUrlMaxFailCount">
          <Input v-model="query.taskUrlMaxFailCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showTaskUrlMaxCFlCnt"
          label="TaskUrlMaxCFlCnt"
          prop="taskUrlMaxContinuouslyFailCount"
        >
          <Input v-model="query.taskUrlMaxContinuouslyFailCount" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showTaskUrlMaxCon" label="TaskUrlMaxCon" prop="taskUrlMaxConcurrency">
          <Input v-model="query.taskUrlMaxConcurrency" placeholder="Input value" />
        </FormItem>
      </MyScroll>
    </Form>
  </MyModal>
</template>
<script>
import utils from "./../../../common";
export default {
  props: utils.editProps(),
  data() {
    return {
      optionalFields: utils.options([
        "CrawlType",
        "ScriptPath",
        "AutoDownloadPage",
        "EnableStatus",
        "PageEncoding",
        "UrlMaxCacheCount",
        "UrlEncodes",
        "UrlMatchPatterns",
        "TaskUrlBatchCount",
        "UrlMaxDepth",
        "UrlMaxCrawlCount",
        "TaskMaxCount",
        "TaskMaxCon",
        "TaskTimeout",
        "TaskBindTimeout",
        "TaskUrlMaxFCnt",
        "TaskUrlMaxCFlCnt",
        "TaskUrlMaxCon",
      ]),
      showingOptionalFields: [
        // "CrawlType",
        // "TaskTimeout",
        // "TaskMaxCon",
        // "UrlEncodes",
        // "AutoDownloadPage",
      ],
      rules: {
        priority: [utils.range(1, 10)],
        crawlerPageTimeout: [utils.range(3000, 600000)],
        urlMaxCacheCount: [utils.range(1000, 20000)],
        urlMaxCrawlCount: [utils.range(1, 20)],
        bloomExpectedUrlSize: [utils.require(), utils.range(3000, 20000000)],
        bloomFpp: [utils.require(), utils.range(0.2, 0.7)],
        taskUrlBatchCount: [utils.range(1, 1000)],
        taskMaxCount: [utils.range(1, 200)],
        taskMaxRunningCount: [utils.range(1, 1000)],
        taskTimeout: [utils.range(1, 120)],
        taskBindTimeout: [utils.range(1, 120)],
        urlEncodes: [utils.jsonArray()],
        urlMatchPatterns: [utils.jsonObject()],
        urlMaxDepth: [utils.range(1, 100)],
        taskUrlMaxFailCount: [utils.range(10, 500)],
        taskUrlMaxContinuouslyFailCount: [utils.range(1, 30)],
        taskUrlMaxConcurrency: [utils.range(1, 1000)],
      },
      api: "downSystemSite",
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
        taskMaxCount: null,
        taskMaxRunningCount: null,
        taskTimeout: null,
        taskBindTimeout: null,
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
      utils.edit.call(this);
    },
  },
};
</script>
