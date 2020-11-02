<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="30%">
    <Form ref="form" class="form-container" :model="query" :rules="rules" :label-width="90
    ">
        <FormItem label="Type" prop="type">
          <Input v-model="query.type" placeholder="Input value" />
        </FormItem>
        <FormItem  label="Label" prop="label">
          <Input v-model="query.label" placeholder="Input value" />
        </FormItem>
        <FormItem label="Value" prop="value">
          <Input v-model="query.value" placeholder="Input value" />
        </FormItem>
        <FormItem  label="Color" prop="color">
          <MyColorPicker v-model="query.color" />
        </FormItem>
          <FormItem label="SortNumber" prop="sortNumber">
          <Input v-model="query.sortNumber" placeholder="Input value" />
        </FormItem>
    </Form>
  </MyModal>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: utils.editProps(),
    data() {
      return {
        rules: {
          value: [utils.range(-1, 1000)],
        },
        api: "dictionary",
        query: {
          type: null,
          value: null,
          label: null,
          color: null,
          sortNumber:null,
          id: null,
        },
      };
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
<style scoped>
.form-container{
    display: flex;
    flex-wrap: wrap;
}
.form-container >div{
    display: inline-block;
    width: 100%;
}
</style>