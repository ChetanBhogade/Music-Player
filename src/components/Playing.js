import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {STATE_PLAYING} from 'react-native-track-player';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

const Playing = ({playerInfo, currentPlayerState}) => {
  return (
    <>
      <View style={styles.progressMainWrapper}>
        <View
          style={[
            styles.progressMainStyle,
            {
              width: `${
                playerInfo.sliderPercentage ? playerInfo.sliderPercentage : 0
              }%`,
            },
          ]}></View>
      </View>

      <ListItem
        Component={View}
        containerStyle={{backgroundColor: '#dfe6e9'}}
        disabledStyle={{opacity: 0.5}}
        pad={20}>
        {currentPlayerState === STATE_PLAYING ? (
          <Avatar
            source={require('../assets/gifs/music.gif')}
            size="large"
            overlayContainerStyle={{backgroundColor: '#000'}}
            style={{width: 55, height: 55}}
            // iconStyle={{ width: 90 }}
            rounded
          />
        ) : (
          <Avatar
            icon={{name: 'music-note', type: 'material-community', size: 45}}
            size="large"
            overlayContainerStyle={{backgroundColor: '#000'}}
            style={{width: 55, height: 55}}
            // iconStyle={{ width: 90 }}
            rounded
          />
        )}

        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.titleStyle}>{playerInfo.trackTitle}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.subtitleStyle}>
              {playerInfo.position} : {playerInfo.duration}
            </Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <View style={styles.playerBtnWrapper}>
          <TouchableOpacity
            onPress={async () => {
              console.log('Previous Song Play Icon Pressed...');
              await TrackPlayer.skipToPrevious();
            }}>
            <MaterialCommunityIcons
              name="skip-previous-outline"
              size={30}
              style={styles.btnStyle}
            />
          </TouchableOpacity>

          {currentPlayerState === STATE_PLAYING ? (
            <TouchableOpacity
              onPress={async () => {
                console.log('Pause Icon Pressed...');
                await TrackPlayer.pause();
              }}>
              <MaterialCommunityIcons
                name="pause"
                size={30}
                style={styles.btnStyle}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                console.log('Play Icon Pressed...');
                await TrackPlayer.play();
              }}>
              <MaterialCommunityIcons
                name="play"
                size={30}
                style={styles.btnStyle}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={async () => {
              console.log('Next Song Play Icon Pressed...');
              await TrackPlayer.skipToNext();
            }}>
            <MaterialCommunityIcons
              name="skip-next-outline"
              size={30}
              style={styles.btnStyle}
            />
          </TouchableOpacity>
        </View>
      </ListItem>
    </>
  );
};

const mapStateToProps = state => ({
  playerInfo: state.playlistReducer.playerInfo,
  currentPlayerState: state.playlistReducer.currentPlayerState,
});

export default connect(mapStateToProps)(Playing);

const styles = StyleSheet.create({
  sliderWrapper: {
    alignItems: 'stretch',
    justifyContent: 'center',
    zIndex: 1,
  },
  sliderThumbStyle: {
    height: 15,
    width: 15,
    backgroundColor: '#120E43',
  },
  titleStyle: {fontWeight: 'bold'},
  subtitleStyle: {
    textTransform: 'uppercase',
    fontSize: 14,
  },
  playerBtnWrapper: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  btnStyle: {
    marginHorizontal: 8,
  },
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
  },
  progressMainWrapper: {
    backgroundColor: '#bdc3c7',
    height: 4,
    borderRadius: 16,
    width: '100%',
  },
  progressMainStyle: {
    borderRadius: 16,
    height: 4,
    backgroundColor: '#2c3e50',
    // width: "28%"
  },
});
