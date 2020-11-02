<template>
  <div>
    <Form ref="form" :model="query" :rules="rules" :label-width="150">
      <Row>
        <Col span="8">
          <FormItem label="Site" prop="targetDonwSystemSite">
            <MySelect v-model="site" enum="Site" width="200px" />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="TargetSIte" prop="targetDownSystemSiteId">
            <MySelect
              v-model="query.targetDownSystemSiteId"
              :options="downSystemSites"
              label="name"
              value="id"
              width="200px"
            />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="Pattern" prop="matchPattern">
            <span class="form_span">
              <Input v-model="query.matchPattern" placeholder="Input value" width="200px" />
            </span>
          </FormItem>
        </Col>
      
      </Row>
      <Row>
          <Col span="8">
          <FormItem label="Pattern" prop="order">
            <span class="form_span">
              <Input v-model="query.order" placeholder="Input value" width="100px" />
            </span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem>
            <CreateButton @click="addDownSystemSiteDispatch" />
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
       this.query.sourceDownSystemSiteId=this.downSystemSiteId;
    if (this.downSystemSiteId){ 
       
        this.getData();
    }
  },
  data() {
    return {
      columns: [
        utils.column("siteName"),
        utils.column("targetDownSystemSiteName"),
        utils.column("matchPattern"),
        utils.column("order"),
        utils.dateColumn("createTime", "CTime"),
        utils.operateColumn([utils.operation("delete")]),
      ],
      showingColumns: ["siteName", "targetDownSystemSiteName","matchPattern","order","createTime", "test"],
      query: {
        sourceDownSystemSiteId:null,
        targetDownSystemSiteId: null,
        pattern: null,
        order:null,
        downSystemSiteId:null,
      },
      site:[],
      downSystemSites:[],
      api: "downSystemSiteDispatch",
      rules: {
        targetDonwSystemSiteId: [utils.require()],
        matchPattern: [utils.require()],
        order:[utils.range(1,1000)]
      },
      data: utils.data(),
    };
  },
  watch: {
    downSystemSiteId(newVal) {
      if (newVal) this.getData();
    },
   async site(){
         if(!this.site)
            return;

        let resp = await this.$api.downSystemSite.getBySiteId({siteId:this.site});
        if(resp.code!=100){
           this.$Message.error(resp.message);
        }else{
            this.downSystemSites=resp.data;
        }
    }
  },
  methods: {
    addDownSystemSiteDispatch() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.query.sourceDownSystemSiteId = this.downSystemSiteId;
          this.$utils.handleNormalRequest.call(this, async () => {
            let resp = await this.$api.downSystemSiteDispatch.add(this.query);
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
        let resp = await this.$api.downSystemSiteDispatch.getBySourceDownSystemSiteId({
          sourceDownSystemSiteId: this.$utils.clone(this.downSystemSiteId),
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

}
</style>