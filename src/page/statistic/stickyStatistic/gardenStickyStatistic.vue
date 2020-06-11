<template>
  <div class="page combine-page">
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
          >{{labelName.topHouseCount}}：{{totalTopNum?totalTopNum+'套':"暂无数据"}}</div>
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
          <el-table-column prop="topHouseCount" :label="labelName.topHouseCount"></el-table-column>
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
import gardenInput from "@/components/content/gardenInput";
import API from "@/axios/api/statisticAPI";
import { mapState, mapMutations } from "vuex";
import getSite from "@/mixins/getSite"; // 引入mixin文件
export default {
  name: "gardenStickyStatistic",
  mixins: [getSite],
  components: {
    gardenInput
  },
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
        topType: "GARDEN",
        city: "SHENZHEN",
        regionId: null,
        businessId: null,
        gardenId: null,
        priceSection: null
      }
    };
  },
  mounted() {
    this.getListData(this.condiction);
    this.queryTopPriceSection();
  },

  methods: {
    ...mapMutations(["saveSectionList"]),
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
        topType: "GARDEN",
        city: "SHENZHEN",
        regionId: null,
        businessId: null,
        gardenId: null,
        priceSection: null
      };
      this.checkTime = null;
      this.getListData(this.condiction);
      this.$refs.gardenInput.resetGardenName();
    },
    queryTopPriceSection() {
      const ctx = this;
      API.queryTopPriceSection().then(function(result) {
        ctx.saveSectionList(result.data);
      });
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
           
      API.topHouseCountSearch(val).then(function(result) {
        if (result.data) {
          ctx.result = result.data;
          ctx.resultList = result.data.items;
        }
        ctx.loading = false;
        ctx.houseTopTotalCountQuery(val);
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


