import React from 'react';
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

const Stack = createStackNavigator();

const Routes = () => {
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

export default Routes;
