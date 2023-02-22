import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'navigation/NavigationService';
import Navigation from 'navigation/sence/RootSence';
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persister} from 'state-management/store';
import {loadLocaleLanguage} from 'utilities/i18next';

const App = () => {
  useEffect(() => {
    loadLocaleLanguage();
    // requestUserPermission();
    // notificationListener();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size={50} />}
        persistor={persister}>
        <NavigationContainer ref={navigationRef}>
          <Navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
