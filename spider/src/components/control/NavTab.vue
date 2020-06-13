<template>
  <div>
    <span class="wrapper">
      <span class="icon-container"><Icon type="ios-home" class="icon-item" size="24" @click="toHome" />
      <Icon type="md-refresh" class="icon-item" size="24" @click="refresh" />
      <Icon v-if="tabs.length>10" class="icon-item" type="ios-arrow-back" size="24" @click="moveLeft"></Icon>
       </span>
      
      <span class="tab-scroll">
      <span class="tab-container">
        <TabItem
          v-for="item in tabs"
          :key="item.path"
          :tab="item"
          :selected="item.selected"
          @close="closeTab(item,true)"
          @click="addTab(item,true)"
        />
        </span>
      </span>
      <span class="icon-container"> <Icon v-if="tabs.length>10" class="icon-item" type="ios-arrow-forward" size="24" @click="moveRight"></Icon></span>
     
    </span>
  </div>
</template>
<script>
import TabItem from "./TabItem";
export default {
  components:{
    TabItem
  },
  props: {
    currentLocation: String,
    homePath: String
  },
  data() {
    return {
      tabs: [
       
      ],
      offsetX:0,
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
    closeTab(tab,toPage) {
      let index = 0;
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i]&& this.tabs[i].path == tab.path) {
          if (i == 0) {
            index = 0;
          } else {
            index = i - 1;
          }
          break;
        }
      }
      this.tabs = this.tabs.filter(x => x.path != tab.path);
      if (this.tabs.length != 0&&toPage) this.toPage(this.tabs[index],true);
    },
    /**
     * Remove old tab and insert it at the start of tabs
     * call by parent component
     *
     * @param {Tab} tab
     */
    addTab(tab,emit) {
      this.closeTab(tab,false);
      this.tabs.unshift(tab);
      this.toPage(tab,emit);
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
    toPage(tab,emit) {
      this.tabs.forEach(tabItem => {
        if (tabItem.path == tab.path) {
          tabItem.selected = true;
        } else {
          tabItem.selected = false;
        }
        console.log(tab);
      });
      if(emit){
      this.$emit("on-change", tab);
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
      this.tabs.push(this.tabs.shift());
    },
    /**
     * Callback of move right button click
     */
    moveRight() {
      this.tabs.unshift(this.tabs.pop());
    }
  }
};
</script>

<style scoped>
.wrapper {
  vertical-align: middle;
}
 
 .icon-container{
   display: inline-block;
    /* height: 30px; */
    transform: translateY(-12px);
 }

.tab-scroll{
    overflow: hidden;
    display: inline-block;
    margin-left: 10px;
    width: 1000px;
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