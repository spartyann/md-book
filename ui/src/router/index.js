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
import WikiShare from '../pages/Wiki/Share'

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
		component: Home,
		meta: { noUserLogged: true }
	},

	// Login / Register

	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: { noUserLogged: true }
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: { noUserLogged: true }
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
		meta: {
			fullBody: true,
			pageHead: {
				title: function(app)
				{
					if (app.wikiPage == null) return null;
					return app.wikiPage.title;
				},/*
				description: function(app)
				{
					if (app.wikiPage == null) return null;
					let desc = app.wikiPage.subTitle; if (desc != "" && app.wikiPage.summary != "") desc += "\n";
					return desc + app.wikiPage.summary;
				}*/
			}
		}
	},
	{
		path: '/share/wiki/:alias',
		name: 'ShareWikiPage',
		component: WikiShare,
		meta: {
			fullBody: true,
			share: true,
			pageHead: {
				title: function(app)
				{
					if (app.wikiPage == null) return null;
					return app.wikiPage.title;
				},/*
				description: function(app)
				{
					if (app.wikiPage == null) return null;
					let desc = app.wikiPage.subTitle; if (desc != "" && app.wikiPage.summary != "") desc += "\n";
					return desc + app.wikiPage.summary;
				}*/
			}
		}
	},
	
	
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
