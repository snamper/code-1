'use strict';
import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

const Loader = ()=>(
    <div className={styles.loader}>
      <Spin tip='Loading...' size='large'/>
    </div>
);
export default Loader
