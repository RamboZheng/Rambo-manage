<template>
  <div class="page combine-page">
    <template>
      <div class="common-selecter">
        <el-select v-model="condiction.city" :placeholder="configName.CITY">
          <el-option
            v-for="item in cityList"
            :key="item.fullPinyin"
            :label="item.name"
            :value="item.fullPinyin"
          ></el-option>
        </el-select>
      </div>
      <el-row class="button-left">
        <el-button type="primary" @click="query">{{configName.QUERY}}</el-button>
        <el-button @click="reset">{{configName.RESET}}</el-button>
      </el-row>
    </template>

    <template>
      <div class="table">
        <el-table ref="OrderTable" v-loading="loading" :data="resultList">
          <el-table-column fixed="left" :label="labelName.number" width="80">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="operatorName" :label="labelName.operatorName"></el-table-column>
          <el-table-column prop="mergedBaseHouseCount" :label="labelName.mergedBaseHouseCount"></el-table-column>
          <el-table-column
            prop="mergedPassBaseHouseCount"
            :label="labelName.mergedPassBaseHouseCount"
          ></el-table-column>
          <el-table-column prop="totalMergedHouse" :label="labelName.totalMergedHouse"></el-table-column>
          <el-table-column prop="mergedPassRatio" :label="labelName.mergedPassRatio"></el-table-column>
          <el-table-column prop="mergedDate" :label="labelName.mergedDate"></el-table-column>
        </el-table>
      </div>
    </template>
    <template>
      <div class="page-num">
        <el-pagination
          background
          v-loading="loading"
          :pager-count="9"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="condiction.currentPage"
          :page-sizes="[10 , 20, 30, 40, 50 , 100]"
          :page-size="20"
          layout="total,prev,pager,next,sizes,jumper"
          :total="result.recordTotal"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
import API from "@/axios/api/mateAPI";
import { mapState } from "vuex";
export default {
  name: "peopleStatistic",
  data() {
    return {
      loading: true,
      resultList: [],
      result: {},
      condiction: {
        city: "SHENZHEN",
        currentPage: 1,
        pageSize: 20
      }
    };
  },
  mounted() {
    this.getListData(this.condiction);
  },
  computed: {
    ...mapState({
      configName: state => state.configName,
      labelName: state => state.labelName,
      cityList: state => state.cityList,
      siteList: state => state.siteList
    })
  },
  methods: {
    //查询
    query() {
      this.condiction.currentPage = 1;
      this.getListData(this.condiction);
    },
    //重置
    reset() {
      this.condiction = {
        city: "SHENZHEN",
        currentPage: 1,
        pageSize: 20
      };
      this.getListData(this.condiction);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.condiction.pageSize = val;
      this.getListData(this.condiction);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.condiction.currentPage = val;
      this.getListData(this.condiction);
    },
    /*请求数据*/
    getListData(val) {
      const ctx = this;
           
      API.peopelMateStatistic(val).then(function(result) {
        if (result.data) {
          ctx.result = result.data;
          ctx.resultList = result.data.items;
        }
        ctx.loading = false;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>


