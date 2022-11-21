import { createRouter, createWebHashHistory } from 'vue-router'
import RegistroView from '../views/RegistroView.vue'

const routes = [
	{
		path: '/',
		name: 'registro',
		component: RegistroView
	},
	{
		path: '/personal',
		name: 'personal',
		component: () => import('../views/PersonalView.vue')
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
