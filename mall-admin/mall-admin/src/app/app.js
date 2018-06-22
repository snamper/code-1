"use strict";
/** global window */
/* global document */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {withRouter} from 'dva/router';
import {openPages } from '@/utils/config';
import Master from '@/components/Master';

const App = ({
  loading,app,dispatch,children,location
}) =>{ 
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (openPages && openPages.includes(pathname)) {
    return (<div>
      {children}
    </div>)
  }
  return(
    <Master location={location} app={app} children={children} dispatch={dispatch} loading={loading}/>
  )
};
App.propTypes = {
  loading:PropTypes.object,
  app:PropTypes.object,
  dispatch:PropTypes.func,
  location:PropTypes.object,
  children:PropTypes.object,
};
export default withRouter(connect(({app,loading})=>({app,loading}))(App));