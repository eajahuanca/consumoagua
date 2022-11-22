import { createRouter, createWebHashHistory } from 'vue-router'
import RegistroView from '../views/RegistroView.vue'
import PersonalView from '../views/PersonalView.vue'

const routes = [
	{
		path: '/',
		name: 'personal',
		component: PersonalView,
	},
	{
		path: '/registro',
		name: 'registro',
		component: RegistroView,
	},
	{
		path: '/reporte',
		name: 'reporte',
		component: () => import('../views/ReporteView.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
