import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import propTypes from 'prop-types';

const PlaylistInfo = ({name, navigation, audioFilesInfo, id}) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        console.log('Playlist Clicked...');
        navigation.navigate('Playlist', {
          name,
          audioFilesInfo, 
          id
        });
      }}>
      <MaterialCommunityIcons name="folder-music" size={45} color="#758283" />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>Audio Files: {audioFilesInfo.length}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

PlaylistInfo.propTypes = {
  name: propTypes.string.isRequired,
  audioFilesInfo: propTypes.array.isRequired,
};

export default PlaylistInfo;

const styles = StyleSheet.create({});
