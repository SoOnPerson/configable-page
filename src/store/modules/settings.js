/*
 * @Author: SoOnPerson
 * @Date: 2020-09-07 14:39:22
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-03-24 17:08:35
 * @Descripttion: 
 */
import elementVariables from '@/assets/scss/element-variables.scss'
//import overrides from '@/assets/scss/_modules/_overrides.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo, theme } = defaultSettings
const state = {
	theme: theme,
	showSettings: showSettings,
	tagsView: tagsView,
	fixedHeader: fixedHeader,
	sidebarLogo: sidebarLogo,
	searchLayout: {
		xs:24,
		sm:12,
		md:8,
		lg:6,
		xl:6,
		gutter: 0,
		labelWidth: '120px'
	}
}
const mutations = {
	CHANGE_SETTING: (state, { key, value }) => {
		if (state.hasOwnProperty(key)) {
			switch (key) {
				case 'theme':
					window.localStorage.setItem('theme', value)
					break;
			}
			state[key] = value
		}
	}
}
const actions = {
	changeSetting({ commit }, data){
		commit('CHANGE_SETTING', data)
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}

