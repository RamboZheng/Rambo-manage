<template>
  <div id="app">
    <div>
      <el-radio-group v-model="table" size="medium" class="top-tab">
        <el-radio-button
          v-for="(item,index) in tabList"
          :label="item.code"
          :key="index"
        >{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
    <!-- tab内容 -->

    <component
      v-bind:is="tabView, tabChange(table)"
      style="background: #FF0000; width: 100%; height: 100%"
    ></component>
  </div>
</template>  
  
<script>
import showList from "./manageList/showList.vue";
import claimList from "./manageList/claimList.vue";
import stickyList from "./manageList/stickyList.vue";
export default {
  name: "app",
  data() {
    return {
      tabList: [
        { code: "showList", name: "展示房源列表" },
        { code: "claimList", name: "认领房源列表" },
        { code: "stickyList", name: "置顶房源列表" }
      ],
      table: "",
      tabView: "showList"
    };
  },
  components: {
    showList,
    claimList,
    stickyList
  },
  beforeMount() {
    this.table = sessionStorage.getItem("manageListIndex") || "showList";
  },
  methods: {
    tabChange(table) {
      this.tabView = table;
      sessionStorage.setItem("manageListIndex", table);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
