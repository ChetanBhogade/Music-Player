import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import propTypes from 'prop-types';
import {STATE_PLAYING} from 'react-native-track-player';
import {connect} from 'react-redux';

const SongInfo = ({
  name,
  playSong,
  trackId,
  playerInfo,
  currentPlayerState,
}) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        console.log('Song Clicked...');
        playSong(trackId);
      }}>
      {(() => {
        if (
          playerInfo.trackId === trackId &&
          currentPlayerState === STATE_PLAYING
        ) {
          return (
            <Avatar source={require('../assets/gifs/sound.gif')} size="small" />
          );
        } else {
          return (
            <MaterialCommunityIcons
              name="music-circle-outline"
              size={40}
              color="#FF6263"
            />
          );
        }
      })()}
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

SongInfo.propTypes = {
  name: propTypes.string.isRequired,
  trackId: propTypes.string.isRequired,
};

const mapStateToProps = state => ({
  playerInfo: state.playlistReducer.playerInfo,
  currentPlayerState: state.playlistReducer.currentPlayerState,
});

export default connect(mapStateToProps)(SongInfo);
