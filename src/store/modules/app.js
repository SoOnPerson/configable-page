/**
 Created by IntelliJ IDEA.
 User: jerry
 Date: 2020-03-11
 Time: 22:27
 */
import Cookies from 'js-cookie'


const state = {
	sidebar: {
		opened: Cookies.get('sidebarStatus')
		        ? !!+Cookies.get('sidebarStatus')
		        : true,
		withoutAnimation: false
	},
	device: 'desktop',
	size: Cookies.get('size') || 'medium',
	pickerOptions: {
		disabledDate(){
		}
	},
	enum: {
		employeeIsActive: [
			{
				label: '启用',
				value: 1
			},
			{
				label: '禁用',
				value: 0
			}
		],
		systemType: [],
		isActive: [
			{
				label: '启用',
				value: 'Y'
			},
			{
				label: '禁用',
				value: 'N'
			}
		],
		orderType: [
			{
				label: '销售订单',
				value: 'sale'
			},
			{
				label: '退货订单',
				value: 'returns'
			},
			{
				label: '促销订单,宣传品单',
				value: 'promotion'
			},
			{
				label: '特价订单',
				value: 'special'
			}
		],
		// orderStatus: [
		//     {label: "暂存", value: 'temporary'},
		//     {label: "审核中", value: 'confim_loading'},
		//     {label: "评审中", value: 'review_loading'},
		//     {label: "审核通过", value: 'confim_success'},
		//     {label: "审核驳回", value: 'confim_fail'},
		//     {label: "部分发货", value: 'part_deliver'},
		//     {label: "全部发货", value: 'all_deliver'},
		//     {label: "部分收货", value: 'part_receiving'},
		//     {label: "全部发货", value: 'all_receiving'}
		// ],
		orderStatus: [
			{
				label: '草稿',
				value: 'temporary'
			},
			{
				label: '部门经理审批',
				value: 'manager_confim'
			},
			{
				label: '评审中',
				value: 'review_loading'
			},
			{
				label: '审批拒绝',
				value: 'manager_confim_fail'
			},
			{
				label: '已拆单',
				value: 'demolition'
			},
			{
				label: '作废',
				value: 'cancel'
			},
			{
				label: '全部发货',
				value: 'all_deliver'
			},
			{
				label: '全部收货',
				value: 'all_receiving'
			}
		],
		CirculationStatus: [
			{
				label: '暂存',
				value: 'emporary'
			},
			{
				label: '审核中',
				value: 'confim_loading'
			},
			{
				label: '评审中',
				value: 'review_loading'
			},
			{
				label: '审核通过',
				value: 'confim_success'
			},
			{
				label: '审核驳回',
				value: 'confim_fail'
			},
			{
				label: '部分发货',
				value: 'part_deliver'
			},
			{
				label: '全部发货',
				value: 'all_deliver'
			},
			{
				label: '部分收货',
				value: 'part_receiving'
			},
			{
				label: '全部发货',
				value: 'all_receiving'
			}
		],
		productType: [
			{
				label: '条',
				value: 'STRIP_'
			},
			{
				label: '套',
				value: 'PACKAGE_'
			}
			// {label: "特权物料", value: 'PRIVILEGE_'},
		],
		productTypeNum: [
			{
				label: '条',
				value: 0
			},
			{
				label: '套',
				value: 1
			}
			// {label: "特权物料", value: 2}
		],
		store: {
			productType: [
				{
					label: '条',
					value: 'STRIP_'
				},
				{
					label: '套',
					value: 'PACKAGE_'
				}
			],
			employeeIsActive: [
				{
					label: '启用',
					value: 1
				},
				{
					label: '禁用',
					value: 0
				}
			],
			isActive: [
				{
					label: '启用',
					value: 'Y'
				},
				{
					label: '禁用',
					value: 'N'
				}
			],
			systemType: [],
			orderType: [
				{
					label: '正常采购订单',
					value: 0
				},
				// {label: '商城订单', value: 1},
				{
					label: '代客下单',
					value: 2
				}
			],
			orderStatus: [
				{
					label: '待审核',
					value: 1010
				},
				{
					label: '已提交',
					value: 1020
				},
				// {label: "经销商部分出库", value: 1030},
				{
					label: '经销商已出库',
					value: 1040
				},
				// {label: "门店部分入库", value: 1050},
				{
					label: '门店已入库',
					value: 1060
				},
				// {label: "门店已入库", value: 1070},
				{
					label: '已取消',
					value: 2010
				},
				{
					label: '已驳回',
					value: 2020
				}
			],
			productTypeNum: [
				{
					label: '条',
					value: 0
				},
				{
					label: '套',
					value: 1
				}
				// {label: "特权物料", value: 2}
			],
			mall: {
				//订单类型
				orderLx:[
					{
						label:'普通订单',
						value:1
					},
					{
						label:'团购订单',
						value:2
					},
					{
						label:'积分订单',
						value:3
					},
					{
						label:'砍价订单',
						value:4
					},
					{
						label:'限时抢购订单',
						value:5
					},
					{
						label:'抽奖订单',
						value:6
					},
					{
						label:'景区门票',
						value:7
					},
					// {
					// 	label:'回充订单',
					// 	value:8
					// }
				]
			}

		},
		mall: {
			//订单类型
			orderLx:[
				{
					label:'普通订单',
					value:1
				},
				// {
				// 	label:'团购订单',
				// 	value:2
				// },
				{
					label:'积分订单',
					value:3
				},
				// {
				// 	label:'砍价订单',
				// 	value:4
				// },
				{
					label:'限时抢购订单',
					value:5
				},
				{
					label:'抽奖订单',
					value:6
				},
				// {
				// 	label:'回充订单',
				// 	value:8
				// }
				// {
				// 	label:'景区门票',
				// 	value:7
				// }
			]
		}
	},
	config: {
		validateOptions: {
			pickerOptions1: (params = {}) => {
				return {
					disabledDate(time){
						return params.end
						       ? (time.getTime() <= new Date() - 3600 * 1000 * 24 || time.getTime() >= params.end)
						       : time.getTime() <= Date.now() - 3600 * 1000 * 24
					}
				}
			}
		},
		componentType: [
			{
				label: 'code',
				value: 'viewCode'
			},
			{
				label: '文本框',
				value: 'text'
			},
			{
				label: '多行文本框',
				value: 'textarea'
			},
			{
				label: '下拉单选',
				value: 'select'
			},
			{
				label: '下拉多选',
				value: 'multiple'
			},
			{
				label: '级联选择',
				value: 'cascder'
			},
			{
				label: '年月',
				value: 'month'
			},
			{
				label: '年月日',
				value: 'date'
			},
			{
				label: '年月日时分秒',
				value: 'datetime'
			},
			{
				label: '单选框',
				value: 'checkbox'
			},
			{
				label: '表格',
				value: 'table'
			},
			{
				label: '产品选择组件',
				value: 'products'
			},
			{
				label: '上传图片',
				value: 'uploadImg'
			},
			{
				label: '文件上传',
				value: 'uploadFile'
			},
			{
				label: '文件下载',
				value: 'download'
			},
			{
				label: '上传图片(数组)',
				value: 'uploadImg1'
			},
			{
				label: '富文本框',
				value: 'richText'
			},
			{
				label: '腾讯地图',
				value: 'map'
			}
		]
	},
	tableHeight:'auto',
	collapseExpanedHeight:''
}
const mutations = {
	SET_ENUM: (state, { key, value }) => {
		if (process.env.VUE_APP_ENV === 'DEA') {
			state.enum.store[key] = value
		} else if (process.env.VUE_APP_ENV === 'FAC') {
			state.enum[key] = value
		}
		
	},
	TOGGLE_SIDEBAR: state => {
		state.sidebar.opened = !state.sidebar.opened
		state.sidebar.withoutAnimation = false
		if (state.sidebar.opened) {
			Cookies.set('sidebarStatus', 1)
		} else {
			Cookies.set('sidebarStatus', 0)
		}
	},
	CLOSE_SIDEBAR: (state, withoutAnimation) => {
		Cookies.set('sidebarStatus', 0)
		state.sidebar.opened = false
		state.sidebar.withoutAnimation = withoutAnimation
	},
	TOGGLE_DEVICE: (state, device) => {
		state.device = device
	},
	SET_SIZE: (state, size) => {
		state.size = size
		Cookies.set('size', size)
	},
	SET_TABLE_HEIGHT: (state, size) => {
		state.tableHeight = size
	}
}
const actions = {
	
	SET_TABLE_HEIGHT({ commit },v){
		commit('SET_TABLE_HEIGHT',v)
	},
	
	toggleSideBar({ commit }){
		commit('TOGGLE_SIDEBAR')
	},
	closeSideBar({ commit }, { withoutAnimation }){
		commit('CLOSE_SIDEBAR', withoutAnimation)
	},
	toggleDevice({ commit }, device){
		commit('TOGGLE_DEVICE', device)
	},
	setSize({ commit }, size){
		commit('SET_SIZE', size)
	},
	setEnum({ commit }, { key, value }){
		commit('SET_ENUM', {
			key,
			value
		})
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
