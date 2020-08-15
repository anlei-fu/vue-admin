<template>
  <div>
    <span class="wrapper">
      <span class="icon-container">
        <Icon type="ios-home" class="icon-item" size="24" @click="toHome" />
        <Icon type="md-refresh" class="icon-item" size="24" @click="refresh" />
        <Icon
          v-if="tabs.length > 10"
          class="icon-item"
          type="ios-arrow-back"
          size="24"
          @click="moveLeft"
        ></Icon>
      </span>
      <span class="tab-scroll">
        <span class="tab-container" :style="{ transform: offset }">
          <TabItem
            v-for="item in tabs"
            :key="item.path"
            :tab="item"
            :selected="item.selected"
            @close="closeTab(item, true)"
            @click="addTab(item, true)"
          />
        </span>
      </span>
      <span class="icon-container">
        <Icon
          v-if="tabs.length > 10"
          class="icon-item"
          type="ios-arrow-forward"
          size="24"
          @click="moveRight"
        ></Icon>
      </span>
    </span>
  </div>
</template>
<script>
  import TabItem from "./TabItem";
  export default {
    components: {
      TabItem,
    },
    props: {
      currentLocation: String,
      homePath: String,
    },
    data() {
      return {
        tabs: [],
        index: 0,
        activePath: "",
        leftNavigateEnabled: false,
        rightNavigateEnabled: false,
      };
    },
    computed: {
      offset() {
        return this.index > 10 ? `translateX(${(this.index - 10) * -105}px)` : `translateX(0px)`;
      },
    },

    methods: {
      /**
       * Callback of tab close button click
       * remove current tab and active its previous
       *
       * @param {Tab} tab
       */
      closeTab(tab, emitChange) {
        if (this.tabs.length == 1) return;

        let index = this.findTabIndex(tab.path);
        if (index != -1) {
          this.tabs = this.tabs.filter((x) => x.path != tab.path);
          this.index = index;
          if (this.tabs.length != 0 && emitChange) this.emitChange(this.tabs[index], true);
        }

        if (index > 10) {
          this.leftNavigateEnabled = true;
          if (index != this.tabs.length) {
            this.rightNavigateEnabled = true;
          } else {
            this.rightNavigateEnabled = false;
          }
        }
      },
      /**
       * Remove old tab and insert it at the start of tabs
       * call by parent component
       *
       * @param {Tab} tab
       */
      addTab(tab, emit) {
        let index = this.findTabIndex(tab.path);
        // add by outter
        if (index == -1) {
          this.tabs.unshift(tab);
          if (this.tabs.length > 10) {
            this.index = 0;
            this.leftNavigateEnabled = false;
            this.rightNavigateEnabled = true;
          }
        } else {
          // not change
          if (index == this.index) return;

          if (index > 10) {
            this.leftNavigateEnabled = true;
            if (index != this.tabs.length) {
              this.rightNavigateEnabled = true;
            } else {
              this.rightNavigateEnabled = false;
            }
          } else {
            this.leftNavigateEnabled = false;
            if (this.tabs.length > 10) this.rightNavigateEnabled = true;
          }
          // click tab to change
          this.emitChange(tab, emit);

          this.index = index;
        }
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
      emitChange(tab, emit) {
        this.tabs.forEach((tabItem) => {
          if (tabItem.path == tab.path) {
            tabItem.selected = true;
          } else {
            tabItem.selected = false;
          }
        });
        if (emit) {
          this.$emit("on-change", tab);
        }
      },
      resetOffset() {
        if (this.index < 10) {
          if (this.tabs.length > 10) {
            this.leftNavigateEnabled = false;
            this.rightNavigateEnabled = true;
          } else {
            this.leftNavigateEnabled = this.rightNavigateEnabled = false;
          }
        } else {
          this.leftNavigateEnabled = true;
        }
      },

      /**
       * Callback of refresh current page
       */
      refresh() {},
      /**
       * Callback of move left button click
       */
      moveLeft() {
        if (this.index == 10) return;

        this.index = this.index - 1;
      },
      /**
       * Callback of move right button click
       */
      moveRight() {
        if (this.index == this.tabs.length) return;

        this.index = this.index + 1;
      },

      findTabIndex(path) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i] && this.tabs[i].path == path) {
            return i;
          }
        }
        return -1;
      },
    },
  };
</script>

<style scoped>
  .wrapper {
    vertical-align: middle;
  }

  .icon-container {
    display: inline-block;
    /* height: 30px; */
    transform: translateY(-12px);
  }

  .tab-scroll {
    overflow: hidden;
    display: inline-block;
    margin-left: 10px;
    width: 1040px;
  }

  .tab-container {
    /* max-width: 1400px; */
    display: inline-block;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    margin: 0px 10px;
  }

  .icon-item {
    transition: 0.6s;
  }
  .icon-item:hover {
    color: #57a3f3;
    cursor: pointer;
  }
</style>
