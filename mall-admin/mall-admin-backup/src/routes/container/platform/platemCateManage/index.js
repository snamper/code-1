"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Button, Modal, message, Form, Input, Icon} from 'antd';
import DataTabel from '@/components/DataTabel';
const confirm = Modal.confirm;

const channelChooseGoods = ({goodsCate,loading,dispatch,location, form:{
  getFieldsValue,
  getFieldDecorator
}})=>{
  const columns = [{
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
    render:(text,record) => <span>{record.type === 1?text:''}</span>
  }, {
    title: '二级分类',
    dataIndex: 'name',
    key: 'name1',
    render:(text,record) => <span>{
      record.type === 2?text?text:getFieldDecorator('name'+record.id, {
          initialValue:  '',
      })(
        <Input style={{maxWidth:160}} />
      ):''
    }</span>
  }, {
    title: '添加子分类',
    key: 'total',
    render: (text, record,index) => (
      <span>{record.type === 1?<a type="primary" onClick={() => addChild(index,record.id)}>添加子分类</a>:''}</span>
    ),
  },{
    title: '排序',
    // dataIndex: 'sort',
    key: 'id',
    render: (text, record,index) => (
      <span>
        {index === 0 ? '' :<Icon onClick={() => changeSort(record,'up')} type="arrow-up" />}
        { record.type === 1 ?
           index !== goodsCate.dataSource.length -1 ? <Icon onClick={() => changeSort(record,'down')} type="arrow-down" />:'' :
          (record.type === 2 || record.type === 3) && index !== record.len - 1 ? <Icon onClick={() => changeSort(record,'down')} type="arrow-down" /> : ''
        }
      </span>
    ),
  },{
    title: '创建时间',
    dataIndex: 'id',
    key: 'id1',
  },{
    title: '商品数量',
    dataIndex: 'id',
    key: 'id2',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
          <a>编辑</a>
          <a style={{marginLeft:10,color:'red'}}>删除</a>
        </span>
    ),
  }];
  const addChild = (index,id) => {  //添加子分类(现在只操作的二级分类)
    let dataSource = goodsCate.dataSource;
    let childrenList = goodsCate.dataSource[index].children || [];
    childrenList.push({type:2,name:'',sort:childrenList.length+1})
    dataSource[index].children = childrenList
    dispatch({type:'goodsCate/addChild',dataSource})
  }
  const changeSort = (record,source) =>{
    let dataSource = goodsCate.dataSource;
    let itemCurr ;//存储改变顺序之前的当前
    let indexFlag = ''  
    let indexSec = '' //用来存储二级
    if(source === 'up'){  //向上
      let itemPre ; //存储改变顺序之前的上一个
      for(let i = 0; i < goodsCate.dataSource.length; i++){
        const item = goodsCate.dataSource[i];
        const index = i;
        if(record.type === 1){  //如果是一级
          if(Number(record.sort) - 1 === Number(item.sort)){  //上一个
            itemPre = item;
            indexFlag = index
          }
          if(record.sort === item.sort){  //当前的
            itemCurr = item;
          }
        }else{  //二级
          if(record.pid === item.id){ //找到对应的一级
            indexSec = index;
            for(let n = 0; n < item.children.length; n++){
              const item1 = item.children[n];
              const index1 = n;
              if(Number(record.sort) - 1 === Number(item1.sort)){  //上一个
                itemPre = item1;
                indexFlag = index1
              }
              if(record.sort === item1.sort){  //当前的
                itemCurr = item1;
              }
            }
          }
        }
      }
      const sortMiddel = itemPre.sort;
      itemPre.sort = itemCurr.sort
      itemCurr.sort = sortMiddel;
      record.type === 1 ? dataSource.splice(indexFlag,2,itemCurr,itemPre) :
      dataSource[indexSec].children.splice(indexFlag,2,itemCurr,itemPre)
      console.log(dataSource)
      dispatch({type:'goodsCate/changeSort',dataSource})
    }else{    //向下
      let itemNext ; //存储改变顺序之前的下一个
      for(let i = 0; i < goodsCate.dataSource.length; i++){
        const item = goodsCate.dataSource[i];
        const index = i;
        if(record.type === 1){  //如果是一级
          if(Number(record.sort) + 1 === Number(item.sort)){  //上一个
            itemNext = item;
          }
          if(record.sort === item.sort){  //当前的
            itemCurr = item;
            indexFlag = index
          }
        }else{  //二级
          if(record.pid === item.id){ //找到对应的一级
            indexSec = index;
            for(let n = 0; n < goodsCate.dataSource.length; n++){
              const item1 = goodsCate.dataSource[i];
              const index1 = n;
              if(Number(record.sort) + 1 === Number(item1.sort)){  //上一个
                itemNext = item1;
              }
              if(record.sort === item1.sort){  //当前的
                itemCurr = item1;
                indexFlag = index1
              }
            }
          }
        }
      }
      const sortMiddel = itemNext.sort;
      itemNext.sort = itemCurr.sort
      itemCurr.sort = sortMiddel;
      record.type === 1 ? dataSource.splice(indexFlag,2,itemNext,itemCurr) :
      dataSource[indexSec].children.splice(indexFlag,2,itemNext,itemCurr)
      console.log(dataSource)
      dispatch({type:'goodsCate/changeSort',dataSource})
    }

  }
  const onExpand = (expanded, record) => {  //记录列表展开的状态
    const defaultExpandedRowKeys = goodsCate.defaultExpandedRowKeys;
    if(expanded)  defaultExpandedRowKeys.push(record.id);
    else defaultExpandedRowKeys.map((item,index) => {
      return item === record.id?defaultExpandedRowKeys.splice(index,1): ''
    })
    dispatch({
      type:'goodsCate/changeExpandRows',
      defaultExpandedRowKeys
    })
  }
  const confirmModal = () => {
    if(goodsCate.chooseCateIds.length <= 0){
      message.error("请先选择分类")
      return;
    }
    confirm({
      title: '您确定提交吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          dispatch({type:'goodsCate/commitGoodsByCate',channelId:goodsCate.channelId,ids:goodsCate.chooseCateIds})
          .then((result) => {
            if(result.message !== '成功'){
              message.error(result.message);
              return;
            }
            const payload = {
              pageNo:goodsCate.currentPage,
              pageSize:goodsCate.pageSize,
              channelId:goodsCate.channelId
            }
            message.success("提交成功！",1,dispatch({type:'goodsCate/query',payload,source:'clearKeys'}))
            
          })
      },
      onCancel() {
        
      },
    });
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
    dataSource:goodsCate.dataSource,  //tabel数据源
    defaultExpandedRowKeys:goodsCate.defaultExpandedRowKeys,
    onExpand:onExpand,
    defaultExpandAllRows:goodsCate.defaultExpandAllRows,  //
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:goodsCate.currentPage, //当前页码
      total:goodsCate.totalSize,  //总条数
      defaultPageSize:goodsCate.pageSize  //当前每页显示条数
    }
  }
  const expandAllRows = () => {
    dispatch({type:'goodsCate/expandAllRows'})
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>分类管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" style={{float:'right'}} onClick={() => confirmModal()}>保存</Button>
        <Button type="primary" style={{float:'right',marginRight:10}} onClick={() => expandAllRows()}>全部展开</Button>
        <Button type="primary" style={{float:'right',marginRight:10}} onClick={() => confirmModal()}>新增分类</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <DataTabel {...tabelProps} />

    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({goodsCate,loading})=>({goodsCate,loading}))(Form.create()(channelChooseGoods));
//类型检测
channelChooseGoods.protoTypes = {
  goodsCate:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};