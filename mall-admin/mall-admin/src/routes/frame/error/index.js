"use strict";
import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';

const Error = () => (<div className={styles.error}>
    <Icon spin={ true } className={styles.anticon} type="frown-o" />
    <h1>404 Not Found</h1>
  </div>)

export default Error
