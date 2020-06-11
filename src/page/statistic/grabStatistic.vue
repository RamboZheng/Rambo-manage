<template>
  <div class="page">
    <template>
      <div class="common-selecter">
        <el-select v-model="condiction.city" :placeholder="configName.CITY" @change="getRegion">
          <el-option
            v-for="item in cityList"
            :key="item.fullPinyin"
            :label="item.name"
            :value="item.fullPinyin"
          ></el-option>
        </el-select>
      </div>
      <div class="common-selecter">
        <el-select
          v-model="condiction.regionId"
          :placeholder="configName.REGION"
          @change="getBussiness()"
        >
          <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="common-selecter">
        <el-select v-model="condiction.houseSource" :placeholder="configName.FROM">
          <el-option
            v-for="item in siteList.baseFromList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="time-selecter">
        <span>{{configName.TIMENAME}}</span>
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
      <el-row :gutter="5">
        <el-col :span="10">
          <div
            class="total-statistic"
          >{{labelName.garbCountStatistic}}：{{totalNum?totalNum+'套':"暂无数据"}}</div>
        </el-col>
      </el-row>
    </template>
    <template>
      <div class="table">
        <el-table ref="OrderTable" v-loading="loading" :data="resultList">
          <el-table-column fixed="left" :label="labelName.number" width="80">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="houseSource" :label="labelName.houseSource"></el-table-column>
          <el-table-column prop="city" :label="configName.CITY"></el-table-column>
          <el-table-column prop="region" :label="labelName.regionName"></el-table-column>
          <el-table-column prop="houseCount" :label="labelName.houseCount"></el-table-column>
          <el-table-column prop="modifyDate" :label="labelName.modifyDate" :width="labelName.timeW"></el-table-column>
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
import API from "@/axios/api/statisticAPI";
import { mapState } from "vuex";
import getSite from "@/mixins/getSite"; // 引入mixin文件
export default {
  name: "grabStatistic",
  mixins: [getSite],
  data() {
    return {
      loading: true,
      checkTime: "",
      totalNum: "暂无数据",
      resultList: [],
      result: {},
      condiction: {
        currentPage: 1,
        pageSize: 20,
        beginDate: null,
        endDate: null,
        city: "SHENZHEN",
        regionId: null,
        regionName: null,
        houseSource: null
      }
      //   测试数据
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
      if (this.checkTime) {
        this.condiction.beginDate = this.checkTime[0];
        this.condiction.endDate = this.checkTime[1];
      }
      //此接口比较特殊 如果选中区域要传区域名称
      if (this.condiction.regionId) {
        for (let item of this.regionList) {
          if (item.id == this.condiction.regionId) {
            this.condiction.regionName = item.name;
            break;
          }
        }
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
        city: "SHENZHEN",
        regionId: null,
        regionName: null,
        houseSource: null
      };
      this.checkTime = null;
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
           
      API.crawlerHouseCountSearch(val).then(function(result) {
        if (result.data) {
          ctx.result = result.data;
          ctx.resultList = result.data.items;
        }
        ctx.loading = false;
        ctx.crawlerHouseTotalCountQuery(val);
      });
    },
    crawlerHouseTotalCountQuery(val) {
      const ctx = this;
      API.crawlerHouseTotalCountQuery(val).then(function(result) {
        ctx.totalNum = result.data;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.total-statistic {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #475266;
  margin: 20px 0 10px 0;
}
.table {
  margin-top: 10px !important;
}
</style>


