import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import propTypes from 'prop-types';

const SongInfo = ({name, playSong, index}) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        console.log('Song Clicked...');
        playSong(index);
      }}>
      <MaterialCommunityIcons
        // onPress={() => {
        //   console.log("Song Music Icon Pressed...");
        // }}
        name="music-circle-outline" // "play-circle-outline"
        size={40}
        color="#FF6263"
      />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

SongInfo.propTypes = {
  name: propTypes.string.isRequired,
};

export default SongInfo;

const styles = StyleSheet.create({});
