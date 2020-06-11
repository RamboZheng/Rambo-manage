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
        <garden-Input ref="gardenInput" @pushGardenName="getGardenName"></garden-Input>
        <el-input
          v-model="condiction.houseId"
          :placeholder="configName.HOUSEID"
          :maxlength="configName.MAXLENGTH"
          class="input-style"
        ></el-input>
        <el-input
          v-model="condiction.brokerName"
          :placeholder="labelName.brokerName"
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
          <span>{{labelName.startTopDate}}</span>
          <el-date-picker
            style="width:272px"
            value-format="yyyy-MM-dd"
            type="daterange"
            v-model="startTime"
            range-separator="~"
            :start-placeholder="configName.STARTTIME1"
            :end-placeholder="configName.ENDTIME1"
          ></el-date-picker>
        </div>
      </div>
      <div class="condiction-bar">
        <div class="time-selecter">
          <span>{{labelName.endTopDate}}</span>
          <el-date-picker
            style="width:272px"
            value-format="yyyy-MM-dd"
            type="daterange"
            v-model="endTime"
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
            :label="labelName.stickyHouseId"
            :width="labelName.stickyHouseIdW"
          ></el-table-column>
          <el-table-column prop="regionName" :label="labelName.regionName"></el-table-column>
          <el-table-column prop="businessName" :label="configName.TRADE"></el-table-column>
          <el-table-column
            prop="gardenName"
            :label="labelName.gardenName"
            :width="labelName.gardenNameW"
          ></el-table-column>
          <el-table-column prop="totalPrice" :label="labelName.totalPrice"></el-table-column>
          <el-table-column prop="brokerName" :label="labelName.stickyBrokerName"></el-table-column>
          <el-table-column prop="regionTopName" :label="labelName.regionTop"></el-table-column>
          <el-table-column prop="businessTopName" :label="labelName.businessTop"></el-table-column>
          <el-table-column prop="gardenTopName" :label="labelName.gardenTop"></el-table-column>
          <el-table-column prop="priceSection" :label="labelName.topPriceSection"></el-table-column>
          <el-table-column
            prop="startTopDate"
            :label="labelName.startTopDate"
            :width="labelName.timeW"
          ></el-table-column>
          <el-table-column prop="endTopDate" :label="labelName.endTopDate" :width="labelName.timeW"></el-table-column>
          <el-table-column :label="labelName.make" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.tonightExpire"
                @click="tongihtDown()"
                style="color: #878D99"
              >{{configName.DOWNSTICKY}}</el-button>
              <el-button type="text" v-else @click="openDialog(scope.row)">{{configName.DOWNSTICKY}}</el-button>
            </template>
          </el-table-column>
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
            v-if="dialogDetail.shortId"
          >提示：此房源存在关联的认领房源，房源ID为{{dialogDetail.shortId}}。</div>
        </div>
        <div class="dialog-button">
          <el-row>
            <el-button @click="closeDialog">{{configName.CANCEL}}</el-button>
            <el-button type="primary" @click="stickyListCommit">{{configName.CERTAIN}}</el-button>
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
  name: "stickyList",
  mixins: [getSite, unshlve],
  components: {
    gardenInput
  },
  data() {
    return {
      name: "stickyList",
      dialogFormVisible: false, // 控制弹出
      loading: true,
      startTime: null,
      endTime: null,
      resultList: [],
      result: {},
      condiction: {
        currentPage: 1,
        pageSize: 20,
        startDateSectionLow: null,
        startDateSectionHeigh: null,
        endDateSectionLow: null,
        endDateSectionHeigh: null,
        city: "SHENZHEN",
        regionId: null,
        businessId: null,
        gardenName: null,
        houseId: null,
        brokerId: null,
        brokerName: null
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
      if (this.startTime) {
        this.condiction.startDateSectionLow = this.startTime[0];
        this.condiction.startDateSectionHeigh = this.startTime[1];
      }
      if (this.endTime) {
        this.condiction.endDateSectionLow = this.endTime[0];
        this.condiction.endDateSectionHeigh = this.endTime[1];
      }
      this.getListData(this.condiction);
    },
    //重置
    reset() {
      this.condiction = {
        currentPage: 1,
        pageSize: 20,
        startDateSectionLow: null,
        startDateSectionHeigh: null,
        endDateSectionLow: null,
        endDateSectionHeigh: null,
        city: "SHENZHEN",
        regionId: null,
        businessId: null,
        gardenName: null,
        houseId: null,
        brokerId: null,
        brokerName: null
      };
      this.startTime = null;
      this.endTime = null;
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
           
      API.topHouseSearch(val).then(function(result) {
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
.condiction-bar {
  display: inline-block;
  margin-right: 10px;
}
</style>


