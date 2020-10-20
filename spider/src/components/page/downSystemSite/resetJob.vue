<template>
  <MyModal title="Balance" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="160">
         <FormItem label="FailedTimeout" prop="urlFailedRetryTimeout">
        <Input
          v-model="query.urlFailedRetryTimeout"
          placeholder="Input value"
        />
      </FormItem>
      <FormItem label="FailedRetry" prop="urlFailedRetryJobInterval">
        <Input
          v-model="query.urlFailedRetryJobInterval"
          placeholder="Input value"
        />
      </FormItem>
       <FormItem label="ResetTimeout" prop="urlResetTimeout">
        <Input v-model="query.urlResetTimeout" placeholder="Input value" />
      </FormItem>
      <FormItem label="Reset" prop="urlResetJobInterval">
        <Input v-model="query.urlResetJobInterval" placeholder="Input value" />
      </FormItem>
      <FormItem label="CacheTimeout" prop="urlCacheTimeout">
        <Input
          v-model="query.urlCacheTimeout"
          placeholder="Input value"
        />
      </FormItem>
      <FormItem label="CacheTimeoutJobInterval" prop="urlCacheTimeoutJobInterval">
        <Input
          v-model="query.urlCacheTimeoutJobInterval"
          placeholder="Input value"
        />
      </FormItem>
    </Form>
  </MyModal>
</template>
<script>
import utils from "./../../../common";
export default {
  data() {
    return {
      query: {
        downSystemSiteId: null,
        urlFailedRetryTimeout:null,
        urlFailedRetryJobInterval: null,
        urlResetTimeout:null,
        urlResetJobInterval: null,
        urlCacheTimeout:null,
        urlCacheTimeoutJobInterval: null,
      },
      rules: {
        urlFailedRetryTimeout: [utils.require(), utils.range(-1, 100000)],
        urlFailedRetryJobInterval: [utils.require(), utils.range(-1, 100000)],
        urlResetTimeout: [utils.require(), utils.range(-1, 100000)],
        urlResetJobInterval: [utils.require(), utils.range(-1, 1000000)],
        urlCacheTimeout: [utils.require(), utils.range(-1, 100000)],
        urlCacheTimeoutJobInterval: [utils.require(), utils.range(-1, 100000)],
      },
    };
  },
  methods: {
    show(row) {
      this.query.downSystemSiteId = row.id;
      utils.copyFieldsFrom(this.query,row);
      this.$refs.modal.show();
    },
    ok() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$utils.handleNormalRequest.call(this, async () => {
            let resp = await this.$api.downSystemSite.resetJob(this.query);
            if (resp && resp.code == 100) return resp;
          });
        }
      });
    },
  },
};
</script>
