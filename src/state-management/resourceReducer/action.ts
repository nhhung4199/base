import ActionType from './type';

export const setResource = data => {
  return {
    type: ActionType.SET_RESOURCE,
    payload: data,
  };
};

export const addSearchHistory = data => {
  return {
    type: ActionType.ADD_SEARCH_HISTORY,
    payload: data,
  };
};
