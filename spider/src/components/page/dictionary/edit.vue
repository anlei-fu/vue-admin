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

    data() {
      return {
        optionalFields: [
          {
            label: "Type",
            value: "Type",
          },
          {
            label: "Value",
            value: "Value",
          },
          {
            label: "Label",
            value: "Label",
          },
          {
            label: "Color",
            value: "Color",
          },
        ],
        showingOptionalFields: ["Type", "Color", "Label", "Value"],
        rules: {
          value: [utils.range(-1, 1000)],
        },
        query: {
          type: null,
          value: null,
          label: null,
          color: null,
          id: null,
        },
      };
    },
    created() {
      this.$utils.copyFieldsFrom(this.query, this.model);
    },
    watch: {
      model(newVal) {
        debugger;
        this.$utils.copyFieldsFrom(this.query, newVal);
      },
    },
    computed: {
      showColor() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Color");
      },

      showType() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Type");
      },

      showValue() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Value");
      },

      showLabel() {
        return this.$utils.arrayHas(this.showingOptionalFields, "Label");
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
              let resp = await this.$api.dictionary.updateById(this.query);
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
