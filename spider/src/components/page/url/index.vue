<template>
  <div>
    <Form ref="form" :model="query" :rules="rules" :label-width="90">
      <Row>
        <Col span="8">
          <FormItem label="Url" prop="url">
            <span class="form_span">
              <Input v-model="query.url" placeholder="Input value" width="200px" />
            </span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="ReferUrl" prop="referUrl">
            <span class="form_span">
              <Input v-model="query.referUrl" placeholder="Input value" width="200px" />
            </span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="HttpMethod" prop="url">
            <MySelect v-model="query.httpMethod" enum="HttpMethod" width="200px" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="Query" prop="query">
            <span class="form_span">
              <Input
                v-model="query.query"
                type="textarea"
                :autosize="true"
                placeholder="Require query string format"
              />
            </span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="Params" prop="params">
            <span class="form_span">
              <Input
                v-model="query.params"
                type="textarea"
                :autosize="true"
                placeholder="Require json format"
              />
            </span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem>
            <CreateButton @click="addSeedUrl" />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <MyScroll maxHeight="500px">
      <MyTable
        ref="table"
        filter
        border
        stripe
        columnFilter
        :columns="columns"
        :datas="data.list"
        @delete="_delete"
        :selectedColumns="showingColumns"
      />
    </MyScroll>
  </div>
</template>
<script>
import utils from "./../../../common";
export default {
  props: {
    downSystemSiteId: Number | String,
  },
  activated() {
    if (this.downSystemSiteId) this.getData();
  },
  data() {
    return {
      columns: [
        utils.column("url"),
        utils.column("referUrl"),
        utils.enumColumn("httpMethod"),
        utils.enumColumn("query"),
        utils.enumColumn("params"),
        utils.dateColumn("createTime", "CTime"),
        utils.operateColumn([utils.operation("delete")]),
      ],
      showingColumns: ["url", "createTime", "test"],
      query: {
        url: null,
        referUrl: null,
        httpMethod: 1,
        query: null,
        params: null,
        downSystemSiteId: null,
      },
      api: "url",
      rules: {
        url: [utils.require()],
        referUrl: [utils.url()],
        httpMethod: [],
        query: [],
        params: [utils.jsonObject()],
      },
      data: utils.data(),
    };
  },
  watch: {
    downSystemSiteId(newVal) {
      if (newVal) this.getData();
    },
  },
  methods: {
    addSeedUrl() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.query.downSystemSiteId = this.downSystemSiteId;
          this.$utils.handleNormalRequest.call(this, async () => {
            let resp = await this.$api.url.addSeedUrl(this.query);
            if (resp && resp.code == 100) this.getData();

            return resp;
          });
        }
      });
    },
    _delete(row) {
      utils.showDelete.call(this, row);
    },
    async getData() {
      try {
        let resp = await this.$api.url.getSeedUrlByDownSystemSiteId({
          downSystemSiteId: this.$utils.clone(this.downSystemSiteId),
        });
        if (resp.code != 100) {
          this.$Message.error("get Data failed");
        }
        this.data.list = resp.data;
      } catch (ex) {
               this.$Message.error("get Data failed");
      }
    },
  },
};
</script>
<style scoped>
.form_span {
  display: inline-block;
  width: 90%;
}
</style>