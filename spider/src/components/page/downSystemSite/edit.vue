<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="100">
           <div class="form-container" style="max-height:500px;overflow-y: scroll;">
        <FormItem  label="Name" prop="name">
          <Input v-model="query.name" placeholder="Input value" />
        </FormItem>
        <FormItem  label="Desc" prop="description">
          <Input v-model="query.description" placeholder="Input value" />
        </FormItem>
        <FormItem
          label="Type"
          prop="downSystemSiteType"
        >
          <MySelect
            v-model="query.downSystemSiteType"
            enum="DownSystemSiteType"
            width="100%"
          />
        </FormItem>
        <FormItem
          label="CrawlType"
          prop="crawlerCrawlType"
        >
          <MySelect
            v-model="query.crawlerCrawlType"
            enum="CrawlType"
            width="100%"
          />
        </FormItem>
        <FormItem
          label="AutoDownloadPage"
          prop="crawlerAutoDownloadPage"
        >
          <MySelect
            v-model="query.crawlerAutoDownloadPage"
            enum="YesNo"
            width="100%"
          />
        </FormItem>
        <FormItem
          label="EnableStatus"
          prop="enableStatus"
        >
          <MySelect
            v-model="query.enableStatus"
            enum="EnableStatus"
            width="100%"
          />
        </FormItem>
        <FormItem  label="Script" prop="scriptPath">
          <MyFileUploader v-model="query.scriptPath" />
        </FormItem>
        <FormItem
          label="Encoding"
          prop="crawlerPageEncoding"
        >
          <Input
            v-model="query.crawlerPageEncoding"
            placeholder="Input value"
          />
        </FormItem>
        <FormItem
          label="MaxCacheCount"
          prop="urlMaxCacheCount"
        >
          <Input v-model="query.urlMaxCacheCount" placeholder="Input value" />
        </FormItem>
        <FormItem label="Encodes" prop="urlEncodes">
          <Input v-model="query.urlEncodes" placeholder="Input value" />
        </FormItem>
        <FormItem
          label="MatchPatterns"
          prop="urlMatchPatterns"
        >
          <Input v-model="query.urlMatchPatterns" placeholder="Input value" />
        </FormItem>
        <FormItem
          label="UrlBatchCount"
          prop="taskUrlBatchCount"
        >
          <Input v-model="query.taskUrlBatchCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          label="MaxWaitToBindCount"
          prop="taskMaxCount"
        >
          <Input v-model="query.taskMaxCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          label="MaxRunningCount"
          prop="taskMaxRunningCount"
        >
          <Input
            v-model="query.taskMaxRunningCount"
            placeholder="Input value"
          />
        </FormItem>
        <FormItem label="Timeout" prop="taskTimeout">
          <Input v-model="query.taskTimeout" placeholder="Input value" />
        </FormItem>
        <FormItem
          label="BdTmt"
          prop="taskBindTimeout"
        >
          <Input v-model="query.taskBindTimeout" placeholder="Input value" />
        </FormItem>
        <FormItem label="UrlMaxDepth" prop="urlMaxDepth">
          <Input v-model="query.urlMaxDepth" placeholder="Input value" />
        </FormItem>
        <FormItem
          label="UrlMaxCrawlCount"
          prop="urlMaxCrawlCount"
        >
          <Input v-model="query.urlMaxCrawlCount" placeholder="Input value" />
        </FormItem>
        <FormItem
          label="TaskUrlMaxFCnt"
          prop="taskUrlMaxFailCount"
        >
          <Input
            v-model="query.taskUrlMaxFailCount"
            placeholder="Input value"
          />
        </FormItem>
        <FormItem
          label="TaskUrlMaxCFlCnt"
          prop="taskUrlMaxContinuouslyFailCount"
        >
          <Input
            v-model="query.taskUrlMaxContinuouslyFailCount"
            placeholder="Input value"
          />
        </FormItem>
        <FormItem
          label="TaskUrlMaxCon"
          prop="taskUrlMaxConcurrency"
        >
          <Input
            v-model="query.taskUrlMaxConcurrency"
            placeholder="Input value"
          />
        </FormItem>
        <FormItem
          label="MaxDays"
          prop="runLimitMaxDays"
        >
          <Input v-model="query.runLimitMaxDays" placeholder="Input value" />
        </FormItem>
        <FormItem
          label="MaxHours"
          prop="runLimitMaxHours"
        >
          <Input v-model="query.runLimitMaxHours" placeholder="Input value" />
        </FormItem>
        <FormItem
          label="AutoBalance"
          prop="runLimitAllowAutoBalance"
        >
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
  props: utils.editProps(),
  data() {
    return {
      rules: {
        priority: [utils.range(1, 10)],
        crawlerPageTimeout: [utils.range(500, 100000)],
        urlMaxCacheCount: [utils.range(300, 1000)],
        urlMaxCrawlCount: [utils.range(1, 20)],
        bloomExpectedUrlSize: [utils.require(), utils.range(3000, 20000000)],
        bloomFpp: [utils.require(), utils.range(0.2, 0.7)],
        taskUrlBatchCount: [utils.range(1, 1000)],
        taskMaxCount: [utils.range(1, 500)],
        taskMaxRunningCount: [utils.range(1, 1000)],
        taskTimeout: [utils.range(1, 120)],
        taskBindTimeout: [utils.range(1, 120)],
        urlEncodes: [utils.jsonObject()],
        urlMatchPatterns: [utils.jsonArray()],
        urlMaxDepth: [utils.range(1, 100)],
        taskUrlMaxFailCount: [utils.range(10, 500)],
        taskUrlMaxContinuouslyFailCount: [utils.range(1, 3000)],
        taskUrlMaxConcurrency: [utils.range(1, 10000)],
        runLimitMaxDays: [utils.range(0, 7)],
        runLimitMaxHours: [utils.range(0, 24)],
      },
      api: "downSystemSite",
      query: {
        id: null,
        scriptPath: null,
        name: null,
        downSystemSiteType: null,
        description: null,
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
      utils.edit.call(this);
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
