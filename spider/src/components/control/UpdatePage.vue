<template>
  <MyModal>
    <MyCheckBoxGroup />
  </MyModal>
</template>
<script>
  export default {
    props: {
      editConfig: {
        type: Object,
        default: {},
      },
    },
  };
</script>
