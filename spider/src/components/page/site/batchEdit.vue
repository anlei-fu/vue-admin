<template>
  <MyModal :title="title" ref="modal" @ok="ok">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll  height="180px">
        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>
                <FormItem
          v-if="showIpMinuteSpeedLimit"
          label="IpMinuteSpeedLimit"
          prop="ipMinuteSpeedLimit"
        >
          <Input v-model="query.ipMinuteSpeedLimit" placeholder="Input value" />
        </FormItem>
                <FormItem
          v-if="showIp10MinuteSpeedLimit"
          label="Ip10MinuteSpeedLimit"
          prop="ip10MinuteSpeedLimit"
        >
          <Input v-model="query.ip10MinuteSpeedLimit" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showIpHourSpeedLimit" label="IpHourSpeedLimit" prop="ipHourSpeedLimit">
          <Input v-model="query.ipHourSpeedLimit" placeholder="Input value" />
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
          "Ip10MinuteSpeedLimit",
          "IpDaySpeedLimit",
        ]),
        showingOptionalFields: ["EnableStatus"],
        rules: {
          ipHourSpeedLimit: [utils.range(1, 1000000)],
          ipMinuteSpeedLimit: [utils.range(1, 1000)],
          ip10MinuteSpeedLimit: [utils.range(1, 1000)],
          ipDaySpeedLimit: [utils.range(1, 100000000)],
        },
        api: "site",
        query: {
          enableStatus: null,
          ipHourSpeedLimit: null,
          ipMinuteSpeedLimit: null,
          ip10MinuteSpeedLimit: null,
          ipDaySpeedLimit: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsFieldsShows.call(this);
       utils.restoreOptionalFields("/site/batchEdit",this);
    },
    beforeDestroy(){
       utils.snapShotOptionalFields("/site/batchEdit",this);
    },
    watch: {
      showingOptionalFields(newVal) {
        utils.changeShowingOptionalFields.call(this, newVal);
      },
    },
    methods: {
      show() {
        this.$utils.resetQuery(this.query);
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
