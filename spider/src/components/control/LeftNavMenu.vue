<!-- left nav menu
accept a module by prop 'menuGroup',
on select change emit a event 'on-changed' and pass a
string parameter 'name' of selected menu
-->
<template>
  <div>
    <!--module name and collapse button-->
    <div class="module-title">
      <Icon type="md-menu" size="30" @click="collapseAll" />
      <span style="margin-left:5px;font-size:20px;">{{menuGroup.label}}</span>
    </div>
    <!--menus max depth is 3-->
    <div class="menu-container">
      <Menu
        ref="leftMenu"
        :active-name="activeMenu"
        style=" width:100%;height:100%;border:none; background-color:rgb(48, 65, 86); color:rgb(64, 158, 255)"
        :open-names="openNames"
        @on-select="changeMenu"
      >
        <template v-for="level1Menu in menuGroup.menus">
          <Submenu :key="level1Menu.path" :name="level1Menu.path" v-if="level1Menu.menus" class="top-level-menu">
            <template slot="title">
              <Icon :type="level1Menu.icon" size="24" />
              {{level1Menu.label}}
            </template>
            <template v-for="level2Menu in level1Menu.menus">
              <Submenu :key="level2Menu.path" :name="level2Menu.path" v-if="level2Menu.menus" style="color:white">
                <template slot="title">
                  <Icon :type="level2Menu.icon" size="24" />
                  {{level2Menu.label}}
                </template>
                <template v-for="level3Menu in level2Menu.menus">
                  <MenuItem :key="level3Menu.path" :name="level3Menu.path">{{level3Menu.label}}</MenuItem>
                </template>
              </Submenu>
              <MenuItem
                :key="level2Menu.path"
                :name="level2Menu.path"
                class="second-level-menu"
                v-else
              >{{level2Menu.label}}</MenuItem>
            </template>
          </Submenu>
          <MenuItem :key="level1Menu.path" :name="level1Menu.path" v-else class="top-level-menu">{{level1Menu.label}}</MenuItem>
        </template>
      </Menu>
    </div>
  </div>
</template>
<script>
import { modules } from "../../modules";
export default {
  props: {
    // module
    menuGroup: Object,
    // bind selected menu through parent component
    activeMenu: String
  },
  data() {
    return {
      openNames:[]
    };
  },
  methods: {
    /**
     * Callback iview menu component with a string parameter of name of menu item
     * proxy it with 'on-changed' event to parent component
     *
     * @param {string} name
     */
    changeMenu(name) {
      this.$emit("on-change", name);
    },
    /**
     * collapse all menu
     */
    collapseAll() {
      console.log("click");
      this.$nextTick(() => {
        console.log(this.openNames);
        console.log(this.$refs.leftMenu);
        this.$refs.leftMenu.updateOpenKeys();
      });
    }
  }
};
</script>

<style scoped>
.module-title {
  background-color: rgb(48, 65, 86);
  width: 100%;
  height: 8%;
  font-size: 16px;
  padding: 8px;
  display: flex;
  align-items: center;
  color:rgb(191, 203, 217);
}

.top-level-menu{
  color:rgb(191, 203, 217);
  transition: all .5s;
}
.top-level-menu:hover{
  color: #57A3F3;
  background-color: rgb(38,52,69);
}

.second-level-menu{
  background-color:#273445;color:rgb(191, 203, 217);
  transition: .2s all;
  
}
.second-level-menu :hover{
  background-color:green;color:white
}



/* iview style override */
.ivu-menu-horizontal.ivu-menu-light:after {
  content: "";
  display: block;
  width: 100%;
  height: 0px;
  background: #dcdee2;
  position: absolute;
  bottom: 0;
  left: 0;
}

.ivu-menu-vertical.ivu-menu-light:after {
    content: '';
    display: block;
    width: 0px;
    height: 100%;
    background: #dcdee2;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
}

.menu-container {
  overflow-y: auto;
  height: 92%;
  background-color: rgb(48, 65, 86);
}
</style>