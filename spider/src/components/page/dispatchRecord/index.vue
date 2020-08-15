<template>
  <MyScroll maxHeight="500px">
    <MyTable ref="table" filter border stripe columnFilter :columns="columns" :datas="data.list" />
  </MyScroll>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: {
      id: Number | String,
    },
    created() {
      if (this.id) this.getData();
    },
    data() {
      return {
        columns: [
          utils.column("id"),
          utils.enumColumn("dispatchResult", null),
          utils.column("dispatchMsg"),
          utils.dateColumn("createTime", "CTime"),
        ],
        data: utils.data(),
      };
    },
    watch: {
      id() {
        if (this.id) this.getData();
      },
    },
    methods: {
      async getData() {
        try {
          debugger;
          let resp = await this.$api.dispatchRecord.getByTaskId({
            taskId: this.$utils.clone(this.id),
          });
          if (resp.code != 100) {
            this.$Message.error("get Data failed");
          }
          this.data.list = resp.data;
        } catch (ex) {
          this.$Message.error("get Data failed");
        }
      },
    },
  };
</script>
