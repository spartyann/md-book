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

	{
		path: '/consult/:consultId',
		name: 'Consult',
		component: Consult
	},
	
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
