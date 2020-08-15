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
    props: {
      ids: {
        type: Array,
        default: () => [],
      },
      title: {
        type: String,
        default: "title",
      },
    },

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
          ipHourSpeedLimit: [
            {
              min: 0,
              max: 10,
              message: "out of range 0-10 ",
              trigger: "blur",
            },
          ],
          ipMinuteSpeedLimit: [
            {
              min: 0,
              max: 10,
              message: "out of range 0-10 ",
              trigger: "blur",
            },
          ],
          ipDaySpeedLimit: [
            {
              min: 0,
              max: 10,
              message: "out of range 0-10 ",
              trigger: "blur",
            },
          ],
        },
        query: {
          enableStatus: null,

          ipHourSpeedLimit: null,
          ipMinuteSpeedLimit: null,
          ipDaySpeedLimit: null,
        },
      };
    },
    computed: {
      showEnableStatus() {
        return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
      },

      showIpHourSpeedLimit() {
        return this.$utils.arrayHas(this.showingOptionalFields, "IpHourSpeedLimit");
      },

      showIpMinuteSpeedLimit() {
        return this.$utils.arrayHas(this.showingOptionalFields, "IpMinuteSpeedLimit");
      },

      showIpDaySpeedLimit() {
        return this.$utils.arrayHas(this.showingOptionalFields, "IpDaySpeedLimit");
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
              this.query.ids = this.ids;
              let resp = await this.$api.site.updateBatch(this.query);
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
