'use strict';

import * as types from '../constants/loginTypes';
import  Util from '../Utils/util';
// 模拟用户信息
let user = {

}

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export function login(formData) {
  console.log('登录方法');
  return dispatch => {
    dispatch(isLogining());
    // 模拟用户登录
      Util.post( "http://219.145.160.7:81/index.php?m=&c=flow&a=folder&fid=confirm&async=true",formData,function (data) {
          dispatch(loginSuccess(true,data.list));
          /* */
      },function (data) {
          dispatch(loginError(false));
      });
  }
}

function isLogining() {
  return {
    type: types.LOGIN_IN_DOING
  }
}

function loginSuccess(isSuccess, user) {
  console.log('success');
  return {
    type: types.LOGIN_IN_DONE,
    user: user,
  }
}

function loginError(isSuccess) {
  console.log('error');
  return {
    type: types.LOGIN_IN_ERROR,
  }
}
