/**
 * Created by Rambo on 2019/10/22.
 * 用户相关api
 */
import * as API from '../'

export default {
  //房源管理 =>展示房源列表
  onlineHouseSearch: params => {
    return API.POST('/houseManager/onlineHouseSearch', params)
  },
  //房源管理 =>下架房源提示
  getUnshelveHouseTip: params => {
    return API.GET('/houseManager/getUnshelveHouseTip', params)
  },
  //房源管理 =>下架房源
  unshelveHouse: params => {
    return API.POST('/houseManager/unshelveHouse', params)
  },
  //房源管理 =>认领展位列表
  claimHouseBrokerSearch: params => {
    return API.POST('/houseManager/claimHouseBrokerSearch', params)
  },
  //房源管理 =>下架认领展位
  unshelveClaimHouse: params => {
    return API.POST('/houseManager/unshelveClaimHouse', params)
  },

  //房源管理 =>置顶房源列表
  topHouseSearch: params => {
    return API.POST('/houseManager/topHouseSearch', params)
  },
  //房源管理 =>下架置顶提示
  getUnshelveTopHouseTip: params => {
    return API.GET('/houseManager/getUnshelveTopHouseTip', params)
  },
  //房源管理 =>下架房源置顶
  unshelveTopHouse: params => {
    return API.POST('/houseManager/unshelveTopHouse', params)
  },

}
