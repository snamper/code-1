import React from 'react';
import PropTypes from 'prop-types';
import {Layout} from 'antd';
import {footerText} from '@/utils/config';
import Loader from './../Loader';
import styles from './index.less'; 
import Nav from './nav';
import Head from './head';

const {
  Content,
  Footer
} = Layout;

const Master = ({app,loading,dispatch,children,location})=>{
  return (
  	<Layout>
      <Nav app={app} dispatch={dispatch} location={location}/>
      <Layout>
        <Head app={app} dispatch={dispatch}/>
        <Content breakpoint="lg" className={styles.content_wrap}>
          {loading.global?<Loader />:children}
        </Content>
        <Footer className={styles.footer_wrap}>
          {footerText}
        </Footer>
      </Layout>
  	</Layout>   
  )
};

Master.propTypes = {
  app:PropTypes.object,
  dispatch:PropTypes.func,
  loading:PropTypes.object,
  chidlren:PropTypes.object,
  location:PropTypes.object
}
export default Master;
