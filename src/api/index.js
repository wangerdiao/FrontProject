//这个模块用来API接口的统一管理
import requests from './request'
import mockRequests from './mockAjax'
//三级联动接口/api/product/getBaseCategoryList
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'}) //向后端服务器发送请求
export const reqGetBannerList = () => mockRequests.get('/banner')  //获取首页轮播图
export const reqGetFloorList = () => mockRequests.get('/floor')  //获取家用电气数据