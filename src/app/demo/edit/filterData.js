export const filterData = (option) => [
	{
		id: 'customerName',
        name: '姓名',
        rules: [{
            required: true,
            message: 'fdaf'
        }]
	},
	{
		id: 'mobile',
		name: '手机号'
	},
	{
		id: 'sex',
		enumName: 'sexEnums',
		name: '性别',
        type: 'select',
        data: [{
            id: 'man',
            name: '男'
        },{
            id: 'women',
            name: '女'
        }]
	},
	{
		id: 'registerSourceType',
		enumName: 'registerSource',
		name: '注册源',
		type: 'select'
	},
	{
		id: 'customerStatus',
		enumName: 'customerStatus',
		name: '状态',
		type: 'select'
	},
	{
		id: 'registerTime',
		name: '注册时间',
		type: 'datepicker',
		timeNames: ['registerTimeStart', 'registerTimeEnd']
	},
	{
	    type: 'cascader',
	    linkage: [
	      {
	        id: 'provinceId',
	        name: '省',
	        type: 'select',
            enumName: 'provinces',
            childSelectIds: ['cityId', 'districtId'],
            data: [{
                id: 'shanghai',
                name: '上海'
            },{
                id: 'beijing',
                name: '北京'
            },{
                id: 'hainan',
                name: '海南'
            }]
	      },
	      {
	        id: 'cityId',
	        name: '市',
	        type: 'select',
            enumName: 'citylist',
            childSelectIds: ['districtId'],
            data: option.citys || []
	      },
	      {
	        id: 'districtId',
	        name: '区',
	        type: 'select',
            enumName: 'districts',
            data: option.areas || []
	      }
	    ]
    }
]