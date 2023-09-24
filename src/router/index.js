import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '@/vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'a',
        component: {
          render: (h) => <h1>a</h1>
        },
      },
      {
        path: 'b',
        component: {
          render: (h) => <h1>b</h1>
        },
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    children: [
      {
        path: 'a',
        component: {
          render: (h) => <h1>about a</h1>
        },
      },
      {
        path: 'b',
        component: {
          render: (h) => <h1>about b</h1>
        },
      },
    ]
  }
]
// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((from, to, next) => {
  console.log(` ================== 1 ================= `, )
  setTimeout(() => {
    next()
  }, 1000)
})

export default router
