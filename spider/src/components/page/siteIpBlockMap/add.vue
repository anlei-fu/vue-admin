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
        optionalFields: [],
        showingOptionalFields: [],
        rules: {
          siteId: [utils.require()],
          ip: [utils.ip(), utils.require()],

          blockTimeoutTime: [utils.require()],
        },
        query: {
          id: null,
          siteId: null,
          ip: null,
          createTime: null,
          blockTimeoutTime: null,
        },
      };
    },
    created() {
      this.$utils.copyFieldsFrom(this.query, this.model);
    },

    computed: {},

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
              return this.$api.siteIpBlockMap.add(this.query);
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
