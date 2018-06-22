import request from '@/utils/request';
import { api } from '@/utils/config';

const { activityManUrl,channelDetail, purchaseDetailUrl, activityPutawayUrl, setActivityPutUrl, shareActiveConfigUrl } = api;
export function activityManList(data) { //活动管理--渠道列表
  return request({
  	url:activityManUrl,
  	method:"get",
  	data,
  });
};
export function channelDetailFn(data) { //活动管理-活动详情
  return request({
  	url:channelDetail,
  	method:"get",
  	data,
  });
};
export function purchaseDetailFn(data) { //活动管理-活动详情-购买明细
  return request({
  	url:purchaseDetailUrl,
  	method:"post",
  	data,
  });
};
export function activityPutawayFn(data) { //活动管理-活动上架管理
  return request({
  	url:activityPutawayUrl,
  	method:"post",
  	data,
	});
};
export function setActivityPutFn(data) { //活动管理-活动上架管理-设置活动上架
  return request({
  	url:setActivityPutUrl,
  	method:"post",
  	data,
	});
};
export function shareActiveConfigFn(data) { //活动管理-活动分享配置
  return request({
  	url:shareActiveConfigUrl,
  	method:"post",
  	data,
	});
};
