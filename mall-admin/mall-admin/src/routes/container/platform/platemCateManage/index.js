"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Button, Modal, message, Form, Input, Icon, Radio } from 'antd';  
// import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import DataTabel from '@/components/DataTabel';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const channelChooseGoods = ({goodsCate,loading,dispatch,location, form:{
  getFieldsValue,
  getFieldDecorator,
  validateFieldsAndScroll
}})=>{
  const { pathname } = location
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname
    }))
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 26 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 11 },
    }
  };
  const columns = [{
    title: '分类名称',
    dataIndex: 'sortName',
    key: 'sortName',
    render:(text,record) => <span>{
      record.sortType === 1?
      goodsCate.editCurrId === record.id || !text?
        getFieldDecorator('sortName', {
          initialValue: text,
          rules: [{ required: true,max:4, message:'请输入4字内分类名称！'}],
        })(
          <Input size={"small"} style={{maxWidth:160}} />
        ):text
      :''
    }</span>
  }, {
    title: '二级分类',
    dataIndex: 'sortName',
    key: 'sortName1',
    render:(text,record) => <span>{
      record.sortType === 2? !text || goodsCate.editCurrId === record.id?getFieldDecorator('sortName', {
          initialValue:  text,
          rules: [{ required: true,max:4, message:'请输入4字内分类名称！'}],
      })(
        <Input size={"small"}  style={{maxWidth:160}} />
      ):text:''
    }</span>
  }, { 
    title: '添加子分类',
    key: 'total',
    render: (text, record,index) => (
      <span>{record.sortType === 1 && record.id?<a type="primary" onClick={() => addChild(index,record)}>添加子分类</a>:''}</span>
    ),
  },{
    title: '排序',
    key: 'id',
    render: (text, record,index) => (
      <span>
        {index === 0 || !record.id ? '' :<Icon style={{cursor:'pointer',marginRight:18}} onClick={() => changeSort(record,'up',index)} type="arrow-up" />}
        { record.sortType === 1  && record.id ?
           index !== goodsCate.dataSource.length -1 ? <Icon style={{cursor:'pointer'}} onClick={() => changeSort(record,'down',index)} type="arrow-down" />:'' :
          (record.sortType === 2 || record.sortType === 3) && index !== record.count - 1  && record.id ? <Icon style={{cursor:'pointer'}} onClick={() => changeSort(record,'down',index)} type="arrow-down" /> : ''
        }
      </span>
    ),
  },{
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },{
    title: '商品数量',
    dataIndex: 'productUsedCount',
    key: 'productUsedCount',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
          {goodsCate.editCurrId === record.id || (record.keyFlag && goodsCate.editCurrKey === record.keyFlag) ?<a onClick={() => confrimEditCate(record)}>确定</a>:<a onClick={() => editCate(record)}>编辑</a>}
          <a style={{marginLeft:10,color:'red'}} onClick={() => delCate(record)}>删除</a>
        </span>
    ),
  }];
  let keyFlag = 1; //为新增的分类添加唯一标识
  const addFirCate = () => {  //增加一级分类
    if(goodsCate.editCurrId || goodsCate.editCurrKey) {
      message.destroy()
      message.error("请点击确认，确认修改内容")
      return;
    }
    dispatch({type:'goodsCate/showModal'})

  }
  const confirmAddFirCate = () => {
    validateFieldsAndScroll((errors,values) => {
      if(!values.firSortName) return;
      let dataSource = goodsCate.dataSource;
      const firCate = {
        sortType:1, //分类层级
        name:values.firSortName,
        sortOrder:dataSource.length > 0 ? dataSource[dataSource.length-1].sortOrder + 1 : 1, 
        property:values.property, 
        sortName:values.firSortName,
      }
      dispatch({type:'goodsCate/saveCateMessage',changeList:[firCate]})
      .then((result) => {
        if(result.message !== '成功'){
          message.error(result.message);
          return;
        }
       message.success('保存成功')
       handleRefresh()
       dispatch({type:'goodsCate/changeListSource',changeList:[]})
       dispatch({type:'goodsCate/hideDialog'})
      })
     
    })
  }
  const addChild = (index,record) => {  //添加子分类(现在只操作的二级分类)
    if(goodsCate.editCurrId || goodsCate.editCurrKey) {
      message.destroy()
      message.error("请点击确认，确认修改内容")
      return;
    }
    let dataSource = goodsCate.dataSource;
    let childrenList = goodsCate.dataSource[index].sortChildren || [];
    const child = { //子元素
      sortType:2, //分类层级
      name:'',
      sortOrder:childrenList.length > 0 ? childrenList[childrenList.length-1].sortOrder + 1 : 1, 
      keyFlag:keyFlag,  //唯一标识，此时没有id  用keyFlag来代替id主键
      fid:record.id,  //父id
      property:record.property,
    }
    childrenList.push(child)
    
    dataSource[index].sortChildren = childrenList

    let defaultExpandedRowKeys = [];
    if(goodsCate.defaultExpandedRowKeys.indexOf(record.id) < 0){
      defaultExpandedRowKeys.push(record.id)
    }else defaultExpandedRowKeys = goodsCate.defaultExpandedRowKeys;
    dispatch({type:'goodsCate/addChild',dataSource,keyFlag:keyFlag})
    // handleRefresh()
    keyFlag++;
    dispatch({
      type:'goodsCate/changeExpandRows',
      defaultExpandedRowKeys
    })
  }
  const editCate = (record) => {
    if(goodsCate.editCurrId || goodsCate.editCurrKey) {
      message.destroy()
      message.error("请点击确认，确认修改内容")
      return;
    }
    dispatch({type:'goodsCate/editName',id:record.id})
  }
  const confrimEditCate = (record) => {
    
    validateFieldsAndScroll((errors,values) => {
      console.log(record,values)
      if(errors){
        message.destroy();
        message.error('请填写4个字以内分类名称')
      }else{
        let curr = record;
        curr.sortName = values.sortName
        record.id?changeListOpt('edit',curr,'name'):changeListOpt('add',curr)
        dispatch({type:'goodsCate/editName',id:'',key:''})
      }
    })
    
  }
  const changeSort = (record,source,clickIndex) =>{ //修改排序
    let dataSource = goodsCate.dataSource;
    let itemCurr ;//存储改变顺序之前的当前
    let indexFlag = ''  
    let indexSec = '' //用来存储二级
    if(source === 'up'){  //向上
      let itemPre ; //存储改变顺序之前的上一个
      for(let i = 0; i < goodsCate.dataSource.length; i++){
        const item = goodsCate.dataSource[i];
        const index = i;
        if(record.sortType === 1){  //如果是一级
          if(clickIndex - 1 === index){  //上一个
            itemPre = item;
            indexFlag = index
          }
          if(record.sortOrder === item.sortOrder){  //当前的
            itemCurr = item;
          }
        }else{  //二级
          if(Number(record.fid) === Number(item.id)){ //找到对应的一级
            indexSec = index;
            for(let n = 0; n < item.sortChildren.length; n++){
              const item1 = item.sortChildren[n];
              const index1 = n;
              console.log(clickIndex,index1)
              if(Number(clickIndex)-1 === Number(index1)){  //上一个
                itemPre = item1;
                indexFlag = index1
                console.log(itemPre)
              }
              if(record.sortOrder === item1.sortOrder){  //当前的
                itemCurr = item1;
              }
            }
          }
        }
      }
      const sortMiddel = itemPre.sortOrder;
      itemPre.sortOrder = itemCurr.sortOrder
      itemCurr.sortOrder = sortMiddel;
      record.sortType === 1 ? dataSource.splice(indexFlag,2,itemCurr,itemPre) :
      dataSource[indexSec].sortChildren.splice(indexFlag,2,itemCurr,itemPre)
      changeListOpt('edit',itemPre,'sort')
      changeListOpt('edit',itemCurr,'sort')
      dispatch({type:'goodsCate/changeSort',dataSource})
    }else{    //向下
      let itemNext ; //存储改变顺序之前的下一个
      for(let i = 0; i < goodsCate.dataSource.length; i++){
        const item = goodsCate.dataSource[i];
        const index = i;
        if(record.sortType === 1){  //如果是一级
          if(clickIndex + 1 === index){  //上一个
            itemNext = item;
          }
          if(record.sortOrder === item.sortOrder){  //当前的
            itemCurr = item;
            indexFlag = index
          }
        }else{  //二级
          if(Number(record.fid) === Number(item.id)){ //找到对应的一级
            indexSec = index;
            for(let n = 0; n < item.sortChildren.length; n++){
              const item1 = item.sortChildren[n];
              const index1 = n;
              if(Number(clickIndex) + 1 === index1){  //下一个
                itemNext = item1;
              }
              if(record.sortOrder === item1.sortOrder){  //当前的
                itemCurr = item1;
                indexFlag = index1
              }
            }
          }
        }
      }
      const sortMiddel = itemNext.sortOrder;
      itemNext.sortOrder = itemCurr.sortOrder
      itemCurr.sortOrder = sortMiddel;
      record.sortType === 1 ? dataSource.splice(indexFlag,2,itemNext,itemCurr) :
      dataSource[indexSec].sortChildren.splice(indexFlag,2,itemNext,itemCurr)
      changeListOpt('edit',itemNext,'sort')
      changeListOpt('edit',itemCurr,'sort')
      dispatch({type:'goodsCate/changeSource',dataSource})
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
  const changeListOpt = (source,record,type) => {
    // let flag = true;
    let changeList = goodsCate.changeList || [];
    switch (source) {
      case 'del': //删除
        if(goodsCate.changeList.length > 0){  //如果列表中有数据
          
          for(let i = 0; i < goodsCate.changeList.length; i++){ //如果该分类修改过内容，则需要从保存列表中将它剔除  
            if(record.id && record.id === goodsCate.changeList[i].id){  //删除的是已在数据库中的分类
              if(record.sortType === '1' || record.sortType === '2'){ //如果删除的是一级或者二级  需要将该一级下或者二级下的修改做删除
                for(let n = 0; n < goodsCate.changeList.length; n++){ //暂时先只删除的二级  三级后期再加
                  if(goodsCate.changeList[n].fid === record.id){
                    changeList.splice(n,1)
                    i--;
                  }
                }
              }
              changeList.splice(i,1)
            }else if(record.keyFlag && goodsCate.changeList[i].keyFlag  && String(record.keyFlag) === String(goodsCate.changeList[i].keyFlag)){  //删除本地添加的分类
              changeList.splice(i,1)
            }
          }
        }
        if(record.id) changeList.push({ //如果删除的是真是分类
          id:record.id,
          sortType:record.sortType,
          deleted:1
        }) 
        dispatch({type:'goodsCate/changeListSource',changeList})
        //如果删除的是当前正在编辑的分类，则在删除之后需要将不可编辑的锁定还原
        if(record.id === goodsCate.editCurrId || record.keyFlag === goodsCate.editCurrKey){
          dispatch({type:'goodsCate/editName',
            editCurrId:record.id === goodsCate.editCurrId ? '' :  goodsCate.editCurrId, //当前编辑的id还原为空
            editCurrKey:record.keyFlag === goodsCate.editCurrKey ? '' :  goodsCate.editCurrKey  //当前编辑的key还原为空
          })
        } 
        break;
      case 'edit': //修改分类（排序、名称修改）
        if(goodsCate.changeList && goodsCate.changeList.length > 0){  //如果列表中有数据
          for(let i = 0; i < goodsCate.changeList.length; i++){ //如果该分类修改过内容，则需要从保存列表中将它剔除  
            if(record.id && record.id === goodsCate.changeList[i].id){  //删除的是已在数据库中的分类
              changeList.splice(i,1)
            }else if(record.keyFlag && goodsCate.changeList[i].keyFlag  && record.keyFlag === goodsCate.changeList[i].keyFlag){  //删除本地添加的分类
              changeList.splice(i,1)
            }
          }
        }
        console.log(record)
        if(record.id) {
          let item = { //如果删除的是真是分类
            id:record.id,
            property:record.property, //暂时用1
            sortType:record.sortType, //层级
          }
          if(type === 'sort') item.sortOrder = record.sortOrder;  //如果是修改的排序
          if(type === 'name') item.sortName = record.sortName;    //如果是修改的名称
          if(record.fid) item.fid = Number(record.fid);
          changeList.push(item)
        }
        dispatch({type:'goodsCate/changeListSource',changeList})
        break;
      case 'add': //添加
        let addData = {
          sortName:record.sortName || '',
          property:record.property, //暂时用1
          sortType:record.sortType, //层级
          sortOrder:record.sortOrder,
        }
        
        if(record.fid) addData.fid = record.fid
        if(record.keyFlag) addData.keyFlag = record.keyFlag
        changeList.push(addData)
        dispatch({type:'goodsCate/changeListSource',changeList:changeList})
        break;
      default:
        break;
    }
  }
  const delCate = (record) => {
    //判断分类下有无商品
    if(record.productUsedCount > 0){
      message.destroy()
      message.error("当前分类下有商品，不可删除！");
      return
    }
    confirm({
      title: '您确定要删除吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        if(record.id){
          dispatch({type:'goodsCate/saveCateMessage',changeList:[{
            "id": record.id,  //删除操作模板
            "sortType":record.sortType,   
            "deleted": 1
          }]}).then((result) => {
            if(result.message === '成功'){
              message.success('删除成功')
              handleRefresh()
            }else{
              message.error(result.message)
            }
          })

          return;
        }
        let dataSource = goodsCate.dataSource;
        // let changeList = goodsCate.changeList;
        for(let i = 0; i < goodsCate.dataSource.length; i++){
          const item = goodsCate.dataSource[i];
          if(record.sortType === 1){ //如果是一级
            if(record.id && record.id === item.id){  //如果删除的是已经在数据库中的分类
              dataSource.splice(i,1)
            }else if(record.keyFlag && record.keyFlag === item.keyFlag){  //如果是新增的分类  新增的分类没有id   根据分配的key值做匹配
              dataSource.splice(i,1)
            }
          }else{ //如果是二级
            if(String(record.fid) === String(item.id)){
              for(let n = 0; n < item.sortChildren.length; n++){
                const item1 = item.sortChildren[n];
                if(record.id && record.id === item1.id){
                  dataSource[i].sortChildren.splice(n,1)
                }else if(record.keyFlag && String(record.keyFlag) === String(item1.keyFlag)){  //如果是新增的分类  新增的分类没有id   根据分配的key值做匹配
                  dataSource[i].sortChildren.splice(n,1)
                }
              }
            }
          }
        }
        changeListOpt('del',record) //删除的数据操作保存在数组中
        dispatch({type:'goodsCate/changeSource',dataSource})  //界面显示删除
      }
    });
  }
  const confirmSave = () => {
    console.log(goodsCate.changeList)
    if(!goodsCate.changeList || goodsCate.changeList.length <= 0){
      message.error("您没有做任何修改")
      return;
    }
    confirm({
      title: '您确定要保存修改吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          dispatch({type:'goodsCate/saveCateMessage',changeList:goodsCate.changeList})
          .then((result) => {
            if(result.message !== '成功'){
              message.error(result.message);
              return;
            }
           message.success('保存成功')
           handleRefresh()
           dispatch({type:'goodsCate/changeListSource',changeList:[]})
          })
      }
    });
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
    dataSource:goodsCate.dataSource,  //tabel数据源
    defaultExpandedRowKeys:goodsCate.defaultExpandedRowKeys,
    expandedRowKeys:goodsCate.defaultExpandedRowKeys,
    onExpand:onExpand,
    childrenColumnName:'sortChildren',
    defaultExpandAllRows:goodsCate.defaultExpandAllRows,  //
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:true,  //是否需要分页
  }
  const expandAllRows = () => {
    dispatch({type:'goodsCate/expandAllRows'})
    handleRefresh()
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>分类管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" style={{float:'right'}} onClick={() => confirmSave()}>保存</Button>
        <Button type="primary" style={{float:'right',marginRight:10}} onClick={() => expandAllRows()}>
          {goodsCate.defaultExpandAllRows ? '全部收起':'全部展开'}
        </Button>
        <Button type="primary" style={{float:'right',marginRight:10}} onClick={() => addFirCate()}>新增分类</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <DataTabel {...tabelProps} />
      {goodsCate.visible?
      <Modal 
        visible={goodsCate.visible}
        onCancel={() => {dispatch({type:'goodsCate/hideDialog'})}}
        okText={'确定'}
        cancelText={'取消'}
        onOk={() => confirmAddFirCate()}
      >
        <Form layout="horizontal">
          <FormItem label="分类属性" {...formItemLayout} hasFeedback>
            {getFieldDecorator('property', {
                  initialValue:  '1',
                  rules: [{required: true,message: '请选择分类属性'}]
              })(
                <RadioGroup >
                  <Radio value={'1'}>虚拟商品</Radio>
                  <Radio value={'2'}>实物商品</Radio>
                </RadioGroup>
            )}
          </FormItem>
          <FormItem label="分类名称" {...formItemLayout} >
            {getFieldDecorator('firSortName', {
                initialValue: '' ,
                rules: [{
                  required: true, 
                  max:4,
                  message: '请填写4字内的分类名称'
                }],
              })(
                <Input placeholder="请填写4字内的分类名称"  autoComplete="off"/>
            )}
          </FormItem>
        </Form>
      </Modal> :''}
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