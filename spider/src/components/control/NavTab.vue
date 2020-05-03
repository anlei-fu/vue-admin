<template>
  <div>
    <span class="wrapper">
      <Icon type="ios-home" class="icon-item" size="24" @click="toHome" />
      <Icon type="md-refresh" class="icon-item" size="24" @click="refresh" />
        <Icon class="icon-item" type="ios-arrow-back" size="24" @click="moveLeft"></Icon>
      <span class="tab-container">
        <span
          v-for="item in tabs"
          v-bind:class="{'tab-active':item.isActive}"
          :key="item.name"
          @click="toPage(item)"
          class="tab-item"
        >
          {{item.label}}
          <Icon  type="ios-close" @click="closeTab(item)" size="18" />
        </span>
      </span>
        <Icon class="icon-item" type="ios-arrow-forward" size="24" @click="moveRight"></Icon>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    currentLocation: String,
    homePath: String
  },
  data() {
    return {
      tabs: [
        {
          module: "sss",
          name: "123",
          path: "/",
          label: "phone charge"
        },
        {
          module: "sss",
          name: "456",
          path: "/login",
          label: "flow charge"
        },
        {
          module: "sss",
          name: "789",
          path: "/log",
          label: "phone charge"
        },
        {
          module: "sss",
          name: "987",
          path: "/login",
          label: "flow charge"
        }
      ],
      activePath: ""
    };
  },

  methods: {
    /**
     * Callback of tab close button click
     * remove current tab and active its previous
     *
     * @param {Tab} tab
     */
    closeTab(tab) {
      console.log("tab");
      console.log(tab);
      let index = 0;
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].path == tab.path) {
          if (i == 0) {
            index = 0;
          } else {
            index = i - 1;
          }
          break;
        }
      }
      this.tabs = this.tabs.filter(x => x.path != tab.path);
      if (this.tabs.length != 0) this.toPage(this.tabs[index]);
    },
    /**
     * Remove old tab and insert it at the start of tabs
     * call by parent component
     *
     * @param {Tab} tab
     */
    addTab(tab) {
      this.closeTab(tab);
      this.tabs.unshift(tab);
      this.toPage(tab);
    },
    /**
     * To home page
     */
    toHome() {
      if (this.homePath) {
        this.$router.push({ path: homePath });
      }
    },
    /**
     * Emit tab ''on-changed' event to parent component
     */
    toPage(tab) {
      this.tabs.forEach(tab => {
        if (tab.path == tab.path) {
          tab.isActive = true;
        } else {
          tab.isActive = false;
        }
      });
      this.$emit("on-change", tab);
    },
    /**
     * Callback of refresh current page
     */
    refresh() {},
    /**
     * Callback of move left button click
     */
    moveLeft() {
      this.tabs.push(this.tabs.shift());
    },
    /**
     * Callback of move right button click
     */
    moveRight() {
      this.tabs.unshift(this.tabs.pop());
    }
  },
};
</script>

<style scoped>
.wrapper {
  vertical-align: middle;
}


.tab-container {
  max-width: 80%;
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  white-space: nowrap;
  vertical-align: middle;
  transition: 0.5s;
}

.tab-active {
  background-color: rebeccapurple;
}

.tab-item {
      background-color: whitesmoke;
    margin-right: 3px;
    overflow: hidden;
    display: inline-block;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    line-height: 30px;
    padding-left: 24px;
}
.tab-item:hover {
  color: red;
  cursor: pointer;
  background-color: lightblue;
}
.icon-item {
  transition: 0.6s;
}
.icon-item:hover {
  color: blue;
  cursor: pointer;
}
</style>