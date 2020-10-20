<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="35%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll height="180px">
        <FormItem v-if="showCrawlerType" label="CrawlerType" prop="crawlerType">
          <MySelect v-model="query.crawlerType" enum="CrawlerType" width="100%" />
        </FormItem>
        <FormItem v-if="showIp" label="Ip" prop="ip">
          <Input v-model="query.OPe" width="100%" />
        </FormItem>
        <FormItem v-if="showEnableStatus" label="enableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>
        <FormItem v-if="showClientVersion" label="clientVersion" prop="clientVersion">
          <Input v-model="query.clientVersion" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showMaxConcurrency" label="maxConcurrency" prop="maxConcurrency">
          <Input v-model="query.maxConcurrency" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showDescription" label="description" prop="description">
          <Input v-model="query.description" placeholder="Input value" />
        </FormItem>
      </MyScroll>
    </Form>
  </MyModal>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: utils.batchEditProps(),
    data() {
      return {
        optionalFields: utils.options([
          "CrawlerType",
          "EnableStatus",
          "ClientVersion",
          "Ip",
          "MaxConcurrency",
          "Description",
        ]),
        showingOptionalFields: [],
        rules: {
          ip: [utils.ip()],
          maxConcurrency: [utils.range(10, 2000)],
        },
        api: "crawler",
        query: {
          crawlerType: null,
          enableStatus: null,
          clientVersion: null,
          ip: null,
          maxConcurrency: null,
          description: null,
          ids: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsFieldsShows.call(this);
    },
    watch: {
      showingOptionalFields(newVal) {
        utils.changeShowingOptionalFields.call(this, newVal);
      },
    },
    methods: {
      show() {
        this.$utils.resetQuery(this.query);
        this.$refs.modal.show();
      },
      close() {
        this.$refs.modal.close();
      },
      ok() {
        utils.batchEdit.call(this);
      },
    },
  };
</script>
