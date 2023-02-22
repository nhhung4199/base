import React from 'react';
import {useSelector} from 'react-redux';
import {useInitApp} from 'utilities/authencaticate/initApp';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Navigation = () => {
  useInitApp();
  const token = useSelector((state: any) => state?.userReducer?.access_token);
  return <>{!token ? <AppStack /> : <AuthStack />}</>;
};
export default Navigation;
