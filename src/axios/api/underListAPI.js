/**
 * Created by Rambo on 2019/10/22.
 * 用户相关api
 */
import * as API from '../'

export default {
  //下架记录 =>下架原因统计-房源
  houseUnshelveReasonSearch: params => {
    return API.POST('/houseManager/houseUnshelveReasonSearch', params)
  },
  //下架记录 =>下架原因统计-展位
  claimUnshelveReasonSearch: params => {
    return API.POST('/houseManager/claimUnshelveReasonSearch', params)
  },
  //下架记录 =>房源下架记录
  houseUnshelveRecordSearch: params => {
    return API.POST('/houseManager/houseUnshelveRecordSearch', params)
  },
  //下架记录 =>置顶下架记录
  topHouseUnshelveRecordSearch: params => {
    return API.POST('/houseManager/topHouseUnshelveRecordSearch', params)
  },
  //下架记录 =>展位下架记录
  claimHouseUnshelveRecordSearch: params => {
    return API.POST('/houseManager/claimHouseUnshelveRecordSearch', params)
  },
  //下架记录 =>查看房源详情
  houseDetailQuery: params => {
    return API.GET('/houseManager/houseDetailQuery', params)
  }
}
