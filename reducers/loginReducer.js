'use strict';
import * as types from '../constants/loginTypes';

const initialState = {
  status: '获取数据',
  isSuccess: false,
  user: null,
}

export default function loginIn(state=initialState, action) {
  switch (action.type) {
    case types.LOGIN_IN_DOING:
      return {
        ...state,
        status: '正在获取',
        isSuccess: false,
        user: null,
      }
      break;
    case types.LOGIN_IN_DONE:
      return {
        ...state,
        status: '获取成功',
        isSuccess: true,
        user: action.user,
      }
      break;
    case types.LOGIN_IN_ERROR:
      return {
        ...state,
        status: '获取出错',
        isSuccess: true,
        user: null,
      }
      break;
    default:
    console.log(state);
      return state;
  }
}
