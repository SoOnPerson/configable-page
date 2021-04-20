import router from '../../router'
const IS_MENU = 1
function pascaltoCamel(string, split) {
  const strs = string.split(split).filter(s => s)
  if (strs.length == 0) return ''
  else if (strs.length == 1) return strs[0]
  else {
    let res = strs[0]
    for (let index = 1; index < strs.length; index++) {
      res += strs[index].replace(strs[index].substr(0, 1), strs[index].substr(0, 1).toUpperCase());
    }
    return res
  }

}
function addDynamicMenuRoutes(menuList) {
  // 子菜单
  const menusObject = {}
  const operationsObject = {}
  const firstMenu = []
  for (let i = 0; i < menuList.length; i++) {
    const item = menuList[i]
    switch (item.type) {
      case IS_MENU: {
        let route = {
          name: pascaltoCamel(item.path),
          path: item.path,
          hidden: item.hidden,
          meta: {
            id: item.id,
            title: item.title,
            sort: item.sort,
            icon: item.icon,
            url: item.url,
            type: item.type,
            operation: []
          },
          children: []
        }
        if (item.parentId == -1) {
          route.component = () => import('@/layout/MainLayout.vue')
        } else {
          route.component = () => import("@/layout" +
            (item.component || '/PublicLayout'))
        }
        menusObject[item.id.toString()] = route
        break
      }
      default: {
        operationsObject[item.id.toString()] = {
          sort: item.sort,
          title: item.title,
          hidden: item.hidden,
          icon: item.icon,
          type: item.type
        }
        break
      }
    }
  }
  menuList.forEach(menu => {
    switch (menu.type) {
      case IS_MENU: {
        if (menu.parentId != -1 && Object.prototype.hasOwnProperty.call(menusObject, menu.parentId.toString())) {
          // 不是第一级菜单 && 缓存中有父菜单
          menusObject[menu.id.toString()].path = menusObject[menu.parentId.toString()].path + menusObject[menu.id.toString()].path
          menusObject[menu.parentId.toString()].children.push(menusObject[menu.id.toString()])
        } else if (menu.parentId == -1) {
          firstMenu.push(menusObject[menu.id.toString()])
        }
        break
      }
      default: {
        if (Object.prototype.hasOwnProperty.call(operationsObject, menu.parentId.toString())) {
          // 缓存中有父菜单
          menusObject[menu.parentId.toString()].meta.operation.push(operationsObject[menu.id.toString()])
        }
        break
      }
    }
  })
  return firstMenu
}
function sortRouters(menuList) {
  return menuList.map(route => {
    if (route.children && route.children.length) {
      route.children = sortRouters(route.children)
    }
    return route
  }).sort((a, b) => a.meta.sort - b.meta.sort)
}
const permission = {
  state: {
    updated: false,
    menuList: null
  },
  mutations: {
    ADD_ROUTERS: (state, menuList) => {
      state.menuList = menuList
    }
  },
  actions: {
    // eslint-disable-next-line no-empty-pattern
    GenerateRoutes({ commit }, menuList) {
      return new Promise((resolve) => {
        let addRouters = addDynamicMenuRoutes(menuList)
        addRouters = sortRouters(addRouters)
        commit('ADD_ROUTERS', addRouters)
        addRouters.forEach(route => {
          router.addRoute(route)
        })
        resolve(addRouters)
      })
    }
  },
};
export default permission;
