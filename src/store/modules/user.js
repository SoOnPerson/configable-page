/**
 Created by IntelliJ IDEA.
 User: jerry
 Date: 2020-03-13
 Time: 16:07
 */
import {
	userApi
} from '@/api'


const {
	login,
	logout,
	getInfo
} = userApi
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth'
import router from '@/router'
import Storage from '@/utils/storage'


const state = {
	token: getToken(),
	name: '',
	avatar: '',
	introduction: '',
	roles: [
		'admin',
		'root'
	],
	userInfo: Storage.l.get('userInfo', true)
}
const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USERINFO: (state, data) => {
		state.userInfo = data
	},
	SET_INTRODUCTION: (state, introduction) => {
		state.introduction = introduction
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	}
}
const actions = {
	// user login
	async login({
		commit
	}, userInfo) {
		//    const { username, password } = { username : userInfo.get('username') ,password : userInfo.get('password')  }
		try {
			const res = await login({
				...userInfo.form,
				showLoading: true
			})
			if (!res.access_token) throw new Error(res)
			commit('SET_TOKEN', res.access_token)
			setToken(res.access_token, userInfo.rememberme)
			return Promise.resolve(res)
		} catch (e) {
			//console.log(e)
		}
	},
	// get user info
	getInfo({
		commit,
		state,
		dispatch,
		rootState,
		rootGetters
	}) {
		return getInfo().then(response => {
			commit('SET_USERINFO', response)
			window.$httpRequest.get(`user-center/menus/systemType?tenantId=${process.env.VUE_APP_ENV === 'development'
			                                                                 ? 'FAC'
			                                                                 : process.env.VUE_APP_ENV}`).then(res => {
				dispatch('app/setEnum', {
					key: 'systemType',
					value: res
				}, {
					root: true
				})
				rootState['systemType'] = res
			})
			return response
		})
	},
	// user logout
	logout({
		commit,
		state,
		dispatch
	}) {
		return new Promise((resolve, reject) => {
			commit('SET_TOKEN', '')
			commit('SET_ROLES', [])
			removeToken()
			// dispatch('tagsView/delAllViews', null, { root: true });
			resolve()
		})
	},
	// remove token
	resetToken({
		commit
	}) {
		return new Promise(resolve => {
			commit('SET_TOKEN', '')
			commit('SET_ROLES', [])
			removeToken()
			resolve()
		})
	},
	// dynamically modify permissions
	changeRoles({
		commit,
		dispatch
	}, role) {
		return new Promise(async resolve => {
			const token = role + '-token'
			commit('SET_TOKEN', token)
			setToken(token)
			const {
				roles
			} = await dispatch('getInfo')
			// generate accessible routes map based on roles
			const accessRoutes = await dispatch('permission/generateRoutes', roles, {
				root: true
			})
			// dynamically add accessible routes
			router.addRoutes(accessRoutes)
			// reset visited views and cached views
			dispatch('tagsView/delAllViews', null, {
				root: true
			})
			resolve()
		})
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
