import ActionType from './type';

const initState = {
  notFirstOpen: false,
};

const resourceReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.SET_RESOURCE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default resourceReducer;
