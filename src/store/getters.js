/*
 * @Author: SoOnPerson
 * @Date: 2021-04-17 15:12:06
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-18 22:16:49
 * @Descripttion:
 */

const getters = {
  menu: state => state.permission.menuList,
  collapse: state => state.app.collapse
}
export default getters
