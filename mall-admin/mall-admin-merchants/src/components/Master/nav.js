import React from 'react';
import PropTypes from 'prop-types';
import {Layout,Menu,Icon} from 'antd';
import { Link } from 'react-router-dom';
import {logoTitle} from '@/utils/config';
import styles from './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;
const Nav = ({app,dispatch,location})=>{
  const changeOpenKeys = (openKeys) => {
    window.localStorage.setItem(`navOpenKeys`, JSON.stringify(openKeys))
    dispatch({ type: 'app/handleNavOpenKeys', navOpenKeys: openKeys})
  }
  return (
    <Sider breakpoint="lg"
      collapsible
      collapsed = {app.collapsed}
    >
      <div className={styles.logo}>{logoTitle}</div>
      <Menu theme="dark" mode="inline" 
        defaultSelectedKeys={[location.pathname.split("/")[2]]} 
        onOpenChange = {(key) => changeOpenKeys(key)}
        defaultOpenKeys = {app.navOpenKeys}
      >
        {
          app.menuList.map(item => (
            item.children.length <= 0?
            <Menu.Item key={item.key}>
              <Link to={item.route}>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </Link>
            </Menu.Item>
            :
            <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
              {item.children.map(item1 => (
                <Menu.Item key={item1.key}><Link to={item1.route}><span>{item1.name}</span></Link></Menu.Item>
              ))}
            </SubMenu>
            ))
        }        
      </Menu>
    </Sider>
  )
};
Nav.propTypes = {
  app:PropTypes.object,
  dispatch:PropTypes.func,
  location:PropTypes.object
}
export default Nav;
