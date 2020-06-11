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
import houseReason from "./underReason/houseReason.vue";
import positionReason from "./underReason/positionReason.vue";
export default {
  name: "underReason",
  data() {
    return {
      tabList: [
        { code: "houseReason", name: "下架房源" },
        { code: "positionReason", name: "下架展位" }
      ],
      table: "",
      tabView: "houseReason"
    };
  },
  components: {
    houseReason,
    positionReason
  },
  beforeMount() {
    this.table = sessionStorage.getItem("underReasonIndex") || "houseReason";
  },
  methods: {
    tabChange(table) {
      this.tabView = table;
      sessionStorage.setItem("underReasonIndex", table);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
