import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import reducer from '.';

const persistConfig = {
  whitelist: ['userReducer', 'resourceReducer'],
  key: 'eGate',
  debug: __DEV__,
  storage: AsyncStorage,
};
const reducer2 = persistReducer(persistConfig, reducer);
let store = createStore(reducer2);
const persister = persistStore(store);

export default store;
export {persister};
