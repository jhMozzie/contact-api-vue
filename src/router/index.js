import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactListView from "../views/ContactListView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/contacts",
        name: "contacts",
        component: ContactListView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;