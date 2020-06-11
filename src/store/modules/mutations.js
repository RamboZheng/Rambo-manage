/**
 * Created by Rambo on 2019/10/22.
 */
export default {
  ['updateListData'](state, arr) {
    state.listData = arr;
  },
  ['saveCityList'](state, arr) {
    state.cityList = arr;
  },
  ['saveSectionList'](state, arr) {
    state.sectionList = arr;
  },
}
