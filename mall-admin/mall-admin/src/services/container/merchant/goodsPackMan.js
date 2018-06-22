import request from '@/utils/request';
import { api } from '@/utils/config';

const { goodsPackManUrl, packLisDelUrl, packLisUseUrl, packLisEditorUrl } = api;
export function goodsPackManList(data) { //商品打包管理
  return request({
  	url:goodsPackManUrl,
  	method:"post",
  	data,
  });
};
export function packLisDelFn(data) { //商品打包管理-列表删除按钮事件
  return request({
  	url:packLisDelUrl,
  	method:"post",
  	data,
  });
};
export function packLisUseFn(data) { //商品打包管理-列表应用生效按钮事件
  return request({
  	url:packLisUseUrl,
  	method:"post",
  	data,
  });
};
export function packLisEditorFn(data) { //商品打包管理-列表编辑按钮事件
  return request({
  	url:packLisEditorUrl,
  	method:"post",
  	data,
  });
};
