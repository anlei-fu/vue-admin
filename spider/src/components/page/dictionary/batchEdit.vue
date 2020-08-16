<template>
  <MyModal :title="title" ref="modal" @ok="ok">
    <Form ref="form" :model="query" :rules="rules" :label-width="80">
      <FormItem label="type" prop="type">
        <Input v-model="query.type" placeholder="Input value" />
      </FormItem>
    </Form>
  </MyModal>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: utils.batchEditProps(),
    data() {
      return {
        rules: {},
        api: "dictionary",
        query: {
          type: null,
        },
      };
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
