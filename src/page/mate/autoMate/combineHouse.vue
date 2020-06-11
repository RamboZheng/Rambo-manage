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
          <el-select v-model="condiction.houseSource" :placeholder="configName.BASEFROM">
            <el-option
              v-for="item in siteList.baseSource"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-row class="button-left">
          <el-button type="primary" @click="query">{{configName.QUERY}}</el-button>
          <el-button @click="reset">{{configName.RESET}}</el-button>
        </el-row>
        <el-input
          v-model="condiction.websiteHouseId"
          :placeholder="configName.HOUSEID"
          :maxlength="configName.MAXLENGTH"
          class="input-style"
        ></el-input>
        <garden-Input ref="gardenInput" @pushGardenName="getGardenName"></garden-Input>
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
          <span>{{configName.TIMENAME}}</span>
          <el-date-picker
            style="width:272px"
            value-format="yyyy-MM-dd"
            v-model="updateTime"
            type="daterange"
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
          <el-table-column prop="baseHouseSource" :label="labelName.baseHouseSource"></el-table-column>
          <el-table-column prop="regionName" :label="labelName.regionName"></el-table-column>
          <el-table-column prop="businessName" :label="configName.TRADE"></el-table-column>
          <el-table-column
            prop="gardenName"
            :label="labelName.gardenName"
            :width="labelName.gardenNameW"
          ></el-table-column>
          <el-table-column prop="totalPrice" :label="labelName.totalPrice"></el-table-column>
          <el-table-column prop="mergeRatio" :label="labelName.mergeRatio"></el-table-column>
          <el-table-column :label="labelName.houseSource">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.houseSource" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" :label="configName.CREATDATE" :width="labelName.timeW"></el-table-column>
          <el-table-column prop="modifyDate" :label="labelName.modifyDate" :width="labelName.timeW"></el-table-column>

          <el-table-column prop="make" :label="labelName.make">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="openDialog(scope.row.houseId,scope.row.baseHouseSource)"
              >{{labelName.checkDetail}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template>
      <el-dialog
        width="75%"
        :title="labelName.checkDetail"
        class="dialog-body"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
      >
        <template>
          <div class="table">
            <el-table ref="OrderTable" v-loading="loading" :data="detailList">
              <el-table-column :label="labelName.houseSource" width="80">
                <template slot-scope="scope">{{scope.row.houseSource}}</template>
              </el-table-column>

              <el-table-column
                prop="gardenName"
                :label="labelName.gardenName"
                :width="labelName.gardenNameW"
              ></el-table-column>
              <el-table-column prop="totalPrice" :label="labelName.totalPrice" width="60"></el-table-column>

              <el-table-column :label="labelName.roomType" width="160">
                <template
                  slot-scope="scope"
                >{{scope.row.bedRoom?scope.row.bedRoom+'室':""}}{{scope.row.livingRoom?scope.row.livingRoom+'厅':""}}{{scope.row.kitchen?scope.row.kitchen+'厨':""}}{{scope.row.bathRoom?scope.row.bathRoom+'卫':""}}</template>
              </el-table-column>
              <el-table-column prop="buildArea" :label="labelName.buildArea"></el-table-column>
              <el-table-column prop="roomArea" :label="labelName.roomArea"></el-table-column>
              <el-table-column prop="direction" :label="labelName.direction"></el-table-column>
              <el-table-column prop="floorName" :label="labelName.floorName"></el-table-column>
              <el-table-column prop="totalFloor" :label="labelName.totalFloor"></el-table-column>
              <el-table-column prop="decoration" :label="labelName.decoration"></el-table-column>
              <el-table-column prop="totalGrade" :label="labelName.totalGrade"></el-table-column>

              <el-table-column prop="make" :label="labelName.make">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="jumpPath(scope.row.houseSourceUrl)"
                  >{{configName.TOURL}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <div class="dialog-remark">{{configName.STARCAUTION}}</div>
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
import API from "@/axios/api/mateAPI";
import getSite from "@/mixins/getSite"; // 引入mixin文件
import { mapState } from "vuex";
export default {
  name: "combineHouse",
  mixins: [getSite],
  components: {
    gardenInput
  },
  data() {
    return {
      loading: true,
      updateTime: null,
      dialogFormVisible: false, //高级查询模态
      checkTime: null,
      result: {},
      resultList: [],
      detailList: [],
      // 筛选条件
      condiction: {
        currentPage: 1,
        pageSize: 20,
        beginDate: null,
        endDate: null,
        beginModifyDate: null,
        endModifyDate: null,
        gardenName: null,
        websiteHouseId: null,
        city: "SHENZHEN",
        regionId: null,
        businessId: null,
        baseHouseSource: null
      }
    };
  },
  mounted() {
    this.getListData(this.condiction);
  },
  methods: {
    //查询
    query() {
      this.condiction.currentPage = 1;
      // 更新时间
      if (this.updateTime) {
        this.condiction.beginModifyDate = this.updateTime[0];
        this.condiction.endModifyDate = this.updateTime[1];
      }
      // 创建时间
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
        beginModifyDate: null,
        endModifyDate: null,
        city: "SHENZHEN",
        regionId: null,
        gardenName: null,
        websiteHouseId: null,
        businessId: null,
        baseHouseSource: null
      };
      this.checkTime = null;
      this.updateTime = null;
      this.$refs.gardenInput.resetGardenName();
      this.getListData(this.condiction);
    },
    // 查看详情打开/关闭
    openDialog(id, from) {
      let detailParmes = {};
      detailParmes.houseId = id;
      detailParmes.baseHouseSource = from;
      this.getDetailData(detailParmes);
    },
    // 关闭详情
    queryCancel() {
      this.dialogFormVisible = false;
    },
    // 跳转链接
    jumpPath(path) {
      window.open(path, "_blank").location;
    },
    // 获取子组件传来的小区名称
    getGardenName(data) {
      this.condiction.gardenName = data;
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
    /*请求列表数据*/
    getListData: function(parmes) {
      const ctx = this;
      API.autoMergedHouseSearch(parmes).then(function(result) {
        if (result.data) {
          ctx.result = result.data;
          ctx.resultList = result.data.items;
        }
        ctx.loading = false;
      });
    },
    /*请求详情数据*/
    getDetailData: function(parmes) {
      const ctx = this;
      API.autoMergedHouseDetailQuery(parmes).then(function(result) {
        ctx.detailList = result.data;
        ctx.dialogFormVisible = true;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.dialog-remark {
  margin-top: 10px;
}
.second-item {
  background-color: #f1ba5c !important;
  opacity: 0.5;
}
</style>


