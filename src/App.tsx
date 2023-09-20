import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import RootNavigation from './navigation';
import { ThemeProvider } from "@shopify/restyle";
import theme from './theme';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import { requestUserPermission, NoficationListener } from './services/notification/Notification';
import { Box, Icon, Text } from './components';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  useEffect(() => {
    requestUserPermission()
    NoficationListener()
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider >
          <Toast
            // config={toastConfig}
            topOffset={50} //10/50
            visibilityTime={2500}
          />
          <RootNavigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
