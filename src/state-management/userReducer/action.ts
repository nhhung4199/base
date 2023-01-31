import ActionType from './type';

export const setUserInfo = data => {
  return {
    type: ActionType.SET_USER,
    payload: data,
  };
};
export const logoutUser = () => {
  return {
    type: ActionType.LOGOUT,
  };
};
