import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreens2 from './oldScreens/HomeScreens';
import PlaylistScreen2 from './oldScreens/PlaylistScreen';
import PlayerScreen2 from './oldScreens/PlayerScreen';
import TestScreen2 from './oldScreens/TestScreen';
import HomeScreen from './screens/HomeScreen';
import AudioFolder from './screens/AudioFolder';
import PlaylistScreen from './screens/PlaylistScreen';
import ChooseFolder from './screens/ChooseFolder';
import TrackPlayer, {
  TrackPlayerEvents,
  useTrackPlayerEvents,
  STATE_PLAYING,
  STATE_PAUSED,
  STATE_STOPPED,
} from 'react-native-track-player';
import {connect} from 'react-redux';
import {setPlayerState} from './myRedux';

const Stack = createStackNavigator();

const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
  TrackPlayerEvents.REMOTE_STOP,
];

const Routes = ({setPlayerState}) => {
  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      // await TrackPlayer.add()
      // await TrackPlayer.reset()
    } catch (error) {
      console.log('Got an error: - ', error);
    }
  };

  useTrackPlayerEvents(events, event => {
    if (event.type === TrackPlayerEvents.REMOTE_STOP) {
      console.log('We are stopping the player...');
      TrackPlayer.destroy();
    }

    if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      console.warn('An error occurred while playing the current track.');
    }

    if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
      console.log(
        'We have to setup the on playback state: - ',
        event.state,
        STATE_PLAYING,
        STATE_PAUSED,
        STATE_STOPPED,
      );
      setPlayerState(event.state);
    }
  });

  useEffect(() => {
    setUpTrackPlayer();

    return () => TrackPlayer.destroy();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AudioFolder" component={AudioFolder} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
        <Stack.Screen name="ChooseFolder" component={ChooseFolder} />
        <Stack.Screen name="oldHome" component={HomeScreens2} />
        <Stack.Screen name="oldPlaylist" component={PlaylistScreen2} />
        <Stack.Screen name="oldPlayer" component={PlayerScreen2} />
        <Stack.Screen name="oldTestingPage" component={TestScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setPlayerState: data => dispatch(setPlayerState(data)),
  };
};

export default connect(null, mapDispatchToProps)(Routes);
