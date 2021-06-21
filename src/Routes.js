import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreens from './screens/HomeScreens';
import PlaylistScreen from './screens/PlaylistScreen';
import PlayerScreen from './screens/PlayerScreen';
import TestScreen from './screens/TestScreen';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreens} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="TestingPage" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
