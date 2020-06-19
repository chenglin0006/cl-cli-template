const url = {
	development: {
		targetUrl: 'http://customer-dev.bnq.com.cn',
		apiUrl: 'http://web.futureshop.dev-zt.bnq.com.cn:8088',
		apiUrlFilter: '/customerAdmin',
		authUrl: 'http://auth-dev.bnq.com.cn',
		loginAddress: 'http://auth-dev.bnq.com.cn/login/login.html',
		authUrlFilter: '/auth',
		port: 8088,
		autoOpenBrowser: true, 
		proxyFilter: '/customerAdmin',
        addressUrl:'http://web.futureshop.dev-zt.bnq.com.cn:8088/areas/district',
	},
	prodDev: {
		apiUrl: 'http://192.168.200.54:8080/',
		apiUrlFilter: '/productAdmin',
		addressUrl:'http://customer-dev.bnq.com.cn/areas/district',
		authUrl: 'http://auth-dev.bnq.com.cn',
		loginAddress: 'http://auth-dev.bnq.com.cn/login/login.html',
		authUrlFilter: '/auth'
	},
	test: {
		apiUrl: 'http://customer-test.bnq.com.cn',
		apiUrlFilter: '/customerAdmin',
		addressUrl:'http://customer-test.bnq.com.cn/areas/district',
		authUrl: 'http://auth-test.bnq.com.cn',
		loginAddress: 'http://auth-test.bnq.com.cn/login/login.html',
		authUrlFilter: '/auth'
	},
	production: {
		apiUrl: 'http://customer.bnq.com.cn',
		apiUrlFilter: '/customerAdmin',
		addressUrl:'http://customer.bnq.com.cn/areas/district',
		authUrl: 'http://auth.bnq.com.cn',
		loginAddress: 'http://auth.bnq.com.cn/login/login.html',
		authUrlFilter: '/auth'
  }
}

module.exports = url;