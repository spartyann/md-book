import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import Dashboard from '../views/Dashboard'
import Clients from '../views/Client/Clients'
import Client from '../views/Client/Client'
import MyAccount from '../views/MyAccount'
import Test from '../views/Test'
import Consult from '../views/Consult/Consult'

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
