import Vue from 'vue'
import App from './App.vue'
import './assets/main.css'
import Pagination from 'vue-pagination-2';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import PostsView from './components/PostsView.vue'
import Game from './components/Game.vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component('pagination', Pagination);
Vue.use(VueRouter);

 export const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    { path: '/posts', component: PostsView, name:'posts' },
    { path: '/game', component: Game, name:'game' }
  ],
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')