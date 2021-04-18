/*
 * @Author: SoOnPerson
 * @Date: 2021-04-17 14:00:08
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-18 15:45:18
 * @Descripttion:
 */
import Vue from 'vue'
import Router from 'vue-router'
import defaultRoute from './defaultRoute'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/',
  routes: defaultRoute
})
