<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="35%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll height="200px">
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
    props: {
      ids: {
        type: Array,
        default: () => [],
      },
      title: {
        type: String,
        default: "title",
      },
    },

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
        showingOptionalFields: ["MaxConcurrency", "EnableStatus"],
        rules: {
          ip: [utils.ip()],
          maxConcurrency: [utils.range(10, 2000)],
        },
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
    computed: {
      showIp() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Ip");
      },

      showCrawlerType() {
        return this.$utils.arrayHas(this.showingOptionalFields, "CrawlerType");
      },

      showEnableStatus() {
        return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
      },

      showClientVersion() {
        return this.$utils.arrayHas(this.showingOptionalFields, "ClientVersion");
      },
      showMaxConcurrency() {
        return this.$utils.arrayHas(this.showingOptionalFields, "MaxConcurrency");
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
        this.query.ids = this.ids;
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$utils.handleNormalRequest.call(this, async () => {
              let resp = await this.$api.crawler.updateBatch(this.query);
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
