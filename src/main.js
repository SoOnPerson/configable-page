import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/permission'
import "./core/lazy_lib/element"
Vue.config.productionTip = false
// Ant - 全局-路由离开时拦截，看是否需要删除组件缓存
Vue.mixin({
  data: () => {
    return {
      beforeRouteLeaveRefresh: true
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$vnode
      && this.$vnode.parent
      && this.$vnode.parent.componentInstance
      && this.$vnode.parent.componentInstance.keys
      && this.$vnode.parent.componentInstance.cache) {
      const instance = this.$vnode.parent.componentInstance;
      const cachedViews = this.$store.getters.cachedViews // 缓存的标签
      var redirectPath = ('/redirect' + from.path) == to.path
      if (redirectPath) {
        this.beforeRouteLeaveRefresh = false;
        setTimeout(() => {
          this.beforeRouteLeaveRefresh = true;
        }, 10);
        next(false)
        return
      }
      // 在store的cache里能找到缓存的记录，就保留
      instance.keys = instance.keys.filter(key => {
        // 实际缓存的组件，在store里面已经没有了 需要过滤掉
        var res = cachedViews.findIndex(view => view.fullPath == key) > -1
        // 特殊路径的跳转，需要刷新目标组件
        if (!res) {
          instance.cache[key].componentInstance.$destroy()
          delete instance.cache[key]
        }
        return res
      })
    }
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
