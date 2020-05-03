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
        style=" width:100%;height:100%;border:none;"
        :open-names="openNames"
        @on-select="changeMenu"
      >
        <template v-for="level1Menu in menuGroup.menus">
          <Submenu :key="level1Menu.name" :name="level1Menu.name" v-if="level1Menu.menus">
            <template slot="title">
              <Icon :type="level1Menu.icon" size="24" />
              {{level1Menu.label}}
            </template>
            <template v-for="level2Menu in level1Menu.menus">
              <Submenu :key="level2Menu.name" v-if="level2Menu.menus">
                <template slot="title">
                  <Icon :type="level2Menu.icon" size="24" />
                  {{level2Menu.label}}
                </template>
                <template v-for="level3Menu in level2Menu.menus">
                  <MenuItem :key="level3Menu.name" :name="level3Menu.name">{{level3Menu.label}}</MenuItem>
                </template>
              </Submenu>
              <MenuItem
                :key="level2Menu.name"
                :path="level2Menu.path"
                :name="level2Menu.name"
                v-else
              >{{level2Menu.label}}</MenuItem>
            </template>
          </Submenu>
          <MenuItem :key="level1Menu.name" :name="level1Menu.name" v-else>{{level1Menu.label}}</MenuItem>
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
  background-color: #fff;
  width: 100%;
  height: 8%;
  font-size: 25px;
  padding: 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dcdee2;
  border-top: 1px solid #dcdee2;
  border-right: 1px solid #dcdee2;
}

.menu-container {
  overflow-y: auto;
  height: 92%;
  background-color: white;
}
</style>