import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createRouter, createWebHistory } from 'vue-router';
import GameList from './components/GameList.vue';
import GameDetail from './components/GameDetail.vue';

library.add(fas);

const routes = [
  { path: '/', component: GameList },
  { path: '/game/:slug', name: 'gameDetail', component: GameDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app');
