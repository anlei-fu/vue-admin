<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="90">
      <FormItem label="Type" prop="type">
        <Input v-model="query.type" placeholder="Type of item" />
      </FormItem>
      <FormItem label="Value" prop="value">
        <Input v-model="query.value" placeholder="Int value of item" />
      </FormItem>
      <FormItem label="Label" prop="label">
        <Input v-model="query.label" placeholder="Label of item" />
      </FormItem>
      <FormItem label="Color" prop="color">
        <MyColorPicker v-model="query.color" />
      </FormItem>
      <template v-if="optionalFields.length > 0">
        <Divider orientation="left">Optional Filter</Divider>
        <FormItem label="Fields">
          <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
        </FormItem>
      </template>
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
          type: [utils.require()],
          value: [utils.require(), utils.range(-1, 1000)],
          label: [utils.require()],
        },
        api: "dictionary",
        query: {
          type: null,
          value: null,
          label: null,
          color: null,
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
