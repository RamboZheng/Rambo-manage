<template>
  <el-autocomplete
    class="inline-input"
    v-model="gardenName"
    :fetch-suggestions="querySearch"
    placeholder="小区名称"
    @input="inputName"
    @select="handleSelect"
    @change="querySearch"
  ></el-autocomplete>
</template>

<script>
import API from "@/axios/api/commonAPI";
export default {
  data() {
    return {
      gardenlist: [],
      gardenName: null
    };
  },
  methods: {
    // 获取输入文字
    inputName(val) {
      this.gardenName = val;
      this.$emit("pushGardenName", this.gardenName);
    },
    // 获取联想文字
    querySearch(queryString, cb) {
      if (!queryString) {
        cb(this.gardenlist);
        return;
      }
      let ctx = this,
        { ...parme } = { keyword: queryString };
      API.queryGarden(parme).then(function(result) {
        ctx.gardenlist = result.data;
      });

      let results = this.gardenlist;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      this.$emit("pushGardenName", item.value);
    },
    // 清空小区名称
    resetGardenName() {
      this.gardenName = null;
    }
  }
};
</script>
<style lang='scss' scoped>
.inline-input {
  margin-right: 10px;
}
</style>




