<template>
  <div class="container">
    <!--header-->
    <div class="header">
      <!--logo-->
      <span>
        <img
          class="logo"
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        />
      </span>
      <!--nav menus-->
      <span>
        <nav-menu
          :modules="modules"
          :activeMenu="selectedModule._name"
          @on-changed="changeModule"
        ></nav-menu>
      </span>
      <!-- nav search box-->
      <span class="nav-search">
        <search-box/>
      </span>
      <!--user dropdown menu-->
      <span class="user-dropdown-menu-container">
        <drop-down-menu title="hello,admin"></drop-down-menu>
      </span>
    </div>
    <!--body-->
    <div class="body">
      <!--left nave menu -->
      <div class="body-left-menu-container">
        <transition name="fade-transform" mode="out-in">
        <left-menu
          :menuGroup="selectedModule"
          :activeMenu="selectedModule.defaultMenu"
          @on-change="changeMenu"
        ></left-menu>
        </transition>
      </div>
      <!--body content -->
      <div class="body-right-container">
        <!-- tab nav-->
        <div class="body-right-tab-nav-container">
          <nav-tab ref="tab" @on-change="changeTab"></nav-tab>
        </div>
        <!--router view page container-->
       
        <div class="body-right-page-container">
           <transition name="fade-transform" mode="out-in">
          <router-view />
           </transition>
        </div>
        <!--footer-->
        <div class="footer">
          <footers :items="footers" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { modules } from "./../../modules";
import leftMenu from "./../control/LeftNavMenu";
import navMenu from "./../control/NavMenu";
import searchBox from "./../control/SearchBox";
import navTab from "./../control/NavTab";
import footers from "./../control/Footers";
import dropdownMenu from "./../control/DropdownMenu";

export default {
  name: "home",
  components: {
    "left-menu": leftMenu,
    "nav-menu": navMenu,
    "search-box": searchBox,
    "nav-tab": navTab,
    footers: footers,
    "drop-down-menu": dropdownMenu
  },
  data: () => {
    return {
      //  mark current module
      selectedModule: {},
      // all modules
      modules: [],
      // footers
      footers: [
        "jasmin code generator ",
        "all rights reserved by fuanlei since 2019"
      ],
      // use to cache all menus
      menuMap: new Map()
    };
  },
  methods: {
    /**
     * Callack for module menu changed @see leftMenu
     * add menu to tab
     *
     * @param {String} menuName
     */
    changeMenu(menuName) {
      let menu = this.findMenu(this.selectedModule._name, menuName);
      this.selectedModule.activeMenuName=menuName;
      this.$refs.tab.addTab(menu);
      this.toPage(menu);
    },
    /**
     * Callback of tab changed @see navTab
     * goto target module if module changed
     * set active menu of left menu
     *
     * @param {Menu} menu
     */
    changeTab(menu) {
      if (menu.module != this.selectedModule.name) {
        for (const module of this.modules) {
          if ((module.name = menu.module)) {
            this.selectedModule = module;
            break;
          }
        }
      }
      this.selectedModule.activeMenuName = menu.name;
      this.toPage(menu);
    },
    /**
     * Callback for module changed @see nav
     * add active menu to tab control
     * and set left menu
     *
     * @param {String} moduleName
     */
    changeModule(moduleName) {
      for (const module of this.modules) {
        if (module._name == moduleName) {
          this.selectedModule =module;
          let menu = this.findMenu(moduleName, this.selectedModule.activeMenuName);
          console.log("menu found");
          console.log(menu)
          this.$refs.tab.addTab(menu);
          this.toPage(menu);
        }
      }
    },
    /**
     * find menu in menuMap
     *
     * @param {string} moduleName
     * @param {string} menuName
     * @returns {Menu}
     */
    findMenu(moduleName, menuName) {
      console.log(moduleName);
      console.log(menuName);
      let module = this.menuMap.get(moduleName);
      console.log(module);
      let menu =module.get(menuName);;
      console.log(menu);
      return menu;
    },
    /**
     * route to target page
     *
     * @param {Menu} menu
     */
    toPage(menu) {
      this.$router.push({ path: menu.path });
    },
    /**
     * initia all module by imports or override if needed
     */
    initModules() {
      this.modules = modules;
      this.selectedModule = modules[0];
      this.menuMap = new Map();
      this.modules.forEach(item => {
        let map = new Map();
        item.menus.forEach(menu => {
          this.cacheMenu(menu, map);
        });

        this.menuMap.set(item._name, map);
      });
    },
    /**
     * Cache menu
     *
     * @param {Menu} menu
     * @param {Map} map
     */
    cacheMenu(menu, map) {
      map.set(menu.path, menu);
      if (menu.menus) {
        menu.menus.forEach(x => {
          this.cacheMenu(x, map);
        });
      }
    }
  },
  // init all module
  created() {
    this.initModules();
  }
};
</script>
<style >
body {
  line-height: 1;
}
</style>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100%;
  position: absolute;
  background-size: cover;
  background-color: #f7f7f7;
}

/* Set scroll bar style */
::-webkit-scrollbar {
  width: 8px;
  height: 80%;
  border-radius: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}
/* thumb */
::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 8px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.header {
  height: 65px;
  background-color:rgb(48, 65, 86);
  text-align: left;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px 0px 6px 4px rgba(80, 80, 80, 0.2);
}
.logo {
  margin-left: 30px;
  height: 35px;
  top: 13px;
  display: inline-block;
  position: relative;
}

.user-dropdown-menu-container {
  margin-right: 50px;
  margin-top: 20px;
  display: inherit;
  float: right;
  font-size: 13px;
}

.body {
  padding: 0;
  margin-top: 71px;
  width: 100%;
  text-align: left;
}

.body-left-menu-container {
  position: fixed;
 top: 65px;
  width: 13%;
  bottom: 0;
  vertical-align: top;
  background-color: rgb(48, 65, 86);

  /* box-shadow: 0px 0px 6px 4px rgba(80, 80, 80, 0.2); */
}

.body-right-container {
  display: inline-block;
  margin-left: 14%;
  width: 85.2%;
  min-height: 800px;
  background-color: white;
}

.body-right-page-container {
  margin: 20px;
  text-align: center;
}

.body-right-tab-nav-container {
  background-color: white;
  height: 50px;
  padding: 10px;
  border-bottom: 1px solid #dcdee2;
}

.footer {
  padding-top: 10px;
  margin-top: 5px;
  background-color: #ffffff;
  height: 70px;
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
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover {
  border-bottom: 3px solid #2d8cf0;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
  color: white;
}

.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
}

.ivu-dropdown-item:hover {
  background: red;
}
.ivu-menu {
  width: 100%;
  text-align: left;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #2d8cf0;
  /* background: #f0faff; */
  z-index: 2;
}



/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

</style>