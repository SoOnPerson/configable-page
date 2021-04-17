/*
 * @Author: SoOnPerson
 * @Date: 2021-03-04 16:12:41
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-03-05 18:18:08
 * @Descripttion: 部分请求的缓存 
 */


const state = {
	area: null, // 省市区的请求
  allArea: {},
  request: null
}
const mutations = {
	SET_AREA: (state, result) => {
    state.allArea = {
      ...result.county_list,
      ...result.city_list,
      ...result.province_list
    }
    for (const key in result.county_list) {
      const parentKey = parseInt(key/100) * 100 + ''
      result.city_list[parentKey].children ? null : (result.city_list[parentKey] = { name: result.city_list[parentKey], id: parentKey, children: []})
      result.city_list[parentKey].children.push({
        name: result.county_list[key],
        id: key
      })
    }
    for (const key in result.city_list) {
      const parentKey = parseInt(key/10000) * 10000 + ''
      result.province_list[parentKey].children ? null : (result.province_list[parentKey] = { name: result.province_list[parentKey], id: parentKey, children: []})
      result.province_list[parentKey].children.push(result.city_list[key])
    }
    state.area = result.province_list
	}
}
const actions = {
  setArea({ commit,state }){
    return new Promise((resolve, reject) => {
      if (state.area) {
        resolve(state.area)
      } else {
        state.request = state.request||window.$httpRequest.post(
          '/user-center/region/findRegion',
          {}
        ).then(result => {
          commit('SET_AREA', result)
          resolve(state.area)
        })
        return state.request
      }
    })
	},
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}

