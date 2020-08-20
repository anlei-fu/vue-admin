<template>
  <MyModal ref="modal" title="BlockRule" :noCancel="true" @ok="ok" width="60%">
    <blockRule :downSystemSiteId="downSystemSiteId" />
  </MyModal>
</template>
<script>
import blockRule from "./../blockRule/index";
export default {
  components: {
    blockRule,
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
