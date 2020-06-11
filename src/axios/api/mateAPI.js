/**
 * Created by Rambo on 2019/10/22.
 * 用户相关api
 */
import * as API from '../'

export default {
  //房源匹配 =>自动匹配合并房源列表
  autoMergedHouseSearch: params => {
    return API.POST('/houseManager/autoMergedHouseSearch', params)
  },
  //房源匹配 =>获取自动匹配详情
  autoMergedHouseDetailQuery: params => {
    return API.GET('/houseManager/autoMergedHouseDetailQuery', params)
  },
  //房源匹配 =>自动匹配独立房源列表
  getAutoSingleList: params => {
    return API.POST('/houseManager/autoSingleHouseSearch', params)
  },
  //房源匹配 =>匹配房源量统计
  houseMergeCountSearch: params => {
    return API.POST('/houseManager/houseMergeCountSearch', params)
  },
  //房源匹配 =>人工匹配列表
  manualMergeHouseSearch: params => {
    return API.POST('/houseManager/manualMergeHouseSearch', params)
  },
  //房源匹配 =>人工匹配房源详情查询
  manualMergedHouseDetailQuery: params => {
    return API.GET('/houseManager/manualMergedHouseDetailQuery', params)
  },
  //房源匹配 =>人工匹配房源图片获取
  houseImagesQuery: params => {
    return API.GET('/houseManager/houseImagesQuery', params)
  },
  //房源匹配 =>人工匹配结果保存
  saveManualMergedHouse: params => {
    return API.POST('/houseManager/saveManualMergedHouse', params)
  },
  //房源匹配 =>人工匹配人员统计
  peopelMateStatistic: params => {
    return API.POST('/houseManager/mergeHousePersonSearch', params)
  },
  //房源匹配 =>基准房源统计Q房
  getQStatistic: params => {
    return API.POST('/houseManager/qFBaseHouseCountSearch', params)
  },

  //房源匹配 =>基准房源统计链家
  getLStatistic: params => {
    return API.POST('/houseManager/lJBaseHouseCountSearch', params)
  }
}
