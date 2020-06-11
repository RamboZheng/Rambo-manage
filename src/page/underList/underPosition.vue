<template>
  <div class="page">
    <template>
      <div>
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
        <div class="common-selecter">
          <el-select v-model="condiction.unshelveType" :placeholder="labelName.unshelveType">
            <el-option
              v-for="item in siteList.unshelveList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="common-selecter">
          <el-select v-model="condiction.unshelveReason" :placeholder="labelName.downReason">
            <el-option
              v-for="item in siteList.unshelveReason"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-input
          v-model="condiction.operatorName"
          :placeholder="labelName.operatorName"
          :maxlength="configName.MAXLENGTH"
          class="input-style"
        ></el-input>
        <el-input
          v-model="condiction.houseId"
          :placeholder="configName.HOUSEID"
          :maxlength="configName.MAXLENGTH"
          class="input-style"
        ></el-input>
        <el-input
          v-model="condiction.brokerName"
          :placeholder="configName.AGENTNAME"
          :maxlength="configName.MAXLENGTH"
          class="input-style"
        ></el-input>
        <el-row class="button-left">
          <el-button type="primary" @click="query">{{configName.QUERY}}</el-button>
          <el-button @click="reset">{{configName.RESET}}</el-button>
        </el-row>
      </div>
      <div class="condiction-bar">
        <div class="time-selecter">
          <span>{{configName.UNDERTIME}}</span>
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
      </div>
    </template>

    <template>
      <div class="table">
        <el-table ref="OrderTable" v-loading="loading" :data="resultList">
          <el-table-column fixed="left" :label="labelName.number" width="80">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="unshelveType" :label="labelName.unshelveType"></el-table-column>
          <el-table-column prop="houseId" :label="configName.HOUSEID" :width="labelName.houseIdW"></el-table-column>
          <el-table-column
            prop="gardenName"
            :label="labelName.gardenName"
            :width="labelName.gardenNameW"
          ></el-table-column>
          <el-table-column prop="totalPrice" :label="labelName.totalPrice"></el-table-column>
          <el-table-column prop="brokerName" :label="labelName.belongBoker"></el-table-column>
          <el-table-column prop="orderNum" :label="labelName.orderNum"></el-table-column>
          <el-table-column
            prop="unshelveDate"
            :label="configName.UNDERTIME"
            :width="labelName.timeW"
          ></el-table-column>
          <el-table-column prop="unshelveReason" :label="labelName.downReason"></el-table-column>
          <el-table-column prop="operatorName" :label="labelName.operatorName"></el-table-column>
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
import API from "@/axios/api/underListAPI";
import { mapState } from "vuex";
export default {
  name: "underPosition",
  data() {
    return {
      loading: true,
      checkTime: "",
      resultList: [],
      result: {},
      condiction: {
        currentPage: 1,
        pageSize: 20,
        beginDate: null,
        endDate: null,
        city: "SHENZHEN",
        houseId: null,
        brokerId: null,
        brokerName: null,
        unshelveType: null,
        unshelveReason: null,
        operatorName: null
      }
      //   测试数据
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
        houseId: null,
        brokerId: null,
        brokerName: null,
        unshelveType: null,
        unshelveReason: null,
        operatorName: null
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
           
      API.claimHouseUnshelveRecordSearch(val).then(function(result) {
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


