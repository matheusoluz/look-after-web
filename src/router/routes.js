
const routes = [
  {
    path: '/',
    component: () => import('layouts/index.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: { rule: 'isEveryone' }
      },
      {
        path: '/products',
        component: () => import('pages/produtcs/list.vue'),
        meta: { rule: 'isEveryone' }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
