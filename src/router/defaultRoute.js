export default [
  {
    name: 'home',
    path: '/',
    meta: {
      id: -10,
      title: '首页',
      sort: 1
    },
    redirect: '/home',
    component: () => import('@/layout/MainLayout.vue'),
    children: [
      {
        name: 'homePage',
        path: '/home',
        meta: {
          id: -11,
          title: '首页',
          sort: 1
        },
        component: () => import('@/layout/PublicLayout.vue')
      }
    ]
  }
]