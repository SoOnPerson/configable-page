import { constantRouterMap } from "@/router";
import { atlsRouterMap } from "@/router/pwaAtls";

import mall from "@/router/mall";
import atls from "@/router/atls";
import commonRouter from "@/router/commonRouter";
/**
 * 添加动态路由
 */
function addDynamicMenuRoutes(menuList, routes, permissions) {
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].path && menuList[i].path.length >= 1) {
      var route = {
        path: menuList[i].path ? menuList[i].path.trim() : menuList[i].path,
        component: () => import("@/layout"),
        name: menuList[i].name,
        hidden: Number(menuList[i].hidden) === "0",
        meta: Object.assign({}, menuList[i].meta, {
          sort: String(menuList[i].meta.sort),
        }),
        children: [],
      };
      if (menuList[i].children && menuList[i].children.length >= 1) {
        setDynamicRoutes(route, route.path, menuList[i].children, permissions);
      }
      if (route.children.length === 0) {
        const url = menuList[i].path;
        var child = {
          path: "",
          name: menuList[i].name,
          hidden: menuList[i].hidden,
          component: () => import("@/views" + url.trim()),
          meta: Object.assign({}, menuList[i].meta, {
            sort: String(menuList[i].meta.sort),
          }),
        };
        if (permissions.indexOf(menuList[i].permission) > -1) {
          child.meta.identity = permissions;
        }
        route.children.push(child);
      }
      routes.push(route);
    }
  }
  return routes;
}

function setDynamicRoutes(parentRoute, parentPath, menuChildList, permissions) {
  menuChildList.forEach((menu) => {
    const path1 = parentPath + "/" + (menu.path ? menu.path : "");
    //    const url = path1.split(':')[0].charAt(path1.split(':')[0].length - 1) === '/' ? path1.split(':')[0].substring(0, path1.split(':')[0].length - 1) : path1.split(':')[0]
    const url = parentPath + "/" + menu.path;
    if (menu.children && menu.children.length >= 1) {
      setDynamicRoutes(parentRoute, url, menu.children, permissions);
    }
    if (menu.path && menu.path.length > 1) {
      var child = {
        path: path1,
        name: menu.name,
        hidden: menu.hidden,
        component: () => import("@/views" + url.trim()),
        meta: Object.assign({}, menuList[i].meta, {
          sort: String(menuList[i].meta.sort),
        }),
        //        meta: { title: menu.name, icon: menu.icon, target: menu.target, path: menu.path }
      };
      //      if (menu.target && menu.target === 'report') {
      //        child.component = () => import('@/views' + '/dataquery/queryData')
      //        child.meta.target = menu.target
      //        child.path = parentPath + '/' + menu.id
      //      }
      //      if (permissions.indexOf(menu.permission) > -1) {
      //        child.meta.identity = permissions
      //      }
      parentRoute.children.push(child);
    }
  });
}

function getParams(params) {
  let json = {};
  let kvArr = params.split("&");
  for (let kv of kvArr) {
    const value = ["true", "false"].includes(
      kv.split("=")[1].toLocaleLowerCase()
    )
      ? kv.split("=")[1].toLocaleLowerCase() === "true"
      : kv.split("=")[1];
    json[kv.split("=")[0]] = value;
  }
  return json;
}

