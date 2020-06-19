/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-02-10 09:36:26
 * @LastEditTime: 2020-03-23 15:00:37
 */
import React, { Suspense, lazy  } from 'react';
import { Switch, Route } from 'react-router-dom';
import {Spin} from 'antd';
import RouteConfig from './routerConfig';

export default class RouterGenerator {
    static genRouter() {
        const routers = RouterGenerator.getRouters(RouteConfig);
        return (
            <Switch>
                <Suspense id="router" fallback={<Spin />}>
                    {
                        routers.map((route) => {
                            return (
                                <Route
                                    key={route.path}
                                    exact={route.exact}
                                    path={route.path}
                                    component={route.main}
                                />
                            );
                        })
                    }
                </Suspense>
            </Switch>
        );
    }

    static routers = null;

    /**
     *  获取路由
     * @param routerConf
     * @returns {boolean}
     */
    static getRouters(routerConf) {
        if (!RouterGenerator.routers) {
            RouterGenerator.routers = routerConf.map((router) => {
                return {
                    path: router.path,
                    exact: router.exact,
                    main: lazy(router.page),
                };
            });
        }
        return RouterGenerator.routers;
    }
}
