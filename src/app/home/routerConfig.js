export default [
    {
        path: '/',
        exact: true,
        page: () => { return import('../welcome/index'); },
        name: '欢迎',
        breadcrumbs: [{link: '', name: '首页'}]
    }, {
        path: '/permission',
        exact: true,
        page: () => { return import('../permission/index'); },
        name: '权限',
        breadcrumbs: [{link: '', name: '权限'}]
    }, {
        path: '/demo/list',
        exact: true,
        page: () => { return import('../demo/list/index'); },
        name: '测试',
        breadcrumbs: [{link: '', name: '测试'}]
    }, {
        path: '/demo/detail',
        exact: true,
        page: () => { return import('../demo/detail/index'); },
        name: '会员',
        breadcrumbs: [{link: '/demo/list', name: '测试'}, {link: '',name: '查看'}]
    }, {
        path: '/demo/edit',
        exact: true,
        page: () => { return import('../demo/edit/index'); },
        name: '会员',
        breadcrumbs: [{link: '/demo/list', name: '测试'}, {link: '',name: '编辑'}]
    }
];
