import React from 'react';
import {useSelector} from 'react-redux';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Navigation = () => {
  const accessToken = useSelector(
    (state: any) => state?.userReducer?.accessToken,
  );
  return <>{accessToken ? <AppStack /> : <AuthStack />}</>;
};
export default Navigation;
