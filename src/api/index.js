//这个模块用来API接口的统一管理
import requests from './request'
import mockRequests from './mockAjax'
//三级联动接口/api/product/getBaseCategoryList
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'}) //向后端服务器发送请求
export const reqGetBannerList = () => mockRequests.get('/banner')  //获取首页轮播图
export const reqGetFloorList = () => mockRequests.get('/floor')  //获取家用电气数据
//获取搜索模块的数据，地址为：/api/list 需要携带参数
//当前获取搜索模块数据的接口，给服务器传递一个默认参数（至少是一个空对象）
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'POST',data:params})