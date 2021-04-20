/*
 * @Author: SoOnPerson
 * @Date: 2021-04-17 15:12:06
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-19 18:58:45
 * @Descripttion:
 */

const getters = {
  menu: state => state.permission.menuList,
  collapse: state => state.app.collapse,
  cachedViews: state => state.routeTag.cachedViews,
  visitedViews: state => state.routeTag.visitedViews
}
export default getters
