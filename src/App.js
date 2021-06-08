import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './Routes';
import {loaderContext} from './context/loaderContext';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaProvider>
      <loaderContext.Provider value={{loading, setLoading}}>
        <Routes />
      </loaderContext.Provider>
      <LoadingSpinner loading={loading} />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
