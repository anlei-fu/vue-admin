<template>
  <div>
    <Form ref="form" :v-model="query" :rule="rule" :label-width="90">
      <Row>
        <Col span="8">
          <FormItem label="HttpStatus" prop="httpStatus">
            <MySelect v-model="query.httpStatus" enum="HttpStatus" width="200px" />
          </FormItem>
        </Col>
       
          <Col span="8">
           <Col span="8">
          <FormItem label="PageResult" prop="pageResult">
            <MySelect v-model="query.pageResult" enum="PageResult" width="200px" />
          </FormItem>
       
        </Col>
        </Col>
         <Col span="8">
            <FormItem label="CompareType" prop="compareType">
            <MySelect v-model="query.compareType" enum="CompareType" width="200px" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
       <FormItem label="Keywords" prop="keywords">
            <span class="form_span">
              <Input
                v-model="query.keywords"
                type="textarea"
                :autosize="true"
                placeholder="Require json array format"
              />
            </span>
          </FormItem>
          </Col>
        <Col span="8">
          <FormItem>
            <CreateButton @click="addRule" />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <MyScroll maxHeight="500px">
      <MyTable ref="table" filter border stripe columnFilter :columns="columns" @delete="_delete" :datas="data.list" />
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
        utils.enumColumn("httpStatus"),
        utils.enumColumn("pageResult"),
        utils.enumColumn("compareType"),
        utils.column("keywords"),
        utils.dateColumn("createTime", "CTime"),
       utils.operateColumn([utils.operation("delete")]),
      ],
      api:"blockRule",
      showingColumns:["httpStatus","pageResult","compareType","keywords","test"],
      query:{
         downSystemSiteId:null,
         httpStatus:null,
         compareType:null,
         keywords:null
      },
      rule:{
             httpStatus:[utils.require()],
             pageResult:[utils.require()],
             compareType:[utils.require()],
             keywords:[utils.keywords]
      },
      data: utils.data(),
    };
  },
  watch: {
    downSystemSiteId() {
      this.getData();
    },
  },
  methods: {
    addRule() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.query.downSystemSiteId = this.downSystemSiteId;
          this.$utils.handleNormalRequest.call(this, async () => {
            let resp = await this.$api.blockRule.add(this.query);
            if (resp && resp.code == 100) this.getData();

            return resp;
          });
        }
      });
    },
     _delete(row) {
           utils.showDelete.call(this,row);
    },
    async getData() {
      try {
        let resp = await this.$api.blockRule.getByDownSystemSiteId({
          downSystemSiteId: this.$utils.clone(this.downSystemSiteId),
        });
        if (resp.code != 100) {
          this.$Message.error("get Data failed");
        }
        this.data.list = resp.data;
      } catch (ex) {}
    },
  },
};
</script>
