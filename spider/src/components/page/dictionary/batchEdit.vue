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
      rules: {},
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$utils.handleNormalRequest.call(this, async () => {
            this.query.ids = this.ids;
            let resp = await this.$api.dictionary.updateBatch(this.query);
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