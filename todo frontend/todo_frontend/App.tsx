import {AppState, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/utils/theme';
import Navigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/store/index';
import {SWRConfig} from 'swr';

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <SWRConfig
            value={{
              provider: () => new Map(),
              isVisible: () => {
                return true;
              },
              initFocus(callback) {
                let appState = AppState.currentState;

                const onAppStateChange = (nextAppState: any) => {
                  /* If it's resuming from background or inactive mode to active one */
                  if (
                    appState.match(/inactive|background/) &&
                    nextAppState === 'active'
                  ) {
                    callback();
                  }
                  appState = nextAppState;
                };

                // Subscribe to the app state change events
                const subscription = AppState.addEventListener(
                  'change',
                  onAppStateChange,
                );

                return () => {
                  subscription.remove();
                };
              },
            }}>
            <Navigation />
          </SWRConfig>
          <StatusBar />
        </SafeAreaProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
