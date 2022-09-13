//这个模块用来API接口的统一管理
import requests from './request'
//三级联动接口/api/product/getBaseCategoryList
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'}) //发送请求