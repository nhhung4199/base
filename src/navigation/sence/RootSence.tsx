import React from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Navigation = () => {
  const token = null;
  return <>{token ? <AppStack /> : <AuthStack />}</>;
};
export default Navigation;
