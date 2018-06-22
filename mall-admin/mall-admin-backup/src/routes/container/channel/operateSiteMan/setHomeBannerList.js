"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import { Table, Breadcrumb, Button, Input, Switch, message, Form, Modal } from 'antd'; //子页面内需要引入的UI模块
import styles from './index.less' //引入样式
import SetHomeBannerDialog from './setHomeBannerDialog'
const confirm = Modal.confirm;
/*运营位管理-渠道首页banner管理*/
const channelHomeBannerMan = ({
  setBannerLis,
  loading,
  dispatch,
  location,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
})=>{
  const columns = [{
    title: '排序',
    dataIndex: 'banner_sore',
    key: 'banner_sore',
    render: (text, record, index) => (
    	<span>{
        !record.insert?
          setBannerLis.editSort && record.status!==1?
          getFieldDecorator('banner_sore'+record.id, {
            initialValue: text,
            rules: [{ required: true, message:'请输入正确的排序！', pattern:/^[0-9]*$/ }],
          })(
            <Input size={"small"} style={{maxWidth:80}} />
          )
        :text
      :'默认'
      }</span>
    ),
  }, {
    title: '图片',
    dataIndex: 'img_url',
    key: 'img_url',
    render: (text, record, index) => (
      // eslint-disable-next-line
    	<span>{text?<img style={{maxWidth:80,maxHeight:80}} src={text} />:'当没有banner时显示'}</span>
    ),
  }, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: (text, record, index) => (
    	<span>{!record.insert?text:'当没有banner时显示'}</span>
    ),
  }, {
    title: '上/下架时间',
    dataIndex: 'start_time',
    key: 'start_time',
    render: (text, record, index) => (
    	<span>{record.start_time}-{record.end_time}</span>
    ),
    className: styles.tableTextCtnter,
  }, {
    title: '开关',
    dataIndex: 'switch_status',
    key: 'switch_status',
    render: (text, record, index) => (
      <span>
        {
          record.id?
            text === '0'?<Switch style={{maxWidth:50}} defaultChecked={false} onChange={() => swithOption({id:record.id,switchStatus:1})} />
            :<Switch style={{maxWidth:50}} defaultChecked onChange={() => swithOption({id:record.id,switchStatus:0})} />
          :''
        }
      </span>
    ),
    className: styles.tableTextCtnter,
  }, {
    title: 'banner状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record, index) => (
    	<span>
    	  {
          !record.insert?
          text === '0'?'未上线':text === '1'?'进行中':text === '2'?'已上线':text === '3'?'已结束':text === '4'?'已下线':''
          :''
        }
    	</span>
    ),
    className: styles.tableTextCtnter,
  }, {
    title: '操作',
    key: 'action',
    render: (text, record, index) => (
      <span>{record.id || record.insert?<a onClick={() => {dispatch({type:'setBannerLis/showHomeBannerDialog',bannerDetail:record})}}>设置</a>:''}</span>
    ),
    className: styles.tableTextCtnter,
  }];
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const checkMessage = (validateFieldsAndScroll) => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        message.error("请输入正确的排序！")
      }else{
        // const reg = /^\+?[1-9][0-9]*$/
        let data = {}
        let bannerInfo = [];
        console.log(values)
        const fieldsValue = values;
        for(let key in values){
          let flag = true;
          for(let key1 in fieldsValue){
            if(key !== key1 && Number(values[key]) === Number(fieldsValue[key1])) flag = false
          }
          if(!flag) {
            message.destroy();
            message.error("排序号不可重复")
            return;
          }
          bannerInfo.push({
            id:key.split("banner_sore")[1],
            sort:values[key]
          })
        }
        data.bannerInfo = bannerInfo;
        console.log(data)    
        dispatch({type:'setBannerLis/editorSort',data})
        .then((result) => {
          if(result.message !== '成功'){
            message.error(result.message)
            return;
          }
          message.success("保存成功！",1,dispatch({type:'setBannerLis/query',payload:{channelId:setBannerLis.channelId}}))
        })
      }
    })
  }
  const swithOption = (payload) => {
    dispatch({type:'setBannerLis/changeStatus',payload})
    .then((result) => {
      if(result.message !== '成功'){
        message.error(result.message);
        return;
      }
      message.success("修改成功！",1,handleRefresh())
    })
  };
  const confirmPublish = () => {
    confirm({
      title: '您确定要发布吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        let bannerIds = '';
        const dataSource = setBannerLis.dataSource;
        dataSource.map((item,index) => (
          <span>{item.id ? index>0 ? bannerIds += ","+item.id : bannerIds += item.id : ''}</span>
        ))
        dispatch({type:'setBannerLis/releaseBtn',bannerIds})
        .then((result) => {
          if(result.message !== '成功'){
            message.error(result.message);
            return;
          }
          message.success("发布成功！",1,dispatch({type:'setBannerLis/query',payload:{channelId:setBannerLis.channelId}}))
          
        })
      },
      onCancel() {
        
      },
    });
  }
  return (
    <div>
	  
	  <div className={styles.clearfix} style={{marginBottom: 15}}>
      <Breadcrumb separator=">" style={{marginBottom:16,float:'left'}}>
        <Breadcrumb.Item>运营位管理</Breadcrumb.Item>
        <Breadcrumb.Item>渠道首页banner管理</Breadcrumb.Item>
        <Breadcrumb.Item>banner设置列表</Breadcrumb.Item>
      </Breadcrumb>
      
	  	<Button className={styles.right} style={{marginLeft: 20}} type="primary" onClick={()=>confirmPublish()}>发布</Button>
      {!setBannerLis.editSort?
      	<Button className={styles.right} type="primary" onClick={()=>{dispatch({type:'setBannerLis/updateSort'})}}>编辑排序</Button>:
      	<span>
        <Button className={styles.right} style={{marginLeft: 20}} type="primary" onClick={()=>checkMessage(validateFieldsAndScroll)}>保存</Button>
        <Button className={styles.right}  type="primary" onClick={()=>{dispatch({type:'setBannerLis/cancelSort'})}}>取消编辑</Button>
      	</span>
      }
	  
	  </div>
      <Table columns={columns} rowKey={record => record.id} dataSource={setBannerLis.dataSource} pagination={false} bordered={true} />
      <SetHomeBannerDialog />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({setBannerLis,loading})=>({setBannerLis,loading}))(Form.create()(channelHomeBannerMan));
//类型检测
channelHomeBannerMan.protoTypes = {
  setBannerLis:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};