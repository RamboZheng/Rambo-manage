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
        <el-select v-model="condiction.businessId" :placeholder="configName.TRADE">
          <el-option
            v-for="item in bussinssList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>

      <garden-Input ref="gardenInput" @pushGardenName="getGardenName"></garden-Input>
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
      <el-row :gutter="5">
        <el-col :span="3">
          <div
            class="total-statistic"
          >{{labelName.claimHouseCount}}：{{totalNum.claimHouseCount || 0}}</div>
        </el-col>
        <el-col :span="3">
          <div class="total-statistic">{{labelName.claimPositionCount}}：{{totalNum.claimCount|| 0}}</div>
        </el-col>
        <el-col :span="3">
          <div
            class="total-statistic"
          >{{labelName.fivePositionCount}}：{{totalNum.fiveClaimHouseCount|| 0}}</div>
        </el-col>
        <el-col :span="3">
          <div
            class="total-statistic"
          >{{labelName.fourPositionCount}}：{{totalNum.fourClaimHouseCount|| 0}}</div>
        </el-col>
        <el-col :span="3">
          <div
            class="total-statistic"
          >{{labelName.threePositionCount}}：{{totalNum.threeClaimHouseCount|| 0}}</div>
        </el-col>
        <el-col :span="3">
          <div
            class="total-statistic"
          >{{labelName.twoPositionCount}}：{{totalNum.twoClaimHouseCount|| 0}}</div>
        </el-col>
        <el-col :span="3">
          <div
            class="total-statistic"
          >{{labelName.onePositionCount}}：{{totalNum.oneClaimHouseCount|| 0}}</div>
        </el-col>
      </el-row>
    </template>
    <template>
      <div class="table">
        <el-table ref="OrderTable" v-loading="loading" :data="resultList">
          <el-table-column fixed="left" :label="labelName.number" width="80">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="regionName" :label="labelName.regionName"></el-table-column>
          <el-table-column prop="businessName" :label="configName.TRADE"></el-table-column>
          <el-table-column
            prop="gardenName"
            :label="labelName.gardenName"
            :width="labelName.gardenNameW"
          ></el-table-column>
          <el-table-column prop="claimHouseCount" :label="labelName.claimHouse"></el-table-column>
          <el-table-column prop="claimCount" :label="labelName.claimPosition"></el-table-column>
          <el-table-column prop="fiveClaimHouseCount" :label="labelName.fiveClaimHouseCount"></el-table-column>
          <el-table-column prop="fourClaimHouseCount" :label="labelName.fourClaimHouseCount"></el-table-column>
          <el-table-column prop="threeClaimHouseCount" :label="labelName.threeClaimHouseCount"></el-table-column>
          <el-table-column prop="twoClaimHouseCount" :label="labelName.twoClaimHouseCount"></el-table-column>
          <el-table-column prop="oneClaimHouseCount" :label="labelName.oneClaimHouseCount"></el-table-column>
          <el-table-column prop="modifyDate" :label="configName.DATANAME"></el-table-column>
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
import gardenInput from "@/components/content/gardenInput";
import API from "@/axios/api/statisticAPI";
import { mapState } from "vuex";
import getSite from "@/mixins/getSite"; // 引入mixin文件
export default {
  name: "claimStatistic",
  mixins: [getSite],
  components: {
    gardenInput
  },
  data() {
    return {
      loading: true,
      totalNum: "",
      checkTime: "",
      resultList: [],
      result: {},
      condiction: {
        currentPage: 1,
        pageSize: 20,
        beginDate: null,
        endDate: null,
        city: "SHENZHEN",
        regionId: null,
        businessId: null,
        gardenName: null
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
      labelName: state => state.labelName,
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
        businessId: null,
        gardenName: null
      };
      this.checkTime = null;
      this.getListData(this.condiction);
      this.$refs.gardenInput.resetGardenName();
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
    // 获取子组件传来的小区名称
    getGardenName(data) {
      this.condiction.gardenName = data;
    },
    /*请求数据*/
    getListData(val) {
      const ctx = this;

      API.claimHouseCountSearch(val).then(function(result) {
        if (result.data) {
          ctx.result = result.data;
          ctx.resultList = result.data.items;
        }
        ctx.loading = false;
        ctx.claimHouseTotalCountSearch(val);
      });
    },
    // 获取认领总量
    claimHouseTotalCountSearch(val) {
      const ctx = this;
      API.claimHouseTotalCountSearch(val).then(function(result) {
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


