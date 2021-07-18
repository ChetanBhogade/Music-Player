import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
  useTrackPlayerProgress,
} from 'react-native-track-player';
import {connect} from 'react-redux';
import {setPlayerInfo, setPlayerState} from './myRedux';

const secondsToMS = value => {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds; // Return is MM : SS
};

const Stack = createStackNavigator();

const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
  TrackPlayerEvents.REMOTE_STOP,
];

const Routes = ({setPlayerState, setPlayerInfo}) => {
  const {position, bufferedPosition, duration} = useTrackPlayerProgress();

  const grabCurrentTrackInfo = async () => {
    const trackIndex = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackIndex);

    setPlayerInfo({
      duration: secondsToMS(duration),
      position: secondsToMS(position),
      sliderPercentage: parseInt((position / duration) * 100),
      trackTitle: trackObject ? trackObject.title : "No Media",
    });
  }

  useEffect(() => {
    grabCurrentTrackInfo();
  }, [position]);

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setPlayerState: data => dispatch(setPlayerState(data)),
    setPlayerInfo: data => dispatch(setPlayerInfo(data)),
  };
};

export default connect(null, mapDispatchToProps)(Routes);
