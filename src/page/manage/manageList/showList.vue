<template>
  <div class="page combine-page">
    <template>
      <div>
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
            <el-option
              v-for="item in regionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
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
        <div class="common-selecter">
          <el-select v-model="condiction.mergeType" :placeholder="configName.MERGETYPE">
            <el-option
              v-for="item in siteList.mergeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-input
          v-model="condiction.houseId"
          :placeholder="configName.HOUSEID"
          :maxlength="configName.MAXLENGTH"
          class="input-style"
        ></el-input>
        <garden-Input ref="gardenInput" @pushGardenName="getGardenName"></garden-Input>
        <el-row class="button-left">
          <el-button type="primary" @click="query">{{configName.QUERY}}</el-button>
          <el-button @click="reset">{{configName.RESET}}</el-button>
        </el-row>
      </div>
      <div class="condiction-bar">
        <div class="time-selecter">
          <span>{{configName.CREATDATE}}</span>
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
        <div class="time-selecter">
          <span>{{configName.DATANAME}}</span>
          <el-date-picker
            style="width:272px"
            value-format="yyyy-MM-dd"
            type="daterange"
            v-model="creatTime"
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
          <el-table-column
            prop="websiteHouseId"
            :label="configName.HOUSEID"
            :width="labelName.houseIdW"
          ></el-table-column>
          <el-table-column prop="mergeResult" :label="configName.MERGETYPE"></el-table-column>
          <el-table-column prop="regionName" :label="labelName.regionName"></el-table-column>
          <el-table-column prop="businessName" :label="configName.TRADE"></el-table-column>
          <el-table-column
            prop="gardenName"
            :label="labelName.gardenName"
            :width="labelName.gardenNameW"
          ></el-table-column>
          <el-table-column prop="totalPrice" :label="labelName.totalPrice"></el-table-column>
          <el-table-column prop="baseHouseSource" :label="configName.BASEFROM"></el-table-column>
          <el-table-column :label="labelName.mateSource">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.houseSource" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" :label="configName.CREATDATE" :width="labelName.timeW"></el-table-column>
          <el-table-column prop="modifyDate" :label="labelName.modifyDate" :width="labelName.timeW"></el-table-column>
          <!-- 暂时隐藏下架操作 -->
          <!-- <el-table-column :label="labelName.make" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="openDialog(scope.row)">{{configName.MAKEDOWN}}</el-button>
            </template>
          </el-table-column>-->
        </el-table>
      </div>
    </template>
    <!-- 弹出框 -->
    <template>
      <el-dialog
        width="450px"
        :title="configName.MAKEDOWN"
        class="undercarriage-body"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        @close="closeDialog"
      >
        <div class="dialog-content">
          <el-row>
            <el-col :span="8">
              <div class="item-title">{{configName.HOUSEID}}</div>
            </el-col>
            <el-col :span="16">
              <div class="item-text">{{dialogDetail.websiteHouseId}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="item-title">{{labelName.gardenName}}</div>
            </el-col>
            <el-col :span="16">
              <div class="item-text">{{dialogDetail.gardenName}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="item-title">
                <span class="red-star">＊</span>
                {{labelName.downReason}}
              </div>
            </el-col>
            <el-col :span="16">
              <div class="item-input">
                <el-select
                  v-model="dialogDetail.unshelveReason"
                  :placeholder="labelName.downReason"
                >
                  <el-option
                    v-for="item in siteList.reasonList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>

          <el-row v-if="dialogDetail.unshelveReason == 'OTHER'">
            <el-col :span="8">
              <div class="item-title">
                <span class="red-star">＊</span>
                {{labelName.downContent}}
              </div>
            </el-col>
            <el-col :span="16">
              <div class="item-input">
                <el-input
                  :placeholder="labelName.maxlength"
                  v-model="dialogDetail.desc"
                  :maxlength="configName.MAXLENGTH"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <div
            class="item-poster"
            v-if="showTip && dialogDetail.claimCount != 0"
          >提示1：此房源关联的认领展位为{{dialogDetail.claimCount}}个，下架后展位将一并下架。</div>
          <div
            class="item-poster font-red"
            v-if="showTip && dialogDetail.topCount != 0"
          >提示2：此房源关联的置顶房源为{{dialogDetail.topCount}}个，下架后将在当天24:00后取消置顶。</div>
        </div>
        <div class="dialog-button">
          <el-row>
            <el-button @click="closeDialog">{{configName.CANCEL}}</el-button>
            <el-button type="primary" @click="showListCommit">{{configName.CERTAIN}}</el-button>
          </el-row>
        </div>
      </el-dialog>
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
import API from "@/axios/api/manageAPI";
import getSite from "@/mixins/getSite"; // 引入mixin文件
import unshlve from "@/mixins/unshlve"; // 引入mixin文件
import { mapState } from "vuex";
export default {
  name: "showList",
  mixins: [getSite, unshlve],
  components: {
    gardenInput
  },
  data() {
    return {
      name: "showList",
      dialogFormVisible: false, // 控制弹出
      loading: true,
      checkTime: null,
      creatTime: null,
      resultList: [],

      result: {},
      condiction: {
        currentPage: 1,
        pageSize: 20,
        modifyDateLow: null,
        modifyDateHeigh: null,
        beginDate: null,
        endDate: null,
        city: "SHENZHEN",
        regionId: null,
        businessId: null,
        mergeType: null,
        houseId: null,
        gardenName: null
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
      if (this.creatTime) {
        this.condiction.modifyDateLow = this.creatTime[0];
        this.condiction.modifyDateHeigh = this.creatTime[1];
      }
      this.getListData(this.condiction);
    },
    //重置
    reset() {
      this.condiction = {
        currentPage: 1,
        pageSize: 20,
        modifyDateLow: null,
        modifyDateHeigh: null,
        beginDate: null,
        endDate: null,
        city: "SHENZHEN",
        regionId: null,
        businessId: null,
        mergeType: null,
        houseId: null,
        gardenName: null
      };
      this.checkTime = null;
      this.creatTime = null;
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
           
      API.onlineHouseSearch(val).then(function(result) {
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


