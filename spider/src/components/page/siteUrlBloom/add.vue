<template>
  <MyModal title="title" ref="modal" @ok="ok" width="40%">
    <Form ref="query" :model="query" :rules="rules" :label-width="120">
      <Divider orientation="left">Optional Filter</Divider>
      <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields" />
      <MyScroll>
        <FormItem v-if="showEnableStatus" label="enableStatus" prop="enableStatus">
          <MySelect v-model="query.enableStatus" enum="EnableStatus" width="100%" />
        </FormItem>
      </MyScroll>
    </Form>
  </MyModal>
</template>
<script>
  export default {
    props: {
      model: {
        type: Object,
        default: () => {},
      },
      title: {
        type: String,
        default: "",
      },
    },

    created() {
      //  this.$utils.copyFieldsFrom(this.query,this.model);
    },
    watch: {
      model(newVal) {
        this.$utils.copyFieldsFrom(this.query, newVal);
      },
    },

    data() {
      return {
        optionalFields: [
          {
            label: "enableStatus",
            value: "EnableStatus",
          },
        ],
        showingOptionalFields: [],
        rules: {},
        query: {
          enableStatus: null,
        },
      };
    },

    computed: {
      showScroll() {
        return this.showingOptionalFields.length > 0;
      },

      showEnableStatus() {
        return this.$utils.arrayHas(this.showingOptionalFields, "EnableStatus");
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
        this.$refs.query.validate((valid) => {
          if (valid) {
            this.$utils.handleNormalRequet(async () => {
              this.$api.site.add(this.query);
            });
            this.$refs.query.resetFields();
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
