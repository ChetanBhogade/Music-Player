import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const PlaylistInfo = () => {
  return (
    <ListItem bottomDivider>
      <MaterialCommunityIcons name="folder-music" size={45} color="#758283" />
      <ListItem.Content>
        <ListItem.Title>Playlist One</ListItem.Title>
        <ListItem.Subtitle>Audio Files: 0</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default PlaylistInfo;

const styles = StyleSheet.create({});
