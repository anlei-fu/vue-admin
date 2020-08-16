<template>
  <MyModal :title="title" ref="modal" @ok="ok">
    <Form ref="form" :model="query" :rules="rules" :label-width="120">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll height="300px">
        <FormItem v-if="showEnableStatus" label="EnableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>
        <FormItem v-if="showPassword" label="Password" prop="password">
          <Input v-model="query.password" placeholder="Input value" />
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
        optionalFields: utils.options(["EnableStatus", "Password"]),
        showingOptionalFields: ["Password", "EnableStatus"],
        rules: {},
        api: "siteAccount",
        query: {
          enableStatus: null,
          password: null,
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
