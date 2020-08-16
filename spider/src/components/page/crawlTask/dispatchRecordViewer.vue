<template>
  <MyModal ref="modal" title="DispatchRecords" :noCancel="true" @ok="onOk" width="45%">
    <dispatchList :id="id" />
  </MyModal>
</template>
<script>
  import dispatchList from "./../dispatchRecord/index";
  export default {
    components: {
      dispatchList,
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
