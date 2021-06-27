import React from 'react';
import { ListItem, Avatar } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, View} from 'react-native';

const FolderInfo = () => {
  return (
    <ListItem bottomDivider>
      <MaterialCommunityIcons name="delete-circle" size={45} color="#FF6263" />
      <ListItem.Content>
        <ListItem.Title>Folder Name</ListItem.Title>
        <ListItem.Subtitle>No of audio files</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron size={30} />
    </ListItem>
  );
};

export default FolderInfo;

const styles = StyleSheet.create({});
