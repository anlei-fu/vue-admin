<template>
  <Modal v-model="show_" :title="title" :width="width" mask>
    <slot></slot>
    <div slot="footer" class="footer">
      <slot name="button" />
      <Button v-if="!noCancel" type="default" @click="close">{{ cancelText }}</Button>
      <Button type="primary" @click="onOk">{{ okText }}</Button>
    </div>
  </Modal>
</template>
<script>
  export default {
    props: {
      title: String,
      width: String,
      noCancel: false,
      okText: {
        type: String,
        default: "ok",
      },
      cancelText: {
        type: String,
        default: "cancel",
      },
    },
    data() {
      return {
        show_: false,
      };
    },
    methods: {
      show() {
        this.show_ = true;
      },
      close() {
        this.show_ = false;
      },
      onOk() {
        this.$emit("ok");
      },
    },
  };
</script>
