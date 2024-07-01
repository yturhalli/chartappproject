import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import SignInView from '../views/SignInView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
