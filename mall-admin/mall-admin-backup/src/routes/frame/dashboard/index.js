"use strict";
import React from 'react';
//import { Icon } from 'antd';
import styles from './index.less';
import { welcome } from '@/utils/config'

const Dashboard = () => (<div className={styles.wrap}>
  <div className={styles.content}>{welcome}</div></div>
);

export default Dashboard;
