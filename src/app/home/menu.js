/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-02-10 09:36:26
 * @LastEditTime: 2020-03-18 16:16:19
 */
export const menus = [
	{
		name: 'demo',
		url: 'demo',
		icon: 'appstore',
		children: [
			{
				name: 'demo',
				icon: 'appstore',
				url: '/demo/list'
			}
		]
	},
	{
		name: '积分',
		url: 'credit',
		icon: 'appstore',
		children: [
			{
				name: '积分记录查询',
				icon: 'appstore',
				url: '/credit/logger'
			}
		]
	},
	{
		name: 'ecard卡',
		url: 'ecard',
		icon: 'appstore',
		children: [
			{
				name: 'ecard卡类型配置',
				icon: 'appstore',
				url: '/ecard/configuration/list'
			},
			{
				name: '活动折扣',
				icon: 'appstore',
				url: '/ecard/discounts/list'
			}
		]
	}
]