function addDynamicMenuRoutes1(menuList, routes, routePaths) {
  //排序
  menuList = _.sortBy(menuList, (item) => (item ? item.sort : 999));
  const childList = menuList.filter((m) => Number(m.parentId) !== -1);
  // const childList = menuList.filter(m => Number(m.parentId) !== -1)
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].parentId === -1 && menuList[i].type === 1) {
      const path = menuList[i].path ? menuList[i].path.trim().split("?") : [""];
      const params = path[1] ? getParams(path[1]) : null;
      const route = {
        path: path[0],
        component: () => import("@/layout"),
        name: menuList[i].name,
        hidden: menuList[i].hidden,
        meta: {
          params,
          sort: String(menuList[i].sort),
          css: menuList[i].css,
          url: menuList[i].url,
          remarks: menuList[i].remarks ? JSON.parse(menuList[i].remarks) : null,
          type: menuList[i].type,
          id: menuList[i].id,
        },
        children: [],
      };
      const list = childList.filter(
        (m) =>
          Number(m.parentId) === Number(route.meta.id) && Number(m.type) === 1
      );
      if (list.length)
        setDynamicRoutes1(route, route.path, list, menuList, routePaths);
      if (route.children.length === 0) {
        setDynamicRoutes1(route, "", [route], menuList, routePaths);
      }
      routes.push(route);
    }
  }
  routes = routes.concat(commonRouter);
  //console.log(routes)
  return {
    routes,
    routePaths,
  };
}

const parentExcludeRouter = [];
const childExcludeRouter = [
  "/coupon/terGroup",
  '/vipManage/order',
  "/planOrder/newOriginalOrder",
  "/basis/tbautocheck",
  '/coupon/deaIntergralSetting',
  "/planOrder/order", // TODO菜单修改
  "/terOrder/order",
  "/auth/employee",
  "/auth/role",
  '/auth/terUser',
  '/auth/deaUser',
  "/auth/office",
  "/auth/menu",
  "/auth/bannererr",
  "/auth/administrationArea",
  "/auth/dictionaries",
  "/auth/serverLog",
  "/mall",
  "/atls",
  "/report/cityShop",
  "/report/integral",
  "/report/sale",
  "/report/store",
  "/biView",
  "/dcommodity/c-price",
  "/dcommodity/addPrice",
  "/dcommodity/settingStore",
  "/dcommodity/miandata",
  "/dcommodity/goodsdetails",
  "/dcommodity/storegroup",
  "/fcommodity/miandata",
  "/fcommodity/goodsdetails",
  "/fcommodity/goodsedit",
  "/fcommodity/priceset",
  "/fcommodity/scaleset",
  "fcommodity/dealerprice",
  "fcommodity/addauth",
  "fcommodity/priceadjust",
  "fcommodity/dealergroup",
  "fcommodity/groupdetails",
  "terminal/dealergroup",
  "terminal/groupdetails",
  "/terOrder/payment",
  "/financial/payment",
];
const hiddenRouter = ["/planOrder/newOriginalOrder"];
const newUe = ["/planOrder/mPlan", "/coupon/terGroup"];
const useCommen = [
  "/mall/goods/goods",
  "/mall/bulletin/faq",
  "/mall/bulletin/notice"
];

