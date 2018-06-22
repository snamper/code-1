import request from '@/utils/request';
import { api } from '@/utils/config';
import requestJson from '@/utils/requestJson';

const { activityManListUrl, shareActiveConfigAddUrl, changeActiveSortUrl, changeActiveStatusUrl, putDownUrl,putUpUrl,activityDetailsUrl, purchaseDetailUrl, activityPutawayUrl, setActivityPutUrl, shareActiveConfigListUrl, shareActiveConfigUrl, avtiveDetail, setActivePutAway, setActiveChooseList, setActivePutAwayUpdate } = api;
export function activityManListFn(data) { //活动管理列表
  return request({
  	url:activityManListUrl,
  	method:"post",
  	data,
	});
};
export function changeActiveSortFn(data) { //活动上下架管理-修改排序号
  return request({
  	url:changeActiveSortUrl,
  	method:"put",
  	data,
	});
};
export function changeActiveStatusFn(data) { //活动管理-修改活动状态
  return request({
  	url:changeActiveStatusUrl,
  	method:"post",
  	data,
	});
};
export function activityPutawayFn(data) { //活动管理-活动上架管理
  return requestJson({
  	url:activityPutawayUrl,
  	method:"post",
  	data,
	});
};
export function activityDetailsFn(data) { //活动管理-活动详情
  return request({
  	url:activityDetailsUrl,
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
export function putUpFn(data){
  return requestJson({
    url:putUpUrl,
    method:"put",
    data,
  });
};
export function putDownFn(data){
  return requestJson({
    url:putDownUrl,
    method:"put",
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
export function shareActiveConfigListFn(data) { //活动管理-活动分享配置列表
  return requestJson({
  	url:shareActiveConfigListUrl,
  	method:"post",
  	data,
	});
};
export function shareActiveConfigAddFn(data) { //活动管理-活动分享配置-初次设置保存
  return requestJson({
  	url:shareActiveConfigAddUrl,
  	method:"post",
  	data,
	});
};
export function shareActiveConfigFn(data) { //活动管理-活动分享配置-再次编辑保存
  return requestJson({
  	url:shareActiveConfigUrl,
  	method:"put",
  	data,
	});
};
export function setAvtiveDetail(data) { //
  return request({
  	url:avtiveDetail,
  	method:"get",
  	data,
	});
};

export function activePutAwaySave(data) { //
  return requestJson({
  	url:setActivePutAway,
  	method:"post",
  	data,
	});
};

export function activeChooseList(data){
	 return request({
  	url:setActiveChooseList,
  	method:"post",
  	data,
	});
}

export function activePutAwayUpdate (data) {
	return requestJson({
  	url:setActivePutAwayUpdate,
  	method:"put",
  	data,
	});
}
