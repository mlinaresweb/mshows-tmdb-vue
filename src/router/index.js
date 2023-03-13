import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/Home.vue";
import ListaSeries from "../components/ListaSeries.vue";
import DetalleSerie from "../components/DetalleSerie.vue";
import AboutView from "../components/About.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/series", component: ListaSeries },
  { path: "/serie/:id", name: "DetalleSerie", component: DetalleSerie },
  {
    path: '/search/:query',
    name: 'SearchResults',
    component: ListaSeries
  },
  
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
