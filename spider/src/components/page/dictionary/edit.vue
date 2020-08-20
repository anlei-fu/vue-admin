<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="form" :model="query" :rules="rules" :label-width="50">
      <FormItem label="Fields">
        <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      </FormItem>
      <MyScroll>
        <FormItem v-if="showType" label="Type" prop="type">
          <Input v-model="query.type" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showLabel" label="Label" prop="label">
          <Input v-model="query.label" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showValue" label="Value" prop="value">
          <Input v-model="query.value" placeholder="Input value" />
        </FormItem>
        <FormItem v-if="showColor" label="Color" prop="color">
          <MyColorPicker v-model="query.color" />
        </FormItem>
      </MyScroll>
    </Form>
  </MyModal>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: utils.editProps(),
    data() {
      return {
        optionalFields: utils.options(["Type", "Color", "Label", "Value"]),
        showingOptionalFields: ["Type", "Color", "Label", "Value"],
        rules: {
          value: [utils.range(-1, 1000)],
        },
        api: "dictionary",
        query: {
          type: null,
          value: null,
          label: null,
          color: null,
          id: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsFieldsShows.call(this);
      utils.copyFieldsFrom(this.query, this.model);
    },
    watch: {
      model(newVal) {
        utils.copyFieldsFrom(this.query, newVal);
      },
      showingOptionalFields(newVal) {
        utils.changeShowingOptionalFields.call(this, newVal);
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
        utils.edit.call(this);
      },
    },
  };
</script>