function setDynamicRoutes1(
  parentRoute,
  parentPath,
  menuChildList,
  menuList,
  routePaths
) {
  menuChildList = _.sortBy(menuChildList, (item) => item.sort);
  menuChildList.forEach((menu) => {
    const menuPath = menu.path?menu.path.trim().split("?"):"";
    const params = menuPath[1] ? getParams(menuPath[1]) : null;
    const path = parentPath ? parentPath + menuPath[0] : menuPath[0] + "/index";
    // //console.log(path,'router-path')
    let component = null;
    const child = {
      path: path,
      a: !useCommen.includes(path),
      b: parentExcludeRouter.some((route) =>
        new RegExp(`^${route}`).test(parentPath)
      ),
      c: childExcludeRouter.some((route) => path.includes(route)),
      componentName: 
        (
          !useCommen.includes(path)
          && // 在 useCommen数组的path 会使用默认组件
          (
            parentExcludeRouter.some((route) => new RegExp(`^${route}`).test(parentPath))
            ||
            childExcludeRouter.some((route) => path.includes(route))
          )
        )
        ? '@/views/costomeComponent'
        : '@/views/publicComponent',
      component: () =>
        (
          !useCommen.includes(path)
          && // 在 useCommen数组的path 会使用默认组件
          (
            parentExcludeRouter.some((route) => new RegExp(`^${route}`).test(parentPath))
            ||
            childExcludeRouter.some((route) => path.includes(route))
          )
        )
        ? import('@/views/costomeComponent')
        : import('@/views/publicComponent'),
      // component: () => import('@/views' + parentPath.includes('auth') ? path : '/publicComponent.vue'),
      name: menu.name,
      hidden: hiddenRouter.includes(path) ? true : menu.hidden,
      meta: {
        keepAlive: true,
        remarks: menu.remarks ? JSON.parse(menu.remarks) : null,
        params,
        sort: String(menu.sort),
        css: menu.css,
        url: menu.url,
        type: menu.type,
        id: menu.id,
        permission: [],
        operating: [],
      },
    };
    const options = menuList.filter(
      (m) =>
        Number(m.parentId) === Number(child.meta.id) && Number(m.type) === 2
    );
    if (options.length) {
      setDynamicRoutes2(options, child);
    }
    if (newUe.includes(child.path)) {
      if (child.path === "/coupon/terGroup") {
        let m = {
          path: "/coupon/terGroup/set",
          component: () => import("@components/terGroupManage"),
          name: "门店分组管理-管理门店",
          hidden: true,
          meta: {
            remarks: menu.remarks ? JSON.parse(menu.remarks) : null,
            sort: String(menu.sort),
          }
        };
        parentRoute.children.push(m);
      } else if (child.path === "/planOrder/mPlan") {
        let m = {
          path: `${path}/:appType`,
          component: () => import("@components/mPlan"),
          name: `月计划`,
          hidden: true,
          props: (route) => {
            if (route.params && route.params.appType) {
              route.meta.title =
                route.params.appType === "add"
                  ? "新增月计划"
                  : route.params.appType === "edit"
                  ? "编辑月计划"
                  : route.params.appType === "copy"
                  ? "复制月计划"
                  : "查看月计划";
            }
            return route.params;
          },
          meta: {
            remarks: menu.remarks ? JSON.parse(menu.remarks) : null,
            sort: String(menu.sort),
          },
        };
        parentRoute.children.push(m);
      }
    }
    if (parentRoute.path === "/mall") {
      // parentRoute.hidden = true
      parentRoute.children = JSON.parse(JSON.stringify(mall));
    } else if (parentRoute.path === "/atls") {
      parentRoute.children = JSON.parse(JSON.stringify(atls));
    } else {
      if (child.name === "积分商城浏览量" && child.path === "/report/viewNum") {
        child.component = () => import("@/views/viewNum");
      } else if (
        child.name === "门店出库" &&
        (child.path === "/dea-stock/ter-out" ||
          child.path === "/fac-stock/ter-out")
      ) {
        child.component = () => import("@/views/stock/ter-out.vue");
      } else if (
        child.name === "门店入库" &&
        (child.path === "/dea-stock/ter-in" ||
          child.path === "/fac-stock/ter-in")
      ) {
        child.component = () => import("@/views/stock/ter-in.vue");
      } else if (
        child.name === "经销商出库" &&
        (child.path === "/dea-stock/deaOut" ||
          child.path === "/fac-stock/deaOut")
      ) {
        child.component = () => import("@/views/stock/dea-out.vue");
      } else if (
        child.name === "经销商入库" &&
        (child.path === "/dea-stock/deaIn" || child.path === "/fac-stock/deaIn")
      ) {
        child.component = () => import("@/views/stock/dea-in.vue");
      }
      parentRoute.children.push(child);
    }
    routePaths.push(path);
  });
}

