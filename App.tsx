import {Box, Modal, NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StatusBar, ActivityIndicator, AppState} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AuthContextProvider} from './src/context/auth';
import Toast from 'react-native-toast-message';
import {NativeBaseTheme} from './src/styles/NativeBaseTheme';
import {LocationContextProvider} from './src/context/location';
import SplashScreen from 'react-native-splash-screen';
import LangContextProvider from './src/context/lang';
import GifLoader from './src/components/GifLoader';
import {NetInfoCheck} from './src/lib/NetInfoCheck';

function App() {
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }, 3000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthContextProvider>
        <LocationContextProvider>
          <LangContextProvider>
            <SafeAreaProvider>
              <NativeBaseProvider theme={NativeBaseTheme}>
                <StatusBar
                  barStyle={'dark-content'}
                  backgroundColor={'white'}
                />
                {showLoader ? (
                  <GifLoader />
                ) : (
                  <>
                    <StatusBar
                      barStyle={'dark-content'}
                      backgroundColor={'white'}
                    />
                    <AppNavigation />
                    <Toast />
                    <NetInfoCheck />
                  </>
                )}
              </NativeBaseProvider>
            </SafeAreaProvider>
          </LangContextProvider>
        </LocationContextProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}

export default App;
