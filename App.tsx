/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Router from '@/nativators/Router';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@/translations/i18next';
import { ThemeProvider } from '@/hooks/useTheme';
import Toast from 'react-native-toast-message';
import toastConfig from '@/components/ToastConfig';
import { Provider } from 'react-redux';
import store from '@/store/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Provider store={store}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppContent />
          <Toast config={toastConfig} />
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return <Router />;
}

export default App;
