import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditTaskView from '../views/EditTaskView.vue'
import FilterTaskView from '../views/FilterTasksView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/create',
            name: 'create',
            component: () => import('../views/CreateTaskView.vue')
        },
        {
            path: '/edit/:taskId',
            name: 'edit',
            component: EditTaskView
        },
        {
            path: "/filter",
            name: 'filter',
            component: FilterTaskView
        }
    ]
})

export default router
