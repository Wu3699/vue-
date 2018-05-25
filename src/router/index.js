import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/helloworld'
import Home from '@/components/home'
import VueRouter from 'vue-router'
// import Law from '@/components/law'
import Company from '@/components/company'
import Law from '@/components/law'
import Tender from '@/components/tender'
import Utender from '@/components/utender'
import User from '@/components/user'

// Vue.use(VueRouter)
Vue.use(Router)
export default new Router({
  routes:[
    {
      path:'/home',
      component: Home,
      children:[
         { path:'company',component:Company ,name:'公司信息'},
         { path:'law',component:Law ,name:'法律法规'},
         { path:'tender',component:Tender ,name:'投标信息'},
         { path:'utender',component:Utender ,name:'中标信息'},
         { path:'user',component:User ,name:'用户'},
         { path:'helloworld',component:HelloWorld}         
      ]
    }
  ]
})