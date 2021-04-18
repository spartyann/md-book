import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Clients from '../pages/Client/Clients'
import Client from '../pages/Client/Client'
import MyAccount from '../pages/MyAccount'
import Test from '../pages/Test'
import Consult from '../pages/Consult/Consult'
import WikiHome from '../pages/Wiki/Home'

Vue.use(VueRouter)

const routes = [
	{
		path: '/test',
		name: 'Test',
		component: Test
	},
	{
		path: '/',
		name: 'Home',
		component: Home
	},

	// Login / Register

	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	},

	// homes

	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard
	},
	{
		path: '/my_account',
		name: 'MyAccount',
		component: MyAccount
	},

	// Client

	{
		path: '/clients',
		name: 'Clients',
		component: Clients
	},
	{
		path: '/client/:clientId',
		name: 'Client',
		component: Client
	},

	// Consult

	{
		path: '/consult/:consultId',
		name: 'Consult',
		component: Consult
	},

	// Wiki
	{
		path: '/wiki',
		name: 'WikiHome',
		component: WikiHome,
		meta: { fullBody: true }
	},
	{
		path: '/wiki/:pageId',
		name: 'WikiPage',
		component: WikiHome,
		meta: { fullBody: true }
	},
	
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
