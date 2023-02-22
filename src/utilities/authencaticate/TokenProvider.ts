import store from 'state-management/store';
import {logoutUser} from 'state-management/userReducer/action';
const TokenProvider = {
  getToken: async () => {
    const accessToken = await store.getState().userReducer.access_token;
    return accessToken || '';
  },

  logOut: async () => {
    try {
      store.dispatch(logoutUser());
    } catch (error) {
      console.log(error);
    }
  },
};

export default TokenProvider;
