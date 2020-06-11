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
          <el-table-column
            prop="websiteHouseId"
            :label="labelName.stickyHouseId"
            :width="labelName.stickyHouseIdW"
          ></el-table-column>
          <el-table-column
            prop="gardenName"
            :label="labelName.gardenName"
            :width="labelName.gardenNameW"
          ></el-table-column>
          <el-table-column prop="totalPrice" :label="labelName.totalPrice"></el-table-column>
          <el-table-column prop="brokerName" :label="labelName.belongBoker"></el-table-column>
          <el-table-column
            prop="unshelveDate"
            :label="configName.UNDERTIME"
            :width="labelName.timeW"
          ></el-table-column>
          <el-table-column prop="unshelveReason" :label="labelName.downReason"></el-table-column>
          <el-table-column prop="operatorName" :label="labelName.operatorName"></el-table-column>
          <el-table-column class="top-th" prop="make" :label="labelName.make">
            <template slot-scope="scope">
              <el-button type="text" @click="openDialog(scope.row)">{{labelName.checkDetail}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>

    <!-- 弹出详情 -->
    <template>
      <el-dialog
        width="1114"
        class="dialog-detail"
        :title="labelName.checkDetail"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        v-if="showDetail"
        @close="closeDeatil"
      >
        <div class="tab-block">
          <el-radio-group v-model="activeName" style="margin:22px 0">
            <el-radio-button label="housePic">房源图片</el-radio-button>
            <el-radio-button label="around">周边配套</el-radio-button>
          </el-radio-group>
          <div v-if="activeName == 'housePic'">
            <el-tabs v-model="picType" @tab-click="changePicType">
              <el-tab-pane
                v-for="item in picTabs"
                :label="item[0].imageType+'('+ item.length +')'"
                :name="item[0].imageType"
                :key="item[0].imageType"
              ></el-tab-pane>
            </el-tabs>
            <!-- 详情swiper -->
            <el-carousel
              trigger="click"
              height="340px"
              width="510px"
              :autoplay="false"
              class="swiper-box"
              indicator-position="inside"
            >
              <el-carousel-item v-for="item in picList" :key="item.url">
                <img
                  :src="item.url"
                  class="swiper-img"
                  style="width:80%;height:100%;margin-left:10%"
                />
              </el-carousel-item>
            </el-carousel>
          </div>

          <div v-if="activeName == 'around'">
            <bd-Map
              v-if="mateDetail.gardenLatitude"
              :gardenLatitude="mateDetail.gardenLatitude"
              :gardenLongitude="mateDetail.gardenLongitude"
            ></bd-Map>
          </div>
        </div>

        <div class="block-title">{{labelName.houseBaseInfo}}</div>
        <div class="detail-block">
          <el-row>
            <el-col :span="12">
              <div class="grid-content info-item">
                {{labelName.houseTitle}}：
                <span class="answer-item">{{mateDetail.title}}</span>
              </div>
              <div class="grid-content info-item">
                {{labelName.houseTotalPrice}}：
                <span class="answer-item">{{mateDetail.price}}万元</span>
              </div>
              <div class="grid-content info-item">
                {{configName.GARDENNAME}}：
                <span class="answer-item">{{mateDetail.gardenName}}</span>
              </div>
              <div class="grid-content info-item">
                {{labelName.madeYear}}：
                <span class="answer-item">{{mateDetail.maxBuiltYear}}年建</span>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content info-item">
                {{configName.TIMENAME}}：
                <span class="answer-item">{{mateDetail.modifyDate}}</span>
              </div>
              <div class="grid-content info-item">
                {{labelName.houseAveragePrice}}：
                <span
                  class="answer-item"
                >{{mateDetail.averPrice}}元/㎡</span>
              </div>
              <div class="grid-content info-item">
                {{labelName.locatedRrgion}}：
                <span
                  class="answer-item"
                >{{mateDetail.regionName}} - {{mateDetail.businessName}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 标签 -->
        <div class="detail-block" v-if="mateDetail.tags && mateDetail.tags.length>0">
          <div class="block-title">{{labelName.houseFeature}}</div>
          <el-tag
            color="#464B5B"
            style="color:#FFF;border:none;margin-top:20px"
            v-for="item in mateDetail.tags"
            :key="item"
          >{{item}}</el-tag>
        </div>
        <div class="block-title">{{labelName.houseDetailInfo}}</div>
        <div class="detail-block">
          <el-row>
            <el-col :span="8">
              <div class="grid-content info-item">{{labelName.baseProperty}}</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content info-item">
                {{labelName.houseType}}：
                <span
                  class="answer-item"
                >{{mateDetail.bedRoom?mateDetail.bedRoom+'室':""}}{{mateDetail.livingRoom?mateDetail.livingRoom+"厅":""}}{{mateDetail.kitchen?mateDetail.kitchen+"厨":""}}{{mateDetail.bathRoom?mateDetail.bathRoom+'卫':""}}</span>
              </div>

              <div class="grid-content info-item">
                {{labelName.houseArea}}：
                <span class="answer-item">{{mateDetail.buildArea}}㎡</span>
              </div>

              <div class="grid-content info-item">
                {{labelName.roomLayout}}：
                <span
                  class="answer-item"
                >{{mateDetail.roomPatternStructure}}</span>
              </div>

              <div class="grid-content info-item">
                {{labelName.houseDecorate}}：
                <span class="answer-item">{{mateDetail.decoration}}</span>
              </div>
            </el-col>

            <el-col :span="8">
              <div class="grid-content info-item">
                {{labelName.houseFloor}}：
                <span
                  class="answer-item"
                >{{mateDetail.floorName}}/{{mateDetail.totalFloor}}层</span>
              </div>

              <div class="grid-content info-item">
                {{labelName.realArea}}：
                <span class="answer-item">{{mateDetail.roomArea}}㎡</span>
              </div>

              <div class="grid-content info-item">
                {{labelName.houseDirection}}：
                <span class="answer-item">{{mateDetail.direction}}</span>
              </div>

              <div class="grid-content info-item">
                {{labelName.haveElevator}}：
                <span class="answer-item">{{mateDetail.hasElevator}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content info-item">{{labelName.dealProperty}}</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content info-item">
                {{labelName.quotedTime}}：
                <span
                  class="answer-item"
                >{{mateDetail.listingDate?mateDetail.listingDate:'未知'}}</span>
              </div>

              <div class="grid-content info-item">
                {{labelName.mortgageInfo}}：
                <span
                  class="answer-item"
                >{{mateDetail.pledgeInfo?mateDetail.pledgeInfo:"未知"}}</span>
              </div>
            </el-col>

            <el-col :span="8">
              <div class="grid-content info-item">
                {{labelName.houseUse}}：
                <span class="answer-item">{{mateDetail.propertyUseType}}</span>
              </div>

              <div class="grid-content info-item">
                {{labelName.houseAge}}：
                <span class="answer-item">{{mateDetail.roomPeriod}}</span>
              </div>
            </el-col>
          </el-row>
          <div
            class="detail-tip"
            style="padding-top:30px;font-size: 16px;color: #CBCBCB;"
          >{{labelName.underTip}}</div>
        </div>
        <div class="block-title">{{labelName.quotedChangeHis}}</div>
        <!-- 详情价格 -->
        <div class="his-title">{{labelName.quotedPrice}}</div>
        <div class="top-price" v-for="(item,index) in priceList" :key="index">
          <div v-if="item.length >0">
            <el-col :span="18">
              <img v-if="item[0].source=='链家'" src="@/assets/image/icon-lianjia@2x.png" />
              <img v-if="item[0].source=='乐有家'" src="@/assets/image/icon-leyoujia@2x.png" />
              <img v-if="item[0].source=='Q房'" src="@/assets/image/icon-Qfang@2x.png" />
              <img v-if="item[0].source=='中原'" src="@/assets/image/icon-zhongyuan@2x.png" />
              <div class="price-name">{{item[0].source}}</div>
            </el-col>
            <el-col :span="6">
              <div class="price-num">{{item[0].price}}万元</div>
            </el-col>
          </div>
        </div>

        <div class="his-title">{{labelName.priceChangeHis}}</div>
        <div class="block">
          <!-- 防止价格节点顶出 -->
          <div>&nbsp;</div>
          <!-- 打开显示 -->
          <el-timeline v-if="reverse && simplePrice" style="padding: 0;">
            <el-timeline-item
              v-for="(item, index) in simplePrice"
              :key="index"
              color="#6595F4"
              :timestamp="item.changePriceDate"
            >{{item.source}}:&nbsp;&nbsp;{{item.price}}万元</el-timeline-item>
          </el-timeline>
          <!-- 展开全部 -->
          <el-timeline v-else style="padding: 0;">
            <el-timeline-item
              v-for="(item, index) in housePriceRecords"
              :key="index"
              color="#6595F4"
              :timestamp="item.changePriceDate"
            >{{item.source}}:&nbsp;&nbsp;{{item.price}}万元</el-timeline-item>
          </el-timeline>
        </div>
        <div class="show-more" v-if="reverse" @click="showMore">展开更多</div>

        <div id="totalMate" style="width: 100%;height:350px"></div>

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
import bdMap from "@/components/content/bdMap";
import API from "@/axios/api/underListAPI";
import { mapState } from "vuex";
export default {
  name: "underPosition",
  components: {
    bdMap
  },
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
      },
      //详情价格图标
      priceIcon: {
        lianjia: "@/assets/image/icon-lianjia@2x.png",
        leyoujia: "@/assets/image/icon-leyoujia@2x.png",
        qfang: "@/assets/image/icon-Qfang@2x.png",
        zhongyuan: "@/assets/image/icon-zhongyuan@2x.png"
      },
      reverse: false, // 是否展示简易时间线
      simplePrice: [], // 简易时间线
      housePriceRecords: [], // 完成时间线
      priceList: [], //
      picList: [], // 轮播图列表
      picTabs: [], // 图片数量标签页
      showDetail: false, // 控制详情页面的展出
      picType: "keting", // 详情图片类型
      itemDetail: {}, // 当前横栏详情
      houseDetailVos: [],
      mateDetail: {}, // 匹配详情
      activeName: "housePic",
      dialogFormVisible: false //高级查询模态
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
        unshelveType: null,
        brokerName: null,
        unshelveReason: null,
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
           
      API.topHouseUnshelveRecordSearch(val).then(function(result) {
        if (result.data) {
          ctx.result = result.data;
          ctx.resultList = result.data.items;
        }
        ctx.loading = false;
      });
    },
    // 查看详情的方法
    //查看详情
    openDialog(row) {
      this.itemDetail = row;
      this.picTabs = [];
      let ctx = this,
        { ...parme } = {
          websiteHouseId: this.itemDetail.websiteHouseId
        };
      API.houseDetailQuery(parme).then(function(result) {
        ctx.mateDetail = result.data.house;
        ctx.picTabs = result.data.houseImagesList;
        ctx.picList = result.data.houseImagesList[0];
        ctx.housePriceRecords = result.data.housePriceRecords;
        ctx.priceFilter(result.data.housePriceRecords);
      });
      this.showDetail = true;
      this.dialogFormVisible = true;
    },
    closeDeatil() {
      this.showDetail = false;
    },
    showMore() {
      this.reverse = false;
    },
    // 切换图片
    changePicType(val) {
      for (let item of this.picTabs) {
        if (item[0].imageType == val.name) {
          this.picList = item;
          break;
        }
      }
    },
    // 价格变动数据整理
    priceFilter(list) {
      let arr = {
        leyoujia: [],
        lianjia: [],
        zhongyuan: [],
        qfang: []
      };
      // 时间线长度大于3的时候生成简易时间线
      if (list.length > 3) {
        this.simplePrice = list.slice(0, 2);
        this.simplePrice.push(list.pop());
        this.reverse = true;
      }
      // 折线图变量初始化
      let lineList = [
        {
          name: "乐有家",
          type: "line",
          stack: "总量",
          data: []
        },
        {
          name: "链家",
          type: "line",
          stack: "总量",
          data: []
        },
        {
          name: "中原",
          type: "line",
          stack: "总量",
          data: []
        },
        {
          name: "Q房",
          type: "line",
          stack: "总量",
          data: []
        }
      ];
      let timeList = [];
      // 过滤生成来源纬度的价格变动列表
      for (let item of list) {
        if (item.source == "乐有家") {
          arr.leyoujia.push(item);
        } else if (item.source == "链家") {
          arr.lianjia.push(item);
        } else if (item.source == "中原") {
          arr.zhongyuan.push(item);
        } else if (item.source == "Q房") {
          arr.qfang.push(item);
        }
        // 截取时间数组
        if (
          item.changePriceDate.slice(5, 10) != timeList[timeList.length - 1]
        ) {
          timeList.push(item.changePriceDate.slice(5, 10));
        }
      }
      // 过滤数组生成折线图数据
      lineList[0].data = this.lineArrFilter(timeList, list, lineList[0].name);
      lineList[1].data = this.lineArrFilter(timeList, list, lineList[1].name);
      lineList[2].data = this.lineArrFilter(timeList, list, lineList[2].name);
      lineList[3].data = this.lineArrFilter(timeList, list, lineList[3].name);
      this.priceList = JSON.parse(JSON.stringify(arr));
      this.initEchart(lineList, timeList);
    },
    // 数据过滤器生成折线图数据
    lineArrFilter(timeList, list, name) {
      let lineArr = new Array(timeList.length).fill(""); // 生成与时间轴长度相同的空字符串数组
      for (let i = 0; i <= timeList.length; i++) {
        for (let n = 0; n <= list.length; n++) {
          // 遍历时间数组和变动信息总数组，符合条件的数值则替换当前数组索引下空值
          if (
            list[n] &&
            list[n].changePriceDate.slice(5, 10) == timeList[i] &&
            list[n].source == name
          ) {
            lineArr.splice(i, 1, list[n].price);
          }
        }
      }
      //输出数组
      return lineArr;
    },
    // echart
    initEchart(list, timeList) {
      // 引入 ECharts 主模块
      var echarts = require("echarts/lib/echarts");
      // 引入柱状图
      require("echarts/lib/chart/line");
      require("echarts/lib/component/tooltip");
      require("echarts/lib/component/grid");
      require("echarts/lib/component/legend");
      // 基于准备好的dom，初始化echarts实例
      var totalMate = echarts.init(document.getElementById("totalMate"));
      // 绘制图表
      totalMate.setOption({
        tooltip: {
          trigger: "item", // 触发类型
          formatter: "{a}<br/> {b}：{c}万元"
        },
        grid: {
          top: 20,
          bottom: 50,
          left: "0",
          right: "2%",
          containLabel: true
        },
        legend: {
          orient: "vertical",
          left: "center",
          bottom: "bottom",
          data: ["乐有家", "链家", "中原", "Q房"]
        },
        xAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#878D99",
            fontSize: 14,
            margin: 20
          },
          data: timeList
        },
        yAxis: {
          nameTextStyle: {
            color: "#000",
            align: "left",
            fontFamily: "PingFangSC-Regular"
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#CCC"
            }
          },
          axisLabel: {
            color: "#878D99",
            fontSize: 14,
            formatter: "{value} 万元",
            margin: 20
          }
        },
        series: list
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>


