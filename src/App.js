import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './Routes';
import {loaderContext} from './context/loaderContext';
import LoadingSpinner from './components/LoadingSpinner';
import {Provider} from 'react-redux';
import reduxStore from './myRedux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  const [loading, setLoading] = useState(false);

  const {store, persistor} = reduxStore();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <loaderContext.Provider value={{loading, setLoading}}>
            <Routes />
          </loaderContext.Provider>
        </PersistGate>
      </Provider>
      <LoadingSpinner loading={loading} />
    </SafeAreaProvider>
  );
};

export default App;
