/**
 * Created by Rambo on 2019/10/22.
 * 用户相关api
 */
import * as API from '../'

export default {
  //数据统计 =>房源数据概览-非匹配量
  viewHouseCountQuery: params => {
    return API.GET('/houseManager/viewHouseCountQuery', params)
  },
  //数据统计 =>房源数据总览-匹配量
  viewHouseMatchingStatistics: params => {
    return API.GET('/houseManager/viewHouseMatchingStatistics', "")
  },
  //数据统计 =>认领统计
  claimHouseCountSearch: params => {
    return API.POST('/houseManager/claimHouseCountSearch', params)
  },
  //数据统计 =>认领量统计总数
  claimHouseTotalCountSearch: params => {
    return API.POST('/houseManager/claimHouseTotalCountSearch', params)
  },
  //数据统计 =>抓取量统计
  crawlerHouseCountSearch: params => {
    return API.POST('/houseManager/crawlerHouseCountSearch', params)
  },
  //数据统计 =>抓取量统计总数
  crawlerHouseTotalCountQuery: params => {
    return API.POST('/houseManager/crawlerHouseTotalCountQuery', params)
  },
  //数据统计 =>置顶统计
  topHouseCountSearch: params => {
    return API.POST('/houseManager/topHouseCountSearch', params)
  },
  //数据统计 =>置顶量统计总数
  houseTopTotalCountQuery: params => {
    return API.POST('/houseManager/houseTopTotalCountQuery', params)
  },
  //数据统计 =>获取价格段
  queryTopPriceSection: params => {
    return API.GET('/houseManager/queryTopPriceSection', "")
  },
}
