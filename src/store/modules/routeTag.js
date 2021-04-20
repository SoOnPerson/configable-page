/*
 * @Author: SoOnPerson
 * @Date: 2021-04-19 15:12:34
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-19 21:25:59
 * @Descripttion: 
 */
const routeTag = {
  state: {
    cachedViews: [],
    visitedViews: []
  },
  mutations: {
    ADD_CACHED_VIEWS: (state, route) => {
      if (route.name == "redirect") return;
      if (state.cachedViews.findIndex((i) => i.fullPath == route.fullPath) > -1) return
      state.cachedViews.push({
        fullPath: route.fullPath,
        name: route.name,
        title: route.title,
        meta: route.meta,
        path: route.path,
        query: JSON.parse(JSON.stringify(route.query))
      })
      if (state.visitedViews.findIndex((i) => i.fullPath == route.fullPath) > -1) return
      state.visitedViews.push({
        fullPath: route.fullPath,
        name: route.name,
        title: route.title,
        meta: route.meta,
        path: route.path,
        query: JSON.parse(JSON.stringify(route.query))
      })
    },
    DEL_CACHED_VIEWS: (state, { route, isDelVisited }) => {
      const index = state.cachedViews.findIndex((i) => i.fullPath == route.fullPath)
      if (index != -1) {
        state.cachedViews.splice(index, 1)
      }
      if (isDelVisited) {
        const v_index = state.visitedViews.findIndex((i) => i.fullPath == route.fullPath)
        if (v_index != -1) {
          state.visitedViews.splice(v_index, 1)
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, route) => {
      const index = state.cachedViews.findIndex((i) => i.fullPath == route.fullPath)
      if (index != -1) {
        state.cachedViews = [
          state.cachedViews[index]
        ]
      } else {
        state.cachedViews = []
      }
      const v_index = state.visitedViews.findIndex((i) => i.fullPath == route.fullPath)
      if (v_index != -1) {
        state.visitedViews = [
          state.visitedViews[v_index]
        ]
      } else {
        state.visitedViews = []
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.cachedViews = []
      state.visitedViews = []
    },
  },
  action: {
  }
};
export default routeTag;
