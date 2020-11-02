<template>
  <MyModal
    ref="modal"
    title="Edit Code"
    cancelText="Close"
    @cancel="cancel"
    okText="Update"
    @ok="ok"
    width="70%"
  >
    <div style="height: 500px">
      <codemirror v-model="code" :options="options" />
    </div>
  </MyModal>
</template>
<script>
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/base16-dark.css";
export default {
  data() {
    return {
      downSystemSiteId: null,
      scriptPath: null,
      code: null,
      options: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
    };
  },
  methods: {
    async show(downSystemSiteId, scriptPath) {
      this.downSystemSiteId = downSystemSiteId;
      this.scriptPath = scriptPath;
      try {
        let resp = await this.$api.file.download({ file: scriptPath });
        this.code = resp.data;
      } catch (ex) {
        console.log(ex);
        this.code ="----------------fetch script failed";
        this.$Message.error("get file failed");
      }
      this.$refs.modal.show();
    },
    cancel() {
      this.$refs.modal.close();
    },

    async ok() {
      try {
        let resp = await this.$api.file.upload({
          downSystemSiteId: this.downSystemSiteId,
          code: this.code,
        });
        if (resp.code == 100) {
          this.$emit("scriptUpdated", {
            downSystemSiteId: this.downSystemSiteId,
            scriptPath: resp.data,
          });
           this.$Message.success("success");
          return;
        }

        this.$Message.error(resp.message);
      } catch (ex) {
        this.$Message.error(ex);
      }
    },
  },
};
</script>
<style scoped>
.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: monospace;
  height: 100%;
  color: black;
  direction: ltr;
}
</style>