import React from 'react';
import PropTypes from 'prop-types';
import {Layout,Menu,Icon,message} from 'antd';
import { routerRedux } from 'dva/router'
import styles from './index.less';

const { Header} = Layout;
const { SubMenu } = Menu;

const Head = ({app,dispatch}) => {
  function toggle(){
    dispatch({type:"app/toggle"});
  }
  const logout = () => {
    dispatch({type:"app/logout"}).then((result) => {
      if(result.message === '成功'){
        message.success('退出成功',1,dispatch(routerRedux.push({
          pathname:'/login'
        })))
      }else{
        message.error(result.message)
      }
    })
  }
  return ( 
  <Header className={styles.header_wrap} >
    <Icon 
    className={[styles.trigger,styles.left]}
    type={app.collapsed ? 'menu-unfold':'menu-fold'}
    onClick={ toggle } 
    />
      <Menu mode='horizontal' className={styles.drap_menu_wrap}>
        <SubMenu className={styles.sub_menu} title={
          <span className={styles.drap_nav} >
            <Icon type='user'/>
            {app.userName}
          </span>
        }>
          <Menu.Item key='logout' onClick={() => logout()}>
            退出登录
          </Menu.Item>
        </SubMenu>            
      </Menu>
  </Header>
  );
};
Head.propTypes = {
  app:PropTypes.object,
  dispatch:PropTypes.func,
}
export default Head;

