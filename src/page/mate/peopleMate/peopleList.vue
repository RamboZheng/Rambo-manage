<template>
  <div class="page combine-page">
    <!-- 顶部筛选栏 -->
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
        <div class="common-selecter">
          <el-select v-model="condiction.mergeStatus" :placeholder="configName.STATUS">
            <el-option
              v-for="item in siteList.mateStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="common-selecter">
          <el-select v-model="condiction.matchResult" :placeholder="configName.RESULT">
            <el-option
              v-for="item in siteList.resultList"
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
      </div>
      <div class="condiction-bar">
        <el-input
          v-model="condiction.houseId"
          :placeholder="configName.BASEHOUSEID"
          :maxlength="configName.MAXLENGTH"
          class="input-style"
        ></el-input>
        <el-input
          v-model="condiction.websiteHouseId"
          :placeholder="configName.OUTSHOWID"
          :maxlength="configName.MAXLENGTH"
          class="input-style"
        ></el-input>
        <garden-Input ref="gardenInput" @pushGardenName="getGardenName"></garden-Input>
        <div class="time-selecter">
          <span>{{labelName.houseSourceDate}}</span>
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
    <!-- 列表table -->
    <template>
      <div class="table">
        <el-table ref="OrderTable" v-loading="loading" :data="resultList">
          <el-table-column fixed="left" :label="labelName.number" width="80">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="crawlCode" :label="configName.BASEHOUSEID"></el-table-column>
          <el-table-column prop="websiteHouseId" :label="configName.OUTSHOWID"></el-table-column>
          <el-table-column prop="baseHouseSource" :label="configName.BASEFROM"></el-table-column>

          <el-table-column prop="regionName" :label="labelName.regionName"></el-table-column>
          <el-table-column prop="businessName" :label="configName.TRADE"></el-table-column>
          <el-table-column
            prop="gardenName"
            :label="labelName.gardenName"
            :width="labelName.gardenNameW"
          ></el-table-column>

          <el-table-column prop="mergeHouseCount" :label="labelName.totalMergeHouseCount"></el-table-column>

          <el-table-column :label="labelName.mateSource">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.houseSource" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="mergeStatus" :label="configName.STATUS"></el-table-column>
          <el-table-column prop="matchResult" :label="configName.RESULT"></el-table-column>
          <el-table-column
            prop="houseSourceDate"
            :label="labelName.houseSourceDate"
            :width="labelName.timeW"
          ></el-table-column>
          <el-table-column
            prop="houseMergedDate"
            :label="configName.MATETIME"
            :width="labelName.timeW"
          ></el-table-column>
          <el-table-column prop="operatorName" :label="labelName.operatorName"></el-table-column>
          <el-table-column class="top-th" prop="make" :label="labelName.make">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="openDialog(scope.row)"
              >{{scope.row.mergeStatus =='未匹配'?configName.PEOPLEMATE:labelName.checkDetail}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <!-- 弹出详情 -->
    <template>
      <el-dialog
        max-width="1114"
        class="dialog-detail"
        :title="configName.PEOPLEMATEDETAIL"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        @close="hideDetail"
      >
        <div class="dialog-title">{{labelName.mateInfo}}</div>
        <div class="detail-block">
          <el-row>
            <el-col :span="12">
              <div class="grid-content info-item">
                {{configName.BASEFROM}}：
                <span class="answer-item">{{itemDetail.baseHouseSource}}</span>
              </div>
              <div class="grid-content info-item">
                {{labelName.mateStatus}}：
                <span class="answer-item">{{itemDetail.mergeStatus}}</span>
              </div>
              <div class="grid-content info-item">
                {{configName.MATETIME}}：
                <span class="answer-item">{{itemDetail.houseMergedDate}}</span>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content info-item">
                {{labelName.regionTrade}}：
                <span
                  class="answer-item"
                >{{itemDetail.regionName}}-{{itemDetail.businessName}}</span>
              </div>
              <div class="grid-content info-item">
                {{labelName.houseSourceDate}}：
                <span
                  class="answer-item"
                >{{itemDetail.houseSourceDate}}</span>
              </div>
              <div class="grid-content info-item">
                {{labelName.operatorName}}：
                <span class="answer-item">{{itemDetail.operatorName}}</span>
              </div>
            </el-col>
          </el-row>
          <div class="dialog-title">
            <span class="red-star">＊</span>
            <div class="check-name">{{labelName.materResult}}</div>
            <div v-if="itemDetail.mergeStatus == '未匹配'" style="display:inline-block">
              <el-checkbox
                class="check-box"
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                v-if="mateDetail.houseMergedVos && mateDetail.houseMergedVos.length>1"
              >全选</el-checkbox>
              <el-checkbox-group
                class="check-group"
                v-model="mateList"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="item in mateDetail.houseMergedVos"
                  :key="item.houseId"
                  :label="item"
                >{{item.source}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="itemDetail.mergeStatus == '已匹配'" style="display:inline-block">
              <div
                class="chcek-title"
                v-for="item in mateDetail.houseMergedVos"
                :key="item.houseId"
              >{{item.source}}</div>
            </div>
          </div>
        </div>
        <div class="dialog-title">{{labelName.checkPic}}</div>
        <div class="swiper-block">
          <el-tabs v-model="activeName">
            <el-tab-pane label="查看室内图" name="indoor">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div
                    class="pic-title"
                  >{{labelName.baseHouseSource}}：{{itemDetail.baseHouseSource}}</div>
                  <el-carousel
                    trigger="click"
                    height="340px"
                    width="510px"
                    :autoplay="false"
                    class="swiper-box"
                    indicator-position="inside"
                  >
                    <el-carousel-item v-for="item in baseImage.homeImages" :key="item.url">
                      <img :src="item.url" class="swiper-img" style="width:100%;height:100%" />
                    </el-carousel-item>
                  </el-carousel>
                </el-col>
                <el-col :span="12">
                  <div class="pic-title">
                    {{labelName.mateHouseSource}}:
                    <el-radio
                      @change="chooseType"
                      v-model="radioName"
                      v-for="item in radioList"
                      :key="item.houseId"
                      :label="item.houseId"
                      :value="item.houseId"
                    >{{item.houseSource}}</el-radio>
                  </div>
                  <el-carousel
                    trigger="click"
                    height="340px"
                    width="510px"
                    :autoplay="false"
                    style="margin-top:10px"
                    indicator-position="inside"
                  >
                    <el-carousel-item v-for="item in houseImage.homeImages" :key="item.url">
                      <img :src="item.url" class="swiper-img" style="width:100%;height:100%" />
                    </el-carousel-item>
                  </el-carousel>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="查看户型图" name="pattern">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div
                    class="pic-title"
                  >{{labelName.baseHouseSource}}：{{itemDetail.baseHouseSource}}</div>
                  <el-carousel
                    trigger="click"
                    height="340px"
                    width="510px"
                    :autoplay="false"
                    class="swiper-box"
                    indicator-position="inside"
                  >
                    <el-carousel-item v-for="item in baseImage.housePatternImages" :key="item.url">
                      <img :src="item.url" style="width:100%;height:100%" />
                    </el-carousel-item>
                  </el-carousel>
                </el-col>
                <el-col :span="12">
                  <div class="pic-title">
                    {{labelName.mateHouseSource}}:
                    <el-radio
                      @change="chooseType"
                      v-model="radioName"
                      v-for="item in radioList"
                      :key="item.houseId"
                      :label="item.houseId"
                      :value="item.houseId"
                    >{{item.houseSource}}</el-radio>
                  </div>
                  <el-carousel
                    trigger="click"
                    height="340px"
                    width="510px"
                    :autoplay="false"
                    class="swiper-box"
                    indicator-position="inside"
                  >
                    <el-carousel-item v-for="item in houseImage.housePatternImages" :key="item.url">
                      <img :src="item.url" style="width:100%;height:100%" />
                    </el-carousel-item>
                  </el-carousel>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
        <template>
          <div class="table">
            <el-table
              ref="OrderTable"
              max-height="328"
              v-loading="loading"
              :data="houseDetailVos"
              :row-class-name="tableRowClassName"
            >
              <el-table-column :label="labelName.mateSource">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.houseSource" :key="index">{{item}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="gardenName"
                :label="labelName.gardenName"
                :width="labelName.gardenNameW"
              ></el-table-column>
              <el-table-column prop="totalPrice" :label="labelName.totalPrice"></el-table-column>
              <el-table-column :label="labelName.roomType" width="160">
                <template
                  slot-scope="scope"
                >{{scope.row.bedRoom?scope.row.bedRoom+'室':""}}{{scope.row.livingRoom?scope.row.livingRoom+'厅':""}}{{scope.row.kitchen?scope.row.kitchen+'厨':""}}{{scope.row.bathRoom?scope.row.bathRoom+'卫':""}}</template>
              </el-table-column>

              <el-table-column prop="buildArea" :label="labelName.buildArea"></el-table-column>
              <el-table-column prop="roomArea" :label="labelName.roomArea" width="120"></el-table-column>

              <el-table-column prop="direction" :label="labelName.direction"></el-table-column>
              <el-table-column prop="floorName" :label="labelName.floorName"></el-table-column>
              <el-table-column prop="totalFloor" :label="labelName.totalFloor"></el-table-column>
              <el-table-column prop="decoration" :label="labelName.decoration"></el-table-column>
              <el-table-column prop="totalGrade" :label="labelName.totalGrade"></el-table-column>
              <el-table-column prop="make" :label="labelName.make" fixed="right">
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
        <div v-if="itemDetail.mergeStatus == '未匹配'">
          <el-row style="width:20%;margin:0 auto">
            <el-button @click="cancel">{{configName.CANCEL}}</el-button>
            <el-button type="primary" @click="commitMate">{{configName.CERTAIN}}</el-button>
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
import API from "@/axios/api/mateAPI";
import getSite from "@/mixins/getSite"; // 引入mixin文件
import { mapState } from "vuex";
export default {
  name: "peopleList",
  mixins: [getSite],
  components: {
    gardenInput
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      loading: true,
      dialogFormVisible: false, //高级查询模态
      radioName: "",
      radioList: [],
      checkTime: null,
      itemDetail: {}, // 当前横栏详情
      houseDetailVos: [],
      mateDetail: {}, // 匹配详情
      resultList: [],
      baseImage: {}, // 基准房源图片
      houseImage: {}, // 匹配房源图片
      activeName: "indoor",
      result: {},
      condiction: {
        currentPage: 1,
        pageSize: 20,
        beginDate: null,
        endDate: null,
        city: "SHENZHEN",
        regionId: null,
        businessId: null,
        baseHouseSource: null,
        matchResult: null,
        mergeStatus: null,
        houseId: null,
        gardenName: null,
        websiteHouseId: null
      },
      mateList: [],
      mateResult: {}
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
    // 匹配结果的全选与单选
    handleCheckAllChange(val) {
      this.mateList = val ? this.mateDetail.houseMergedVos || "" : [];
      this.isIndeterminate = false;
    },
    // 点击全选
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.mateDetail.houseMergedVos.length;
      this.isIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.mateDetail.houseMergedVos.length;
    },

    //查询
    query() {
      this.condiction.currentPage = 1;
      if (this.checkTime) {
        this.condiction.beginDate = this.checkTime[0];
        this.condiction.endDate = this.checkTime[1];
      }
      this.getListData(this.condiction);
    },
    //高级查询取消
    cancel() {
      this.dialogFormVisible = false;
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
        matchResult: null,
        baseHouseSource: null,
        mergeStatus: null,
        houseId: null,
        gardenName: null,
        websiteHouseId: null
      };
      this.checkTime = null;
      this.$refs.gardenInput.resetGardenName();
      this.getListData(this.condiction);
    },
    jumpPath(path) {
      window.open(path, "_blank").location;
    },
    // 获取子组件传来的小区名称
    getGardenName(data) {
      this.condiction.gardenName = data;
    },
    // 获取单行样式
    tableRowClassName(columnIndex) {
      if (columnIndex.rowIndex === 0) {
        return "yellow-item";
      }
    },
    // 选中图片类型
    chooseType(tab, event) {
      let houseId = tab || "";
      this.imagesQuery(houseId, false);
    },
    openDialog(row) {
      this.baseImage = {}; // 基准房源图片历史清空
      this.houseImage = {}; // 匹配房源图片历史清空
      this.itemDetail = row;

      let { ...parme } = {
          houseId: this.itemDetail.houseId || "",
          baseHouseSource: this.itemDetail.baseHouseSource || ""
        },
        ctx = this;
      API.manualMergedHouseDetailQuery(parme).then(function(result) {
        ctx.mateDetail = result.data || "";
        ctx.houseDetailVos = result.data.mergeHouseDetailVos || "";

        //获取基准图片
        let mergeHouseDetailVos = result.data.mergeHouseDetailVos[0];
        ctx.imagesQuery(mergeHouseDetailVos.houseId, true);
        // 深拷贝
        ctx.radioList = JSON.parse(JSON.stringify(ctx.houseDetailVos));
        ctx.radioList.splice(0, 1);
        // 获取匹配图片
        ctx.radioName = ctx.radioList[0].houseId;
        ctx.imagesQuery(ctx.radioName, false);
      });
      this.dialogFormVisible = true;
    },
    imagesQuery(houseId, basePic) {
      let { ...parme } = {
          houseId: houseId || ""
        },
        ctx = this;
      API.houseImagesQuery(parme).then(function(result) {
        if (basePic && result.data) {
          ctx.baseImage = result.data;
        } else if (!basePic && result.data) {
          ctx.houseImage = result.data;
        }
      });
      this.dialogFormVisible = true;
    },
    // 提交匹配操作
    commitMate() {
      this.mateResult.houseIds = [];
      let sourceList = [],
        houseIdList = [],
        commitTip = "匹配结果为空，确认提交吗？",
        ctx = this;
      for (let item of this.mateList) {
        sourceList.push(item.source);
        houseIdList.push(item.houseId);
      }
      if (sourceList.length !== 0) {
        commitTip = "匹配结果为" + sourceList + "，确认提交吗？";
      }
      houseIdList.push(this.itemDetail.houseId);
      this.mateResult.houseIds = houseIdList;
      this.mateResult.operatorId = this.itemDetail.operatorName || "yves";
      this.$confirm(`${commitTip}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        API.saveManualMergedHouse(this.mateResult).then(function(result) {
          if (result.success) {
            ctx.$message({
              type: "success",
              message: "操作成功!"
            });
            ctx.dialogFormVisible = false;
            ctx.mateList = []; // 置空选项数组
            ctx.getListData(ctx.condiction);
          } else {
            ctx.$message({
              type: "fail",
              message: "匹配失败，请稍后再试!"
            });
          }
        });
      });
    },
    // 关闭详情
    hideDetail() {
      this.activeName = "indoor"; // 关闭详情回到展示室内图
      this.mateList = []; // 置空选项数组
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
      API.manualMergeHouseSearch(val).then(function(result) {
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
<style lang='scss'>
.dialog-detail {
  .dialog-title {
    padding-top: 20px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #475266;
    .check-name {
      color: #475266;
      font-weight: 600;
      display: inline-block;
      font-weight: 400;
      margin-right: 20px;
    }
    .check-box {
      display: inline-block;
    }
    .check-group {
      display: inline-block;
      margin-left: 20px;
    }
    .chcek-title {
      display: inline-block;
      margin-right: 20px;
      font-size: 14px;
      color: #878d99;
    }
  }
  .detail-block {
    padding-bottom: 20px;
    border-bottom: 1px solid#EDEFF0;
  }
  .swiper-block {
    margin-top: 20px;
    .swiper-box {
      margin-top: 10px;
    }
  }
  .dialog-remark {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #878d99;
    text-align: left;
    padding-top: 11px;
  }
}
.el-table .yellow-item {
  background-color: RGB(241, 200, 92);
}
.info-item {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #878d99;
  line-height: 20px;
  margin-top: 20px;
  .answer-item {
    color: #475266;
    line-height: 20px;
  }
}
</style>


