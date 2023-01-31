import ActionType from './type';

const initState = {};

const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case ActionType.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userReducer;
