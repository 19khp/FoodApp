/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import Navigation from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {Provider} from 'react-redux';
import store from './src/stores/store.ts';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      retry: 3,
    },
  },
});
function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView>
          <Navigation />
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
