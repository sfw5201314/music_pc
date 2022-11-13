/**
  ts版本的路由

 */

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

import Main from '../components/Main.vue'
import ContainerMainFind from '../pages/ContainerMainFind.vue'
import ContainerMainVideo from '../pages/ContainerMainVideo.vue'
import SearchList from '@/pages/SearchList.vue'

/**
 * 定义路由模
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'main'
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect: '/ContainerMainFind',
    children: [
      {
        path: '/ContainerMainFind',
        name: 'ContainerMainFind',
        component: ContainerMainFind
      },
      {
        path: '/ContainerMainVideo',
        name: 'ContainerMainVideo',
        component: ContainerMainVideo
      },
      {
        path: '/SearchList',
        name: 'SearchList',
        component: SearchList
      }
    ]
  }
]

/**
 * 定义返回模块
 */
const router = createRouter({
  history: createWebHistory('/#/'), // 设置为history模式，就是路径里面没有#,  createWebHashHistory 是默认的，括号里面的就是基础路径，可以理解为项目名称，就是请求路径的基础url
  routes
})

export default router
