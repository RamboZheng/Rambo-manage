<template>
  <div id="app" class="total-data">
    <div class="total-title">概览数据统计</div>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="total-block">
          <el-row>
            <el-col :span="12">
              <div class="grid-content total-item">
                <img class="big-icon" src="@/assets/image/icon-overview-amount@2x.png" alt />
                <div class="big-icon-text">
                  总在线房源量（个）
                  <div>{{addCommas(totalData.houseCount || 0)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <div class="right-item">
                  <img class="mini-icon" src="@/assets/image/icon-merge-amount@2x.png" alt />
                  <div class="mini-icon-text">
                    合并房源量（个）
                    <div>{{addCommas(totalData.mergeCount || 0)}}</div>
                  </div>
                </div>
                <div class="right-item">
                  <img class="mini-icon" src="@/assets/image/icon-independent-amount@2x.png" alt />
                  <div class="mini-icon-text">
                    独立房源量（个）
                    <div>{{addCommas(totalData.independentCount || 0)}}</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="total-block">
          <el-row>
            <el-col :span="12">
              <div class="grid-content total-item">
                <div id="totalMate" style="width: 80px;height:80px;display:inline-block"></div>
                <div class="big-icon-text">
                  总匹配率（%）
                  <div>{{addCommas(mateData.houseMatchRate || 0)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <div class="right-item">
                  <div id="autoMate" style="width: 48px;height:48px;display:inline-block"></div>

                  <div class="mini-icon-text">
                    自动匹配率（%）
                    <div>{{addCommas(mateData.autoMatchRate || 0)}}</div>
                  </div>
                </div>
                <div class="right-item">
                  <div id="peopleMate" style="width: 48px;height:48px;display:inline-block"></div>
                  <div class="mini-icon-text">
                    人工匹配率（%）
                    <div>{{addCommas(mateData.manualMatchRate || 0)}}</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div class="total-bar">
      <el-row :gutter="0">
        <el-col :span="4">
          <div class="grid-content total-num">
            总认领房源量（个）
            <div>{{addCommas(totalData.houseClaimCount || 0)}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content total-num left-bar">
            总认领展位量（个）
            <div>{{addCommas(totalData.boothCount || 0)}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content total-num left-bar">
            总置顶房源量（个）
            <div>{{addCommas(totalData.houseTopCount || 0)}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content total-num left-bar">
            总下架房源量（个）
            <div>{{addCommas(totalData.unshelveCount || 0)}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content total-num left-bar">
            总下架置顶量（个）
            <div>{{addCommas(totalData.unshelveTopCount || 0)}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content total-num left-bar">
            总下架认领量（个）
            <div>{{addCommas(totalData.unshelveClaimCount || 0)}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="total-title">今日数据统计</div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="total-block">
          <el-row>
            <el-col :span="12">
              <div class="grid-content total-item">
                <img class="big-icon" src="@/assets/image/icon-today-amount@2x.png" alt />
                <div class="big-icon-text">
                  展示房源量（个）
                  <div>{{addCommas(todayData.houseCount || 0)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <div class="right-item">
                  <img class="mini-icon" src="@/assets/image/icon-merge-amount@2x.png" alt />
                  <div class="mini-icon-text">
                    合并房源量（个）
                    <div>{{addCommas(todayData.mergeCount || 0)}}</div>
                  </div>
                </div>
                <div class="right-item">
                  <img class="mini-icon" src="@/assets/image/icon-independent-amount@2x.png" alt />
                  <div class="mini-icon-text">
                    独立房源量（个）
                    <div>{{addCommas(todayData.independentCount || 0)}}</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div class="total-bar">
      <el-row :gutter="0">
        <el-col :span="4">
          <div class="grid-content total-num">
            抓取房源量（个）
            <div>{{addCommas(todayData.crawlHouseCount || 0)}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content total-num left-bar">
            认领房源量（个）
            <div>{{addCommas(todayData.houseClaimCount || 0)}}</div>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="grid-content total-num left-bar">
            置顶房源量（个）
            <div>{{addCommas(todayData.houseTopCount || 0)}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content total-num left-bar">
            下架房源量（个）
            <div>{{addCommas(todayData.unshelveCount || 0)}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content total-num left-bar">
            下架置顶量（个）
            <div>{{addCommas(todayData.unshelveTopCount || 0)}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content total-num left-bar">
            下架认领量（个）
            <div>{{addCommas(todayData.unshelveClaimCount || 0)}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>  
  
<script>
import API from "@/axios/api/statisticAPI";
import { mapState } from "vuex";
export default {
  name: "totalStatistic",
  data() {
    return {
      historyHouseAllCountVo: "",
      todayHouseAllCountVo: "",
      todayData: "",
      mateData: "",
      totalData: "",
      totalPie: [{ value: 0 }, { value: 0 }, { value: 100 }, { value: 150 }],
      autoPie: [{ value: 0 }, { value: 0 }, { value: 900 }, { value: 100 }],
      peoplePie: [{ value: 0 }, { value: 0 }, { value: 70 }, { value: 100 }]
    };
  },
  methods: {
    // 每三个数字添加逗号分隔符
    addCommas(nStr) {
      nStr += "";
      let x = nStr.split(".");
      let x1 = x[0];
      let x2 = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      return x1 + x2;
    },
    /*请求数据*/
    viewHouseCountQuery(boolean) {
      const ctx = this;
      let { ...parme } = { isToday: boolean || false };
      API.viewHouseCountQuery(parme).then(function(result) {
        if (parme.isToday) {
          ctx.todayData = result.data;
        } else {
          ctx.totalData = result.data;
          ctx.viewHouseMatchingStatistics();
        }
      });
    },
    // 获取拼图数据
    viewHouseMatchingStatistics() {
      const ctx = this;
      API.viewHouseMatchingStatistics().then(function(result) {
        ctx.mateData = result.data;

        // 计算echart饼图
        ctx.totalPie[2].value = result.data.houseMatchRate;
        ctx.totalPie[3].value = 100 - result.data.houseMatchRate;
        ctx.autoPie[2].value = result.data.autoMatchRate;
        ctx.autoPie[3].value = 100 - result.data.autoMatchRate;
        ctx.peoplePie[2].value = result.data.manualMatchRate;
        ctx.peoplePie[3].value = 100 - result.data.manualMatchRate;
        ctx.initEchart();
        ctx.viewHouseCountQuery(true);
      });
    },
    initEchart() {
      // 引入 ECharts 主模块
      const echarts = require("echarts/lib/echarts");
      // 引入柱状图
      require("echarts/lib/chart/pie");
      // 基于准备好的dom，初始化echarts实例
      const totalMate = echarts.init(document.getElementById("totalMate"));
      const autoMate = echarts.init(document.getElementById("autoMate"));
      const peopleMate = echarts.init(document.getElementById("peopleMate"));
      // 绘制图表
      totalMate.setOption({
        series: [
          {
            type: "pie",
            radius: ["100%", "60%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.totalPie
          }
        ]
      });
      autoMate.setOption({
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.autoPie
          }
        ]
      });
      peopleMate.setOption({
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.peoplePie
          }
        ]
      });
    }
  },
  mounted() {
    this.viewHouseCountQuery();
  }
};
</script>
<style lang='scss' scoped>
.total-data {
  .total-title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #2c2f37;
  }
  .total-block {
    padding: 30px;
    border: 1px solid #edeff0;
    border-radius: 4px;
    margin: 20px 0;
    .total-item {
      padding: 35px 0;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #878d99;
      border-right: 1px solid #edeff0;
      .big-icon {
        width: 80px;
        height: 80px;
      }

      .big-icon-text {
        display: inline-block;
        width: 60%;
        margin-top: 20px;
        vertical-align: top;
        text-align: center;
        div {
          font-family: PingFangSC-Medium;
          font-size: 24px;
          color: #475266;
        }
      }
    }
    .right-item {
      padding: 15px 0 0 20px;
      .mini-icon {
        width: 48px;
        height: 48px;
      }
      .mini-icon-text {
        display: inline-block;
        width: 60%;
        text-align: center;
        vertical-align: top;
        div {
          margin-top: 10px;
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #475266;
        }
      }
    }
  }
  .total-bar {
    margin-bottom: 30px;
    padding: 30px 10px;
    border: 1px solid #edeff0;
    border-radius: 4px;
    .total-num {
      /* text-align: center; */
      padding: 0 20px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #878d99;

      div {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #475266;
        margin-top: 10px;
      }
    }
    .left-bar {
      border-left: 1px solid #edeff0;
    }
  }
}
</style>
