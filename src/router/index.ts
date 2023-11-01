import {createRouter,createWebHistory,RouteRecordRaw,Router}  from 'vue-router'

import Layout from '../layout/index.vue'

const routes: Array<RouteRecordRaw> = [{
    path:'/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../view/decision/index.vue'),
      },
      {
        path: '/variable',
        name: 'variable',
        component: () => import('../view/variable/index.vue'),
      },
    ]
},{
  path:'/policyprojectadd',
  component: () => import('../view/policy/index.vue'),
  children: []
}]

const router:Router = createRouter({
    history: createWebHistory(),
    routes
})

export default router