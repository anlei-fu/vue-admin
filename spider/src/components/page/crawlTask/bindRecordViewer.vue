<template>
  <MyModal ref="modal" :noCancel="true" @ok="onOk" width="45%">
    <bindList :id="id" />
  </MyModal>
</template>
<script>
  import bindList from "./../bindRecord/index";
  export default {
    components: {
      bindList,
    },
    data() {
      return {
        id: null,
      };
    },
    methods: {
      show(taskId) {
        this.id = taskId;
        this.$refs.modal.show();
      },
      onOk() {
        this.$refs.modal.close();
      },
    },
  };
</script>