const keyMap = {
  "el-icon-search": "search", //搜索
  "el-icon-refresh": "refresh", //刷新
  "el-icon-view": "view", // 查看
  "el-icon-circle-check": "submit", //提交
  "el-icon-unlock": "enable", //启用
  "el-icon-caret-right": "audit", //审核
  "el-icon-plus": "add", //新增
  "el-icon-setting": "setting", //设置
  "el-icon-edit": "edit", //编辑
  "el-icon-delete": "delete", //删除
  "el-icon-lock": "disable", // 禁用
  "el-icon-upload": "uploadFile", // 上传audit
  "el-icon-upload2": "upload", // 期初导入
  "el-icon-download": "download", // 下载
  "el-icon-sell": "import", // 导入
  "el-icon-sold-out": "export", // 导出
  "el-icon-printer": "print", // 打印
  "el-icon-s-check": "store", // 门店审核
  "el-icon-s-shop": "renovation", // '装修审核'
  "el-icon-switch-button": "closed", // '关店'
  "el-icon-tickets": "exec", // '活动执行'
  "el-icon-top": "onShelf", // '上架'
  "el-icon-bottom": "OffShelf", // '下架'
  "el-icon-thumb": "stockWaring", //库存预警
  "el-icon-goblet": "stockUpdate", //库存修正 绑定门店
  "el-icon-confirmReceipt": "confirmReceipt", //确认收款
  "el-icon-c-scale-to-original": "records", // 胎码流转记录
  "el-icon-edit-outline": "outLine", // 直发客户积分补登
  "el-icon-s-grid": "grid", // 批量修改月出库数量
  "el-icon-right": "right", // 直发门店
  "el-icon-s-claim": "validate", // 批量验证
  "el-icon-folder-checked": "resolve", // 通过
  "el-icon-folder-delete": "reject", // 驳回
  "el-icon-caret-bottom": "exportExcel",
  "el-icon-info": "info",
  "el-icon-connection": "findQrcode",
  "el-icon-top-right": "toQrcodeWsm",
  "el-icon-coordinate": "repush",
  'el-icon-coin':'priceSet',
  'el-icon-sort-up': 'effect',
  'el-icon-sort-down': 'invalid',
  'el-icon-attract': 'reSearch',
  'el-icon-key':'credit'
};

function setDynamicRoutes2(options, child) {
  options = _.sortBy(options, (item) => item.sort);
  options.forEach((c) => {
    child.meta.operating.push({
      hidden: c.hidden,
      id: c.id,
      name: c.name,
      url: c.url,
      icon: c.css,
      sort: c.sort,
      isloading: false,
      appType: c.name === "复制上月计划" ? "copy" : keyMap[c.css],
      remarks: c.remarks ? c.remarks : "",
    });
  });
}

const permission = {
  state: {
    routePaths: [],
    isInit: true,
    routers:
      process.env.VUE_APP_ENV === "ATLS" ? atlsRouterMap : constantRouterMap,
    addRouters: [],
    currentMenuId: process.env.MENU_ID, // 当前应用所在父应用当中所配菜单的菜单id
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      const routerMap =
        process.env.VUE_APP_ENV === "ATLS" ? atlsRouterMap : constantRouterMap;
      state.routers = routerMap.concat(routers || []);
    },
    SET_MENUID: (state, parentId) => {
      state.currentMenuId = parentId;
    },
    init(state) {
      state.isInit = false;
    },
    SET_ROUTER_PATHS: (state, routePaths) => {
      state.routePaths = routePaths;
    },
  },
  actions: {
    GenerateRoutes({ commit, state }, menuList) {
      return new Promise((resolve) => {
        //        window.$httpRequest('GET_CHILD_TREE', 'post', { parentId: state.currentMenuId }).then(res => {
        //        const accessedRouters = addDynamicMenuRoutes(menuList, [], [])
        const { routes, routePaths } = addDynamicMenuRoutes1(menuList, [], []);
        // const accessedRouters1 = filterAsyncRouter(asyncRouterMap, permissions)
        //          //console.log(accessedRouters)
        commit("SET_ROUTERS", routes);
        commit("SET_ROUTER_PATHS", routePaths);
        if (window) {
          window.routePaths = routePaths;
        }
        resolve(routes);
        //        }).catch(err => {
        //          //console.log(err)
        //        })
      });
    },
    init({ commit }) {
      commit("init");
    },
  },
};
export default permission;
