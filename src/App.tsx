import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigation from './navigation';
import { ThemeProvider } from "@shopify/restyle";
import theme from './theme';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import { requestUserPermission, NoficationListener } from './services/notification/Notification';


function App(): JSX.Element {
  useEffect(() => {
    requestUserPermission()
    NoficationListener()
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider >
          <RootNavigation />
        </SafeAreaProvider>

      </ThemeProvider>

    </Provider>
  );
}

export default App;
