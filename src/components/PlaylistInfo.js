import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import propTypes from 'prop-types';

const PlaylistInfo = ({name, noOfAudioFiles}) => {
  return (
    <ListItem bottomDivider>
      <MaterialCommunityIcons name="folder-music" size={45} color="#758283" />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>Audio Files: {noOfAudioFiles}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

PlaylistInfo.propTypes = {
  name: propTypes.string.isRequired,
  noOfAudioFiles: propTypes.number.isRequired,
};

export default PlaylistInfo;

const styles = StyleSheet.create({});
