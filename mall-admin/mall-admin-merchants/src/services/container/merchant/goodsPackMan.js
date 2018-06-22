import request from '@/utils/request';
import { api } from '@/utils/config';
import requestJson from '@/utils/requestJson';

const { goodsPackManUrl, addGoodsPackUrl, editorGoodsPackUrl, packLisDelUrl, packLisUseUrl, packLisEditorUrl, getAllSelGoodsUrl } = api;
export function goodsPackManList(data) { //商品打包管理
  return requestJson({
  	url:goodsPackManUrl,
  	method:"post",
  	data,
  });
};
export function addGoodsPacSaveFn(data) { //创建商品打包保存数据
  return requestJson({
  	url:addGoodsPackUrl,
  	method:"post",
  	data,
  });
};
export function editorGoodsPackSaveFn(data) { //编辑商品打包保存数据
  return requestJson({
  	url:editorGoodsPackUrl,
  	method:"put",
  	data,
  });
};
export function packLisDelFn(data) { //商品打包管理-列表删除按钮事件
  return requestJson({
  	url:packLisDelUrl,
  	method:"delete",
  	data,
  });
};
export function packLisUseFn(data) { //商品打包管理-列表应用生效按钮事件
  return requestJson({
  	url:packLisUseUrl,
  	method:"put",
  	data,
  });
};
export function packLisEditorFn(data) { //商品打包管理-列表编辑按钮事件 ---列表编辑获取打包详情
  return request({
  	url:packLisEditorUrl,
  	method:"get",
  	data,
  });
};
export function getAllSelGoodsFn(data) { //创建编辑打包商品页面的下拉商品选择列表
  return request({
  	url:getAllSelGoodsUrl,
  	method:"get",
  	data,
  });
};
// export function packLisDetialFn(data) { //商品打包管理-列表编辑获取打包详情
//   return request({
//   	url:packLisEditorUrl,
//   	method:"get",
//   	data,
//   });
// };
