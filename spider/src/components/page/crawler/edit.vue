<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="100">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>

      <MyScroll>
        <FormItem v-if="showName" label="Name" prop="name">
          <Input v-model="query.name" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showIp" label="Ip" prop="ip">
          <Input v-model="query.ip" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showPort" label="Port" prop="port">
          <Input v-model="query.port" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showCrawlerType" label="CrawlerType" prop="crawlerType">
          <MySelect v-model="query.crawlerType" enum="CrawlerType" width="100%" />
        </FormItem>

        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>

        <FormItem v-if="showClientVersion" label="ClientVersion" prop="clientVersion">
          <Input v-model="query.clientVersion" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showKey" label="Key" prop="key">
          <Input v-model="query.key" placeholder="Input value" />
        </FormItem>

        <FormItem v-if="showUniqueId" label="UniqueId" prop="uniqueId">
          <Input v-model="query.uniqueId" placeholder="Input value" />
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
          "Name",
          "Ip",
          "Port",
          "CrawlerType",
          "EnableStatus",
          "ClientVersion",
          "Key",
          "UniqueId",
          "MaxConcurrency",
          "Description",
        ]),
        showingOptionalFields: ["CrawlerType", "MaxConcurrency"],
        rules: {
          port: [utils.port()],
          maxConcurrency: [utils.range(10, 2000)],
          ip: [utils.ip()],
        },
        query: {
          id: null,
          name: null,
          ip: null,
          port: null,
          crawlerType: null,
          enableStatus: null,
          clientVersion: null,
          name: null,
          key: null,
          uniqueId: null,
          maxConcurrency: null,
          description: null,
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
      showName() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Name");
      },
      showIp() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Ip");
      },

      showPort() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Port");
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

      showKey() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Key");
      },

      showUniqueId() {
        return this.$utils.arrayHas(this.showingOptionalFields, "UniqueId");
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
        debugger;
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$utils.handleNormalRequest.call(this, async () => {
              debugger;
              let resp = await this.$api.crawler.updateById(this.query);
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
