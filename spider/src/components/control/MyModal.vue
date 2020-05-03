<template>
  <Modal v-model="show_" draggable :title="title">
    <slot></slot>
    <div slot="footer" class="footer">
      <Button type="primary" @click="onOk">ok</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props:{
        title:String,
        top:Number,
        width:String
  },
  data() {
    return {
      show_: false
    };
  },

  methods: {
    show() {
        console.log("i'm show");
      this.show_ = true;
    },
    close() {
      this.show_ = false;
    },
    onOk(){
            this.$emit("onOk");
    }

  }
};
</script>
<style scoped>
.footer {
  text-align: right;
}
</style>