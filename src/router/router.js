import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Todo from '@/components/Todo'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "signup",
      component: Signup
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    // カスタム文字列にユーザーUIDを設定して、Todoに遷移する
    {
      path: '/todo/:id',
      name: 'todo',
      component: Todo,
    }
  ]
});

export default router