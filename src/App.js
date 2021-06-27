import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './Routes';
import {loaderContext} from './context/loaderContext';
import LoadingSpinner from './components/LoadingSpinner';
import {ThemeProvider} from './context/themeContext';
import {Provider} from 'react-redux';
import store from './myRedux/store';

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <loaderContext.Provider value={{loading, setLoading}}>
          <ThemeProvider>
            <Routes />
          </ThemeProvider>
        </loaderContext.Provider>
      </Provider>
      <LoadingSpinner loading={loading} />
    </SafeAreaProvider>
  );
};

export default App;
