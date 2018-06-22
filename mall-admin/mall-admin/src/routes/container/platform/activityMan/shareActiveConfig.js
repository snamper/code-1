"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router'
// import { routerRedux } from 'dva/router'
import { Upload, Breadcrumb, Icon, Input } from 'antd';
// import queryString from 'query-string';
import config from '@/utils/config'
import DataTabel from '@/components/DataTabel';//引入表格方法
import FilterItem from '@/components/FilterItem';//引入搜索方法
// import styles from './activityaway.less'
//活动管理-分享活动配置
// const confirm = Modal.confirm;
const shareActivity = ({
  shareActivityConfigModul,
  loading,
  dispatch, 
  location
})=>{
  // const { pathname, query } = location;
  // const handleRefresh = (pathname,newQuery) => {
  // 	console.log(pathname,query)
  //   dispatch(routerRedux.push({
  //     pathname,
  //     search: queryString.stringify({
  //       ...newQuery,
  //     }),
  //   }))
  // }
  // const modalProps = {
  //   currentItem:packList.currentItem,
  //   handleRefresh:handleRefresh
  // }
  
  const uploadMainImgButton = ( //分享图标
    <div>
      <Icon type={shareActivityConfigModul.loading && shareActivityConfigModul.mainImgUrl ? 'loading' : 'plus'} />
    </div>
  )
  const changeListImg = (info,source) => { 
    console.log(info)
    if (info.file.status === 'uploading') {
      dispatch({type:'addGoodsModel/imgUpload',payload:{loading:true}})
      return;
    }
    if (info.file.status === 'done') {
      switch (source) {
        case 'list':
          dispatch({type:'shareActivityConfigModul/listImgUpload',payload:{loading:false,listImgUrl:info.file.response.data.httpsPath}})
          break;
        case 'main':
          dispatch({type:'shareActivityConfigModul/mainImgUpload',payload:{loading:false,mainImgUrl:info.file.response.data.httpsPath}})
          break;
        default:
          return false;
      }
      
    }
  }
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(shareActivityConfigModul.currentPage-1)*shareActivityConfigModul.pageSize+index+1}</span>)
  }, {
    title: '活动名称',
    dataIndex: 'channelName',
    key: 'channelName',
    className:'channelName',
  },{
    title: '分享标题',
    dataIndex: 'createTime',
    key: 'createTime',
    render:(text,record,index) => (<Input min="1" max="50" placeholder="请输入分享标题" />)
  },{
    title: '分享副标题',
    dataIndex: 'linkMan',
    key: 'linkMan',
    render:(text,record,index) => (<Input placeholder="请输入分享副标题" />)
  },{
    title: '分享图片',
    key: 'action',
    render: (text, record) => (
      <div style={{width:'100',marginLeft:'15%'}}>
        <Upload
          name="imageFile"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={config.api.uploadImg}
          onChange={(info) => changeListImg(info,'list')}
        >
          {shareActivityConfigModul.listImgUrl ? <img src={shareActivityConfigModul.listImgUrl} alt="avatar" /> : uploadMainImgButton}
        </Upload>
      </div>
    ),
  }];
  //删除操作
  // const packLisDelFnClick = (packsId) => {
  //   confirm({
  //     title: '您确定执行此次操作吗？',
  //     okText:'确定',
  //     cancelText:'取消',
  //     onOk() {
  //       dispatch({type:'packList/packLisDelFn',packsId:packsId})
  //       .then((result) => {
  //     	  if(result.message !== '成功'){
  //           message.error(result.message);
  //           return;
  //     	  }
  //         dispatch({type:'packList/query',pageNo:activityPutawayList.currentPage,pageSize:activityPutawayList.pageSize})
  //       })
  //     },
  //     onCancel() {
  //       console.log('取消了')
  //     },
  //   });
  // }
  const filterProps = {//搜索过滤的方法
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'活动名称',
        name:'member',
        type:'input'
      }
    ]
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
    dataSource:shareActivityConfigModul.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:shareActivityConfigModul.currentPage, //当前页码
      total:shareActivityConfigModul.totalSize,  //总条数
      defaultPageSize:shareActivityConfigModul.pageSize  //当前每页显示条数
    }
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>分享活动配置</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps} />
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({shareActivityConfigModul,loading})=>({shareActivityConfigModul,loading}))(shareActivity);
//类型检测
shareActivity.protoTypes = {
  shareActivityConfigModul:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};