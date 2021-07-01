import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './Routes';
import {loaderContext} from './context/loaderContext';
import LoadingSpinner from './components/LoadingSpinner';
import {Provider} from 'react-redux';
import reduxStore from './myRedux/store';
import {PersistGate} from 'redux-persist/integration/react';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
} from 'react-native-track-player';

const App = () => {
  const [loading, setLoading] = useState(false);

  const {store, persistor} = reduxStore();

  const trackPlayerInit = async () => {
    console.log('Setting up the track player...');
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1048576,
    });
    return true;
  };

  useTrackPlayerEvents([TrackPlayerEvents.REMOTE_STOP], async event => {
    if (event.type === TrackPlayerEvents.REMOTE_STOP) {
      console.log('We are stopping the player...');
      TrackPlayer.destroy();
    }
  });

  useEffect(() => {
    trackPlayerInit();
    TrackPlayer.updateOptions({
      alwaysPauseOnInterruption: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      notificationCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<LoadingSpinner loading={true} />}
          persistor={persistor}>
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
