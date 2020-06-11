<template>
  <div class="page" id="app">
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
import gardenStickyStatistic from "./stickyStatistic/gardenStickyStatistic.vue";
import regionStickyStatistic from "./stickyStatistic/regionStickyStatistic.vue";
import tradeStickyStatistic from "./stickyStatistic/tradeStickyStatistic.vue";
export default {
  name: "stickyStatistic",
  data() {
    return {
      tabList: [
        { code: "gardenStickyStatistic", name: "小区统计" },
        { code: "regionStickyStatistic", name: "区域+价格段统计" },
        { code: "tradeStickyStatistic", name: "商圈+价格段统计" }
      ],
      table: "",
      tabView: "gardenStickyStatistic"
    };
  },
  components: {
    gardenStickyStatistic,
    regionStickyStatistic,
    tradeStickyStatistic
  },
  beforeMount() {
    this.table =
      sessionStorage.getItem("stickyStatisticIndex") || "gardenStickyStatistic";
  },
  methods: {
    tabChange(table) {
      this.tabView = table;
      sessionStorage.setItem("stickyStatisticIndex", table);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
