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
import QHouse from "./houseStatistic/QHouse.vue";
import LHouse from "./houseStatistic/LHouse.vue";
export default {
  name: "houseStatistic",
  data() {
    return {
      tabList: [
        { code: "QHouse", name: "Q房" },
        { code: "LHouse", name: "链家" }
      ],
      table: "",
      tabView: "QHouse"
    };
  },
  components: {
    QHouse,
    LHouse
  },
  beforeMount() {
    this.table = sessionStorage.getItem("houseStatisticIndex") || "QHouse";
  },
  methods: {
    tabChange(table) {
      this.tabView = table;
      sessionStorage.setItem("houseStatisticIndex", table);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
