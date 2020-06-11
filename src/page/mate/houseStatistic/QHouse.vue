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
      <div class="time-selecter">
        <span>{{configName.DATANAME}}</span>
        <el-date-picker
          style="width:272px"
          value-format="yyyy-MM-dd"
          type="daterange"
          v-model="checkTime"
          range-separator="~"
          :start-placeholder="configName.STARTTIME1"
          :end-placeholder="configName.ENDTIME1"
        ></el-date-picker>
      </div>

      <el-row class="button-left">
        <el-button type="primary" @click="query">{{configName.QUERY}}</el-button>
        <el-button @click="reset">{{configName.RESET}}</el-button>
      </el-row>
    </template>

    <template>
      <div class="table">
        <el-table ref="OrderTable" v-loading="loading" :data="resultList">
          <el-table-column fixed="left" :label="labelName.number" width="60">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="totalBaseHouse" :label="labelName.totalBaseHouseCount"></el-table-column>
          <el-table-column prop="totalMergedHouse" :label="labelName.totalMergeHouseCount"></el-table-column>
          <el-table-column prop="mergeRatio" :label="labelName.mergeRatio" width="80"></el-table-column>
          <el-table-column prop="threeSourceMerged" :label="labelName.threeSourceMerged"></el-table-column>
          <el-table-column prop="twoSourceMerged" :label="labelName.twoSourceMerged"></el-table-column>
          <el-table-column prop="ljLyjMergedCount" :label="labelName.ljLyjMergedCount"></el-table-column>
          <el-table-column prop="ljZyMergedCount" :label="labelName.ljZyMergedCount"></el-table-column>
          <el-table-column prop="lyjZyMerged" :label="labelName.lyjZyMerged"></el-table-column>
          <el-table-column prop="oneSourceMerged" :label="labelName.oneSourceMerged"></el-table-column>
          <el-table-column prop="ljMergedCount" :label="labelName.ljMergedCount"></el-table-column>
          <el-table-column prop="lyjMerged" :label="labelName.lyjMerged"></el-table-column>
          <el-table-column prop="zyMerged" :label="labelName.zyMerged"></el-table-column>
          <el-table-column prop="houseMergedDate" :label="configName.DATANAME"></el-table-column>
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
  name: "QHouse",
  data() {
    return {
      loading: true,
      checkTime: null,
      resultList: [],
      result: {},
      condiction: {
        currentPage: 1,
        pageSize: 20,
        beginDate: null,
        endDate: null,
        city: "SHENZHEN"
      }
    };
  },
  mounted() {
    this.getListData(this.condiction);
  },
  computed: {
    ...mapState({
      cityList: state => state.cityList,
      configName: state => state.configName,
      labelName: state => state.labelName
    })
  },
  methods: {
    //查询
    query() {
      this.condiction.currentPage = 1;
      if (this.checkTime) {
        this.condiction.beginDate = this.checkTime[0];
        this.condiction.endDate = this.checkTime[1];
      }
      this.getListData(this.condiction);
    },
    //重置
    reset() {
      this.condiction = {
        currentPage: 1,
        pageSize: 20,
        beginDate: null,
        endDate: null,
        city: "SHENZHEN"
      };
      this.checkTime = null;
      this.getListData(this.condiction);
    },
    handleSizeChange(val) {
      this.condiction.pageSize = val;
      this.getListData(this.condiction);
    },
    handleCurrentChange(val) {
      this.condiction.currentPage = val;
      this.getListData(this.condiction);
    },
    /*请求数据*/
    getListData(val) {
      const ctx = this;
           
      API.getQStatistic(val).then(function(result) {
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


