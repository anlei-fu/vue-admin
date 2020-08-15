<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="name" prop="name">
        <Input v-model="query.name" placeholder="Input value" />
      </FormItem>

      <FormItem label="Ip" prop="ip">
        <Input v-model="query.ip" placeholder="Input value" />
      </FormItem>

      <FormItem label="Port" prop="port">
        <Input v-model="query.port" placeholder="Input value" />
      </FormItem>
      <FormItem label="UniqueId" prop="uniqueId">
        <Input v-model="query.uniqueId" placeholder="Input value" />
      </FormItem>
      <FormItem label="ClientVersion" prop="clientVersion">
        <Input v-model="query.clientVersion" placeholder="Input value" />
      </FormItem>

      <template v-if="optionalFields.length > 0">
        <Divider orientation="left">Optional Filter</Divider>
        <FormItem label="Fields">
          <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
        </FormItem>
      </template>

      <MyScroll height="120px">
        <FormItem v-if="showCrawlerType" label="CrawlerType" prop="crawlerType">
          <MySelect v-model="query.crawlerType" enum="CrawlerType" width="100%" />
        </FormItem>

        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>

        <FormItem v-if="showKey" label="Key" prop="key">
          <Input v-model="query.key" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showMaxConcurrency" label="MaxConcurrency" prop="maxConcurrency">
          <Input v-model="query.maxConcurrency" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showDescription" label="Description" prop="description">
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
          "CrawlerType",
          "EnableStatus",
          "Key",
          "MaxConcurrency",
          "Description",
        ]),
        showingOptionalFields: ["CrawlerType", "MaxConcurrency"],
        rules: {
          name: [utils.require()],
          ip: [utils.require(), utils.ip()],
          port: [utils.require(), utils.port()],
          uniqueId: [utils.require()],
          clientVersion: [utils.require()],
          maxConcurrency: [utils.range(10, 2000)],
        },
        query: {
          crawlerType: null,
          enableStatus: null,
          clientVersion: null,
          name: null,
          ip: null,
          key: null,
          uniqueId: null,
          port: null,
          maxConcurrency: null,
          description: null,
        },
      };
    },
    created() {
      this.$utils.copyFieldsFrom(this.query, this.model);
    },

    computed: {
      showCrawlerType() {
        return this.$utils.arrayHas(this.showingOptionalFields, "CrawlerType");
      },

      showEnableStatus() {
        return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
      },

      showClientVersion() {
        return this.$utils.arrayHas(this.showingOptionalFields, "ClientVersion");
      },

      showKey() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Key");
      },

      showMaxConcurrency() {
        return this.$utils.arrayHas(this.showingOptionalFields, "MaxConcurrency");
      },

      showDescription() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Description");
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
              return this.$api.crawler.add(this.query);
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
