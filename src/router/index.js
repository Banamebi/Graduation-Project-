// 配置路由

import React, { Component } from "react";
import 'antd-mobile/dist/antd-mobile.css';

// 路由依赖
import { HashRouter, Switch, Redirect, Route } from "react-router-dom";
// 异步组件
import AsyncComponent from "../util/asyncComponent";

// 引入共同的样式问题
import "../common/less/base.css";

// 组件页面
const Home = AsyncComponent(() => import("../pages/home"));
const Category = AsyncComponent(() => import("../pages/category"));
const Cart = AsyncComponent(() => import("../pages/cart"));
const My = AsyncComponent(() => import("../pages/my"));
const Detail = AsyncComponent(() => import("../pages/detail"));
const Login = AsyncComponent(() => import("../pages/login"));

const routerList = [
  { path: "/", exact: true, component: Home },
  { path: "/category", exact: false, component: Category },
  { path: "/cart", exact: false, component: Cart },
  { path: "/my", exact: false, component: My },
  { path: "/detail", exact: false, component: Detail },
  { path: "/login", exact: false, component: Login },
];

class RouteConfig extends Component {
  
  render() {
    return (
      <HashRouter>
        <Switch>
          {routerList.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                exact={item.exact}
                component={item.component}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default RouteConfig;
