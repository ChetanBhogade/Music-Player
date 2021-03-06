import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, View} from 'react-native';
import propTypes from 'prop-types';

const FolderInfo = ({name, noOfAudioFiles, removePlaylist, id, navigation}) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        console.log('Edit Folder Clicked...');
        navigation.navigate('Playlist', {
          name,
          id, 
          isEdit: true,
        })
      }}>
      <MaterialCommunityIcons
        onPress={() => {
          console.log('Deleted Icon Pressed with id: - ', id);
          removePlaylist(id);
        }}
        name="delete-circle"
        size={45}
        color="#FF6263"
      />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>Audio Files: {noOfAudioFiles}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron size={30} />
    </ListItem>
  );
};

export default FolderInfo;

FolderInfo.propTypes = {
  name: propTypes.string.isRequired,
  noOfAudioFiles: propTypes.number.isRequired,
};

const styles = StyleSheet.create({});
