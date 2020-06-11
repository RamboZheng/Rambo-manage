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
import combineHouse from "./autoMate/combineHouse.vue";
import independentHouse from "./autoMate/independentHouse.vue";
import statisticMate from "./autoMate/statisticMate.vue";
export default {
  name: "autoMate",
  data() {
    return {
      tabList: [
        { code: "combineHouse", name: "合并房源列表" },
        { code: "independentHouse", name: "独立房源列表" },
        { code: "statisticMate", name: "匹配量统计" }
      ],
      table: "",
      tabView: "combineHouse"
    };
  },
  components: {
    combineHouse,
    independentHouse,
    statisticMate
  },
  beforeMount() {
    this.table = sessionStorage.getItem("autoMateIndex") || "combineHouse";
  },
  methods: {
    tabChange(table) {
      this.tabView = table;
      sessionStorage.setItem("autoMateIndex", table);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
