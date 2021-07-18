import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {
  STATE_PLAYING,
  useTrackPlayerProgress,
} from 'react-native-track-player';
import moment from 'moment';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Slider from "react-native-slider";

const Playing = ({
  title,
  subtitle,
  sliderValue,
  playerInfo,
  currentPlayerState,
  sliderPercentage,
}) => {
  // const sliderPositionValue = parseInt((position / duration) * 100);
  
  const {position, bufferedPosition, duration} = useTrackPlayerProgress();
  const [value, setValue] = useState(0);

  console.log('Got as: - ', playerInfo);

  return (
    <>
      <View style={styles.sliderWrapper}>
        <Slider 
          value={currentPlayerState.sliderPercentage}
          onValueChange={(value) => {
            console.log("Slider value change as: - ", value);
          }}
          step={1}
        />

        {/* <Slider
          // value={currentPlayerState.sliderPercentage}
          value={value}
          style={{width: '100%', height: 0}}
          thumbStyle={styles.sliderThumbStyle}
          onValueChange={value => {
            console.log("Seek value: - ", value);
            setValue(value);
            // TrackPlayer.seekTo(value);
          }}
          allowTouchTrack={true}
          maximumValue={100}
          minimumValue={0}
          animateTransitions
          step={1}
        /> */}


      </View>
      <ListItem
        Component={View}
        containerStyle={{backgroundColor: '#dfe6e9'}}
        disabledStyle={{opacity: 0.5}}
        pad={20}
        // onLongPress={() => console.log('onLongPress()')}
        // onPress={() => console.log('onPress()')}
        // ViewComponent={View}
        // topDivider
      >
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
            // source={require('../assets/gifs/music.gif')}
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
  sliderPercentage: state.playlistReducer.sliderPercentage
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
    // borderWidth: 1,
    // borderColor: colors.foreground,
    paddingVertical: 5,
  },
  btnStyle: {
    marginHorizontal: 8,
  },
});
