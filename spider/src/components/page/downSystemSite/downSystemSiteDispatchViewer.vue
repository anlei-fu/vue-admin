<template>
  <MyModal ref="modal" title="BlockRule" :noCancel="true" @ok="ok" width="60%">
    <downsystemSiteDispatch :downSystemSiteId="downSystemSiteId" />
  </MyModal>
</template>
<script>
import downsystemSiteDispatch from "./../downSystemSiteDispatch/index";
export default {
  components: {
    downsystemSiteDispatch,
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
