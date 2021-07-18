import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './Routes';
import LoadingSpinner from './components/LoadingSpinner';
import {Provider} from 'react-redux';
import reduxStore from './myRedux/store';
import {PersistGate} from 'redux-persist/integration/react';
import TrackPlayer from 'react-native-track-player';
import {PermissionsAndroid} from 'react-native';

console.log('Track Player Options has been updated.');

const App = () => {
  const {store, persistor} = reduxStore();

  const requestForPermission = async () => {
    try {
      const writeStorage =
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      const readStorage = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      const granted = await PermissionsAndroid.requestMultiple([
        writeStorage,
        readStorage,
      ]);
      console.log('Granted: - ', granted[writeStorage], readStorage);
      if (granted[writeStorage] === 'granted') {
        //alert('You can use the location');
        console.log('write granted');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const trackPlayerInit = async () => {
    console.log('Setting up the track player...');
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1048576,
    });
    return true;
  };

  useEffect(() => {
    // trackPlayerInit();

    requestForPermission();

    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });

    return () => TrackPlayer.destroy();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<LoadingSpinner loading={true} />}
          persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
