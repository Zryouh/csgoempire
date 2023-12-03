import { createRouter, createWebHistory } from "vue-router";
import Leaderboard from "../views/Leaderboard.vue";
import NotFound from "../views/NotFound.vue";
import Schedule from "../views/Schedule.vue";

const routes = [

    {
        path: "/",
        name: "",
        component: Leaderboard,
    },
  
    {
        path: "/leaderboard",
        name: "leaderboard",
        component: Leaderboard,
    },
  
    {
      path: "/schedule",
      name: "schedule",
      component: Schedule,
    },
 
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
