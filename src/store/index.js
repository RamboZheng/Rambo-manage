/**
 * Created by Rambo on 2019/10/22.
 */
//分离vuex方便维护
// # 我们组装模块并导出 store 的地方
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './modules/actions'
import mutations from './modules/mutations'



Vue.use(Vuex);


const state = {
  listData: [],
  // 页面配置文字
  configName: {
    CITY: '城市',
    REGION: '区域',
    TRADE: '商圈',
    BASEFROM: '基准来源',
    HOUSEID: '房源ID',
    BASEHOUSEID: '基准房源ID',
    OUTSHOWID: '对外展示ID',
    STARTTIME1: '开始日期',
    ENDTIME1: '结束日期',
    STARTTIME2: '开始日期',
    ENDTIME2: '结束日期',
    COMBINETYPE: '组合类型',
    AGENTNAME: '经纪人姓名',
    GARDENNAME: '小区名称',
    FROM: '来源',
    MONEYPART: '价格段',
    QUERY: '查询',
    RESET: '重置',
    MAKEDOWN: "下架",
    UNDERTIME: '下架时间',
    PEOPLEMATE: '人工匹配',
    PEOPLEMATEDETAIL: '人工匹配详情',
    TIMENAME: "更新时间",
    CREATDATE: "创建时间",
    DATANAME: '更新日期',
    MATETIME: '匹配时间',
    MERGETYPE: "合并类型",
    CERTAIN: "确定",
    CANCEL: "取消",
    DOWNPOSITION: '下架展位',
    DOWNDATE: '下架日期',
    DOWNSTICKY: '下架置顶',
    STATUS: '状态',
    MAXLENGTH: '40',
    RESULT: "结果",
    STARCAUTION: "* 备注：首条为基准房源",
    TOURL: '跳转原链接'
  },
  // 列表label名称
  labelName: {
    //列表栏目宽度统一管理
    agentIdW: 280, // 经纪人id宽度
    houseIdW: 100, // houseID宽度
    stickyHouseIdW: 150, // 置顶房源id宽度
    gardenNameW: 200, // 小区名称宽度
    timeW: 200, // 时间宽度
    // 合并房源
    number: '序号',
    baseHouseSource: '合并房源ID',
    regionName: "区域",
    gardenName: "小区",
    roomType: '户型',
    buildArea: '建筑面积（㎡）',
    roomArea: '套内面积（㎡）',
    direction: '朝向',
    decoration: '装修',
    totalFloor: '总楼层',
    totalGrade: '总分',
    make: "操作",


    // 独立房源统计
    houseId: "房源ID",
    houseSource: "来源",
    totalPrice: "总价(万元)",
    modifyDate: "更新时间",


    // 人工匹配列表
    houseSourceDate: "来源时间",

    mateSource: '匹配来源',
    checkDetail: '查看详情',
    mateInfo: '匹配信息',
    regionTrade: '区域商圈',
    mateStatus: '匹配状态',
    materResult: '匹配结果',
    floorName: '楼层',
    checkPic: "查看图片",
    mateHouseSource: '匹配房源',
    baseHouseSource: '基准房源',


    // 匹配量统计
    totalMergeCount: '总匹配量',
    totalBaseHouseCount: "总基准房源量",
    totalMergeHouseCount: '总匹配房源量',
    mergePercentage: "匹配率(%)",
    mergeRatio: "匹配比",




    // 展示房源列表
    downReason: '下架原因',
    downContent: "下架内容",
    fiveDownPosition: "提示：此房源关联的认领展位为5个，下架后展位将一并下架。",
    threeDownPosition: '提示：此房源关联的置顶房源为3个，下架后将在当天24:00后取消置顶。',
    // 认领房源列表
    brokerName: '经纪人名称',
    claimBrokerId: "认领经纪人id",
    orderNum: "展位排序",
    claimDate: '认领开始时间',
    maxlength: "最多支持输入20个字。",
    belongBoker: '所属经纪人',
    tip1: '提示1：此展位存在关联的认领房源，房源ID为',
    tip2: '提示2：此展位存在关联的置顶房源，房源ID为',
    // 置顶房源列表
    stickyHouseId: '置顶房源ID',
    stickyBrokerName: '置顶经纪人名称',
    regionTop: '区域置顶',
    businessTop: '商圈置顶',
    gardenTop: '小区置顶',
    topPriceSection: '置顶价格段',
    startTopDate: '置顶开始时间',
    endTopDate: '置顶结束时间 ',
    tip3: "提示：此房源存在关联的认领房源，房源ID为",


    // 下架记录
    houseBaseInfo: "房源基本信息",
    houseTitle: "房源标题",
    houseTotalPrice: "房源总价",
    houseAveragePrice: "房源均价",
    locatedRrgion: "所在区域",
    madeYear: "建筑年代",

    houseFeature: '房源特色',
    houseDetailInfo: '房源详细信息',
    baseProperty: '基本属性',
    dealProperty: '交易属性',
    houseType: "房屋户型",
    houseFloor: "房屋楼层",
    roomLayout: '户型结构',
    houseDirection: '房屋朝向',
    houseDecorate: "装修情况",
    haveElevator: '配备电梯',

    houseArea: '建筑面积',
    realArea: '套内面积',
    quotedTime: "挂牌时间",

    mortgageInfo: "抵押信息",
    houseUse: '房屋用途',
    houseAge: '房屋年限',

    underTip: '* 以上信息仅供参考，购房时请以房产证或不动产证信息为准',

    quotedChangeHis: '挂牌价变动历史',
    quotedPrice: '当前挂牌价',
    priceChangeHis: '价格变动历史',


    // 展位下架
    unshelveType: '下架类型',
    operatorName: '操作人员',

    manualUnshelveCount: '人工下架房源量',
    manualUnshelvePosition: '人工下架展位量',
    imageIllegal: '房源图片不合格(%)',
    titleIllegal: '房源标题不合格(%)',
    appraiseIllegal: '评价不合格(%)',
    houseSaled: '房源已售(%)',
    houseUnSaled: '房源不售(%)',
    otherReason: '其他(%)',




    // 人员统计

    mergedBaseHouseCount: '匹配基准房源量',
    mergedPassBaseHouseCount: '匹配通过基准房源量',
    totalMergedHouse: '匹配房源总量',
    mergedPassRatio: '匹配通过率(%)',
    mergedDate: '平均匹配周期(天)',

    // q房  //链家
    threeSourceMerged: '三网站总匹配量',
    twoSourceMerged: '两网站总匹配量',
    ljLyjMergedCount: '匹配链家、乐有家',
    ljZyMergedCount: '匹配链家、中原',
    lyjZyMerged: '匹配乐有家、中原',
    oneSourceMerged: '单网站匹配量',
    ljMergedCount: '匹配链家',
    lyjMerged: '匹配乐有家',
    zyMerged: '匹配中原',
    qfLyjMergedCount: "匹配Q房、乐有家",
    qfMergedCount: "匹配Q房",
    qfZyMergedCount: "匹配Q房、中原",



    //认领统计
    claimHouse: '认领房源量',
    claimPosition: '总认领展位量',
    fiveClaimHouseCount: '5展位房源量',
    fourClaimHouseCount: '4展位房源量',
    threeClaimHouseCount: '3展位房源量',
    twoClaimHouseCount: '2展位房源量',
    oneClaimHouseCount: '1展位房源量',

    claimHouseCount: '认领房源量统计',
    claimPositionCount: '认领展位量统计',
    fivePositionCount: '5展位量统计',
    fourPositionCount: '4展位量统计',
    threePositionCount: '3展位量统计',
    twoPositionCount: '2展位量统计',
    onePositionCount: '1展位量统计',

    //抓取量统计
    houseCount: '抓取房源量（套）',
    garbCountStatistic: '抓取量统计',



    //置顶量统计
    topHouseCount: '房源置顶量'
  },


  // 下拉数据
  siteList: {
    resultList: [{
        value: 'MATCH_SUCCESS',
        label: "匹配成功"
      },
      {
        value: 'MATCH_FAIL',
        label: "匹配失败"
      },
    ],
    baseSource: [{
        value: 'QFANG',
        label: "Q房"
      },
      {
        value: 'LIANJIA',
        label: "链家"
      },
    ],
    regionList: [{
        value: 'GAOXINYUAN',
        label: "高新园"
      },
      {
        value: 'BAISHIZHOU',
        label: "白石洲"
      }
    ],
    tradeList: [{
        value: 'DACHONG',
        label: "大冲"
      },
      {
        value: 'HUANLEGU',
        label: "欢乐谷"
      }
    ],
    baseFromList: [{
        value: 'QFANG',
        label: "Q房"
      }, {
        value: 'LIANJIA',
        label: "链家"
      },
      {
        value: 'LEYOUJIA',
        label: "乐有家"
      },
      {
        value: 'ZHONGYUAN',
        label: "中原"
      }

    ],
    mateStatus: [{
        value: 'ALREADY_MERGE',
        label: "已匹配"
      },
      {
        value: 'NOT_HAVE_MERGE',
        label: "未匹配"
      },
    ],
    unshelveList: [{
        label: "全部"
      },
      {
        value: 'AUTOMATIC',
        label: "自动下架"
      },
      {
        value: 'ARTIFICIAL',
        label: "人工下架"
      }
    ],
    unshelveReason: [{
        value: 'INVALID_IMAGE',
        label: "房源图片不合格"
      },
      {
        value: 'INVALID_TITLE',
        label: "房源标题不合格"
      },
      {
        value: 'INVALID_FEATURE',
        label: "房评不合格"
      },
      {
        value: 'SALE_OUT',
        label: "房源已售"
      },
      {
        value: 'NOT_SALE',
        label: "房源不售"
      },
      {
        value: 'EXPIRE',
        label: "过期"
      },
      {
        value: 'OTHER',
        label: "其他原因"
      },
      {
        value: 'SOURCE_UNSHELVE',
        label: "来源网站下架"
      },
    ],
    reasonList: [{
        value: "INVALID_IMAGE",
        label: "房源图片不合格"
      },
      {
        value: "INVALID_TITLE",
        label: "房源标题不合格"
      },
      {
        value: "INVALID_FEATURE",
        label: "房评不合格"
      },
      {
        value: "SALE_OUT",
        label: "房源已售"
      },
      {
        value: "NOT_SALE",
        label: "房源不售"
      },
      {
        value: "OTHER",
        label: "其他原因"
      }
    ],
    mergeList: [{
        value: "MERGED",
        label: "合并房源"
      },
      {
        value: "SINGLE",
        label: "独立房源"
      }
    ],
  },
  // 城市列表
  cityList: [],
  // 价格段列表
  sectionList: []
}



export default new Vuex.Store({
  state,
  actions,
  mutations
})
