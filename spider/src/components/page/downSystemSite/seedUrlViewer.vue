<template>
  <MyModal ref="modal" title="Seed Url" width="60%" :noCancel="true" :ok="ok">
    <index :downSystemSiteId="downSystemSiteId" />
  </MyModal>
</template>
<script>
import index from "./../url/index";
export default {
  components: {
    index,
  },

  data() {
    return {
      downSystemSiteId: null,
    };
  },

  methods: {
    show(downSystemSiteId) {
      this.downSystemSiteId = downSystemSiteId;
      this.$refs.modal.show();
    },
    ok() {
      this.$refs.modal.close();
    },
  },
};
</script>