import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import propTypes from 'prop-types';

const SongInfo = ({name}) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        console.log('Song Clicked...');
      }}>
      <MaterialCommunityIcons
        onPress={() => {
          console.log('Deleted Icon Pressed with id: - ', id);
          removePlaylist(id);
        }}
        name="music" // "play-circle-outline"
        size={40}
        color="#FF6263"
      />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        {/* <ListItem.Subtitle>Audio Files: 1</ListItem.Subtitle> */}
      </ListItem.Content>
    </ListItem>
  );
};

SongInfo.propTypes = {
  name: propTypes.string.isRequired,
};

export default SongInfo;

const styles = StyleSheet.create({});
