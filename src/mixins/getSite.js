import {
  mapState
} from "vuex";
import COMMON from "@/axios/api/commonAPI";
import STA from "@/axios/api/statisticAPI";
export default {
  data() {
    return {
      regionList: [],
      bussinssList: [],
      totalTopNum: 0
    }
  },
  mounted() {
    this.getRegion('SHENZHEN')
  },
  computed: {
    ...mapState({
      configName: state => state.configName,
      labelName: state => state.labelName,
      cityList: state => state.cityList,
      siteList: state => state.siteList
    })
  },
  methods: {
    // 获取区域
    getRegion(val) {
      // 获取新区域之前置空
      this.condiction.regionId = null;
      this.condiction.businessId = null;
      this.bussinssList = null;
      this.regionList = null;
      const ctx = this;
      let {
        ...params
      } = {
        city: val
      };
      COMMON.queryRegionAndBizAreas(params).then(function (result) {
        ctx.regionList = result.data;
      });
    },
    // 获取商圈
    getBussiness() {
      this.condiction.businessId = null; // 更改区域时商圈置空
      for (const value of this.regionList) {
        if (this.condiction.regionId == value.id) {
          this.bussinssList = value.bizAreaList;
          break;
        }
      }
    },
    /*指定统计获取指定总数*/
    houseTopTotalCountQuery(val) {
      const ctx = this;
      STA.houseTopTotalCountQuery(val).then(function (result) {
        ctx.totalTopNum = result.data;
      });
    }
  }
}
