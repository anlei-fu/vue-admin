<template>
  <MyModal :title="title" ref="modal" @ok="ok" width="30%">
    <Form class="form-container" ref="form" :model="query" :rules="rules" :label-width="90">
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
       <FormItem label="SortNumber" prop="sortNumber">
        <Input v-model="query.sortNumber" placeholder="Label of item" />
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
          type: [utils.require()],
          value: [utils.require(), utils.range(-1, 1000)],
          label: [utils.require()],
        },
        api: "dictionary",
        query: {
          type: null,
          value: null,
          label: null,
          sortNumber:null,
          color: null,
        },
      };
    },
    beforeMount() {
      utils.initOptionsFieldsShows.call(this);
      utils.copyFieldsFrom(this.query, this.model);
        utils.restoreOptionalFields("/dictionary/add",this);
    },
    beforeDestroy(){
       utils.snapShotOptionalFields("/dictionary/add",this);
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
        utils.add.call(this);
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