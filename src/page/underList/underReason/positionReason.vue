<template>
  <div class="page combine-page">
    <template>
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
      <div class="table">
        <el-table ref="OrderTable" v-loading="loading" :data="resultList">
          <el-table-column fixed="left" :label="labelName.number" width="80">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="manualUnshelveCount" :label="labelName.manualUnshelvePosition"></el-table-column>
          <el-table-column prop="imageIllegal" :label="labelName.imageIllegal"></el-table-column>
          <el-table-column prop="titleIllegal" :label="labelName.titleIllegal"></el-table-column>
          <el-table-column prop="appraiseIllegal" :label="labelName.appraiseIllegal"></el-table-column>
          <el-table-column prop="houseSaled" :label="labelName.houseSaled"></el-table-column>
          <el-table-column prop="houseUnSaled" :label="labelName.houseUnSaled"></el-table-column>
          <el-table-column prop="otherReason" :label="labelName.otherReason"></el-table-column>
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
import API from "@/axios/api/underListAPI";
import { mapState } from "vuex";
export default {
  name: "positionReason",
  data() {
    return {
      loading: true,
      currentPage: 1,
      checkTime: "",
      resultList: [],
      result: {},
      condiction: {
        currentPage: 1,
        pageSize: 20,
        beginDate: null,
        endDate: null
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
        endDate: null
      };
      this.checkTime = "";
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

      API.claimUnshelveReasonSearch(val).then(function(result) {
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


