import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppHeader from '../components/AppHeader';

const PlaylistScreen = ({route, navigation}) => {
  const { playlistId } = route.params;
  console.log(playlistId);
  return (
    <View>
      <AppHeader />
      <Text>This is my PlaylistScreen</Text>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({});
