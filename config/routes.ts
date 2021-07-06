export default [
  {
    exact: true,
    path: '/login',
    component: '@/pages/login',
    title: '登录',
  },
  {
    path: '/',
    component: '@/components/container',
    routes: [
      {
        path: 'topicCategory',
        component: '@/pages/topicCategory',
      },
      {
        path: 'topic',
        component: '@/pages/topic',
      },
      {
        path: 'topicDetail',
        component: '@/pages/topicDetail',
      },
      {
        path: 'user',
        component: '@/pages/user',
      },
      {
        path: 'setting',
        component: '@/pages/setting',
      },
      {
        path: 'home',
        component: '@/pages/home',
      },
      {
        path: 'resource',
        component: '@/pages/resource',
      },
      {
        path: '*',
        component: '@/pages/home',
      },
    ],
  },
];
