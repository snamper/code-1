import React from 'react';
import PropTypes from 'prop-types';
import { Switch,Route,routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from '@/app/app';
import merchant from './merchant';
import platform from './platform';

const { ConnectedRouter } = routerRedux;

const Routers = function({history,app}){
  const error = dynamic({
  	app,
    component:()=> import('@/routes/frame/error')
  });
  const welcome = dynamic({
    app,
    component:()=> import('@/routes/frame/dashboard')
  });
  const login = dynamic({
    app,
    component:()=> import('@/routes/frame/login'),
    models: () => [import('@/models/frame/login')],
  });
  //动态加载content routes
  const userType = localStorage.getItem("userType");
  let routes;
  if(userType === "1"){ //平台端
    routes = platform;
  }else if(userType === "2"){ //商户端
    routes = merchant;
  }else{
    routes = [];
  }
  //let routes = localStorage.getItem("userType") === "1"?platemRouter:merchantRouter;
  //const routes = merchant;
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={welcome} />)} />
          <Route exact path="/login" component={login} />
          {
            routes.map(({path,...dynamics},key)=>(
              <Route key={key}
                exact 
                path = {path}
                component = {
                  dynamic({
                    app,
                    ...dynamics,
                  })
                }
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
};
Routers.PropTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;