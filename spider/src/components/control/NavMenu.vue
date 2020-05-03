<template>
  <Menu
    mode="horizontal"
    class="nav-left-menu"
    style
    :active-name="activeMenu"
    @on-select="changeModule"
  >
    <template v-for="item in modules">
      <MenuItem :key="item._name" :name="item._name" class="nav-left-menu-item">
        {{
        item.label
        }}
      </MenuItem>
    </template>
  </Menu>
</template>
<script>
export default {
  props: {
    modules: Array
  },
  data() {
    return {
      activeMenu: ""
    };
  },
  methods:{
    /**
     * Proxy iview menu component 'on-select' by emitting a 'on-changed' event
     * to parent component
     * 
     * @param {String} moduleName
     */
    changeModule(moduleName){
      this.$emit("on-changed", moduleName);
    }
  }
};
</script>
<style scoped>
.nav-left-menu {
  margin: 0px;
  margin-left: 30px;
  margin-right: 30px;
  display: inline;
  float: none;
  background-color: inherit;
}
.nav-left-menu a {
  color: white;
}
.nav-right-menu {
  margin-right: 50px;
  margin-top: 20px;
  display: inherit;
  float: right;
  font-size: 13px;
}

.nav-left-menu-item {
  padding: 14px 0px;
  margin: 13px;

  font-size: 16px;
  display: inline;
  float: none;
  color: orange;
  font-weight: 400;
}
</style>
