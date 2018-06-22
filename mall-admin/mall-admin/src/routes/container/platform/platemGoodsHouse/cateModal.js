import React from 'react';
import { Modal,  message, Tree } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';
const TreeNode = Tree.TreeNode;
const CateModal = ({
  goodsHouseModel,
  loading,
  dispatch,
  ...modalProps
})=>{   
  const {handleRefresh} = modalProps
  let chooseCateId = ''
  const chooseCate = () => {  //确定操作
    let productBatchClassify = [];
    let curr = {};
    if(!chooseCateId){
      message.destroy()
      message.error('请先选择分类')
      return;
    }
    if(chooseCateId.split("/")[1] === '1'){ //一级归类
      curr.productSortId = chooseCateId.split("/")[0]
    }else if(chooseCateId.split("/")[1] === '2'){ //二级归类
      curr.productSortId = chooseCateId.split("/")[2] //一级
      curr.productSortId2 = chooseCateId.split("/")[0] //二级
      // alert("2")
      // for(let i = 0; i < goodsHouseModel.cateList.length; i++){
      //   const item = goodsHouseModel.cateList[i];
      //   console.log(chooseCateId.split("/")[0],item.id)
      //   if(chooseCateId.split("/")[0] === String(item.fid)){ 
      //     alert("3")
      //     curr.productSortId = item.fid //一级
      //     curr.productSortId2 = chooseCateId.split("/")[0] //二级
      //   }
      // }
    }else if(chooseCateId.split("/")[1] === '3'){ //一级归类
      
    }
    
    if(!goodsHouseModel.goodsId){  //批量归类
      
      if(goodsHouseModel.chooseGoodsIds.length <= 0){
        message.destroy()
        message.error('请先选择商品')
        return;
      }
      for(let i = 0; i < goodsHouseModel.chooseGoodsIds.length; i++){
        const item = goodsHouseModel.chooseGoodsIds[i];
        productBatchClassify.push({
          id:item.id,
          ...curr
        })
      }
      console.log(productBatchClassify)
      // return
    }else{  //单个归类
      
      productBatchClassify.push({
        id:goodsHouseModel.goodsId,
        ...curr
      })
    }
    dispatch({type:'goodsHouseModel/productBatchClassify',productBatchClassify})
    .then((result) => {
      if(result.message === '成功'){
        message.success('保存成功')
        handleRefresh()
        dispatch({type:'goodsHouseModel/clearState'})
      }else{
        message.destroy()
        message.error(result.message)
      }
    })
  }
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    chooseCateId = selectedKeys[0]
  }
  return (
    <Modal
      visible={goodsHouseModel.visible}
      onCancel={() => {dispatch({type:'goodsHouseModel/hideDialog'})}}
      okText='确定'
      title="商品归类"
      cancelText={'取消'}
      maskClosable={false}
      width={600}
      onOk={() => chooseCate()}
  >
      <Tree
        onSelect={(selectedKeys, info) => onSelect(selectedKeys, info)}
      >
        {goodsHouseModel.cateList.map(item => (
          <TreeNode title={item.sort_name} key={item.id+'/'+item.sort_type+"/"+item.fid}>
            {item.children.map(item1 => (
              <TreeNode title={item1.sort_name} key={item1.id+'/'+item1.sort_type+"/"+item1.fid}>
                
              </TreeNode>
            ))}
          </TreeNode>
        ))}
      </Tree>
  </Modal>
  );
    
}

CateModal.propTypes = {
  form: PropTypes.object,
  index: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({goodsHouseModel,loading})=>({goodsHouseModel,loading}))(CateModal);