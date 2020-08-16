<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <template v-if="optionalFields.length > 0">
        <Divider orientation="left">Optional Filter</Divider>
        <FormItem label="Fields">
          <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
        </FormItem>
      </template>
      <FormItem label="Site" prop="siteId">
        <MySelect v-model="query.siteId" enum="Site" width="100%" />
      </FormItem>
      <FormItem label="Ip" prop="ip">
        <Input v-model="query.ip" enum="ip" width="100%" />
      </FormItem>
      <FormItem label="BlockTimeoutTime" prop="blockTimeoutTime">
        <MySelect v-model="query.blockTimeoutTime" enum="blockTimeoutTimeTime" width="100%" />
      </FormItem>
    </Form>
  </MyModal>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: utils.addProps(),
    data() {
      return {
        optionalFields: [],
        showingOptionalFields: [],
        rules: {
          siteId: [utils.require()],
          ip: [utils.ip(), utils.require()],
          blockTimeoutTime: [utils.require()],
        },
        api: "siteIpBlockMap",
        query: {
          id: null,
          siteId: null,
          ip: null,
          createTime: null,
          blockTimeoutTime: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsShow.call(this);
      utils.copyFieldsFrom(this.query, this.model);
    },
    watch: {
      model(newVal) {
        utils.copyFieldsFrom(this.query, newVal);
      },
      showingOptionalFields(newVal) {
        utils.changeShowOptionalFields.call(this, newVal);
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
        utils.add.call(this);
      },
    },
  };
</script>
