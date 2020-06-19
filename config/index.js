const url = {
	development: {
		targetUrl: 'http://demo-dev.bnq.com.cn',
		apiUrl: 'http://web.futureshop.dev-zt.bnq.com.cn:8088',
		apiUrlFilter: '/demoAdmin',
		demoUrl: 'http://demo-dev.bnq.com.cn',
		loginAddress: 'http://demo-dev.bnq.com.cn/login/login.html',
		demoUrlFilter: '/demo',
		port: 8088,
		autoOpenBrowser: true, 
		proxyFilter: '/demoAdmin',
        addressUrl:'http://web.futureshop.dev-zt.bnq.com.cn:8088/areas/district',
	},
	prodDev: {
		apiUrl: 'http://192.168.200.54:8080/',
		apiUrlFilter: '/productAdmin',
		addressUrl:'http://demo-dev.bnq.com.cn/areas/district',
		demoUrl: 'http://demo-dev.bnq.com.cn',
		loginAddress: 'http://demo-dev.bnq.com.cn/login/login.html',
		demoUrlFilter: '/demo'
	},
	test: {
		apiUrl: 'http://demo-test.bnq.com.cn',
		apiUrlFilter: '/demoAdmin',
		addressUrl:'http://demo-test.bnq.com.cn/areas/district',
		demoUrl: 'http://demo-test.bnq.com.cn',
		loginAddress: 'http://demo-test.bnq.com.cn/login/login.html',
		demoUrlFilter: '/demo'
	},
	production: {
		apiUrl: 'http://demo.bnq.com.cn',
		apiUrlFilter: '/demoAdmin',
		addressUrl:'http://demo.bnq.com.cn/areas/district',
		demoUrl: 'http://demo.bnq.com.cn',
		loginAddress: 'http://demo.bnq.com.cn/login/login.html',
		demoUrlFilter: '/demo'
  }
}

module.exports = url;