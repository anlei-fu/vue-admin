<template>
  <MyModal :title="title" ref="modal" @ok="ok">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll>
        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>
        <FormItem v-if="showIpHourSpeedLimit" label="IpHourSpeedLimit" prop="ipHourSpeedLimit">
          <Input v-model="query.ipHourSpeedLimit" placeholder="Input value" />
        </FormItem>
        <FormItem
          v-if="showIpMinuteSpeedLimit"
          label="IpMinuteSpeedLimit"
          prop="ipMinuteSpeedLimit"
        >
          <Input v-model="query.ipMinuteSpeedLimit" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showIpDaySpeedLimit" label="IpDaySpeedLimit" prop="ipDaySpeedLimit">
          <Input v-model="query.ipDaySpeedLimit" placeholder="Input value" />
        </FormItem>
      </MyScroll>
    </Form>
  </MyModal>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: utils.batchEditProps(),
    data() {
      return {
        optionalFields: utils.options([
          "EnableStatus",
          "IpHourSpeedLimit",
          "IpMinuteSpeedLimit",
          "IpDaySpeedLimit",
        ]),
        showingOptionalFields: ["EnableStatus"],
        rules: {
          ipHourSpeedLimit: [utils.range(1, 1000000)],
          ipMinuteSpeedLimit: [utils.range(1, 1000)],
          ipDaySpeedLimit: [utils.range(1, 100000000)],
        },
        api: "site",
        query: {
          enableStatus: null,
          ipHourSpeedLimit: null,
          ipMinuteSpeedLimit: null,
          ipDaySpeedLimit: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsShow.call(this);
    },
    watch: {
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
        utils.batchEdit.call(this);
      },
    },
  };
</script>
