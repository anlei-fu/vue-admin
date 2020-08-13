<template>
  <Button type="primary" style="width: 90px; margin-left: 5px; " @click="click">
    <Icon type="ios-search" size="18" />
    {{ label }}
  </Button>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: "Search",
      },
    },
    methods: {
      click() {
        this.$emit("click");
      },
    },
  };
</script>
