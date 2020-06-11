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
import peopleList from "./peopleMate/peopleList.vue";
import mateStatistic from "./peopleMate/mateStatistic.vue";
import peopleStatistic from "./peopleMate/peopleStatistic.vue";
export default {
  name: "peopleMate",
  data() {
    return {
      tabList: [
        { code: "peopleList", name: "人工匹配列表" },
        { code: "mateStatistic", name: "匹配量统计" },
        { code: "peopleStatistic", name: "人员统计" }
      ],
      table: "",
      tabView: "peopleList"
    };
  },
  components: {
    peopleList,
    mateStatistic,
    peopleStatistic
  },
  beforeMount() {
    this.table = sessionStorage.getItem("peopleMateIndex") || "peopleList";
  },
  methods: {
    tabChange(table) {
      this.tabView = table;
      sessionStorage.setItem("peopleMateIndex", table);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
