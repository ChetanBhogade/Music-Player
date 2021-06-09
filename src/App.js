import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './Routes';
import {loaderContext} from './context/loaderContext';
import LoadingSpinner from './components/LoadingSpinner';
import {ThemeProvider} from './context/themeContext';

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaProvider>
      <loaderContext.Provider value={{loading, setLoading}}>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </loaderContext.Provider>
      <LoadingSpinner loading={loading} />
    </SafeAreaProvider>
  );
};

export default App;
