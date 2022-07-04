import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Search = () => import('@/views/Search')
const News = () => import('@/views/News')
const My = () => import('@/views/My')
const City = () => import('@/views/City')
const Login = () => import('@/views/Login')
const House = () => import('@/views/House')
const Manage = () => import('@/views/Manage')
const Rental = () => import('@/views/Rental')
const Map = () => import('@/views/Map')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'search', component: Search },
      { path: 'news', component: News },
      { path: 'my', component: My, name: 'my' }
    ]
  },
  { path: '/city', component: City },
  { path: '/login', component: Login },
  { path: '/house/:id', component: House, name: 'house', props: true },
  { path: '/manage', component: Manage },
  { path: '/rental', component: Rental },
  { path: '/map', component: Map }

]

const router = new VueRouter({
  routes
})

export default router
