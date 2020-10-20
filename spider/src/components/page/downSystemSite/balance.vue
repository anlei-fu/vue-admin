<template>
  <MyModal title="Balance" ref="modal" @ok="ok" width="30%">
    <Form ref="form" :model="query" :rules="rules" :label-width="90">
      <FormItem label="MaxDays" prop="runLimitMaxDays">
        <Input v-model="query.runLimitMaxDays" placeholder="Input value" />
      </FormItem>
      <FormItem label="MaxHours" prop="runLimitMaxHours">
        <Input v-model="query.runLimitMaxHours" placeholder="Input value" />
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
        runLimitMaxDays: null,
        runLimitMaxHours: null,
      },
      rules: {
        runLimitMaxDays: [utils.require(), utils.range(0, 7)],
        runLimitMaxHours: [utils.require(), utils.range(0, 24)],
      },
    };
  },
  methods: {
    show(downSystemSiteId) {
      this.query.downSystemSiteId=downSystemSiteId;
      this.$refs.modal.show();
    },
    ok() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$utils.handleNormalRequest.call(this, async () => {
            let resp = await this.$api.downSystemSite.balance(this.query);
            if (resp && resp.code == 100) 
            return resp;
          });
        }
      });
    },
  },
};
</script>
