/**
 * Created by Rambo on 2019/10/22.
 * 用户相关api
 */
import * as API from '../'

export default {
  //城市查询
  queryCitys: params => {
    return API.GET('/houseManager/queryCitys', "")
  },
  //区域商圈级联数据查询
  queryRegionAndBizAreas: params => {
    return API.GET('/houseManager/queryRegionAndBizAreas', params)
  },
  //小区名称联想补齐查询
  queryGarden: params => {
    return API.GET('/houseManager/queryGarden', params)
  },
  //匹配房源量统计
  houseMargeCountSearch: params => {
    return API.GET('/houseManager/houseMargeCountSearch', params)
  },
  //小区名称联想
  queryGarden: params => {
    return API.GET('/houseManager/queryGarden', params)
  },
}
