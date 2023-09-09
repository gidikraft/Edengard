import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigation from './navigation';
import { ThemeProvider } from "@shopify/restyle";
import theme from './theme';
import { Provider } from 'react-redux';
import { store } from './store/Store';

function App(): JSX.Element {

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
