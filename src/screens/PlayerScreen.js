import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AppHeader from '../components/AppHeader';
import {loaderContext} from '../context/loaderContext';
import {themeContext} from '../context/themeContext';
import {API_KEY} from '@env';
import {Slider} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PlayerScreen = ({route, navigation}) => {
  const {videoId} = route.params;

  const {setLoading} = useContext(loaderContext);
  const {colors, isDarkTheme} = useContext(themeContext);

  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const getVideoDetails = async videoId => {
    setLoading(true);

    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          params: {
            key: API_KEY,
            part: 'contentDetails,id,localizations,player,recordingDetails,snippet,statistics,status,topicDetails',
            id: videoId,
          },
        },
      );
      console.log('Video Details: - ', response.data);
      const videoData = response.data.items[0];
      const thumbnailUrl = videoData.snippet.thumbnails.medium.url;
      const title = videoData.snippet.title;
      const subtitle = videoData.snippet.channelTitle;

      setThumbnail(thumbnailUrl);
      setTitle(title);
      setSubtitle(subtitle);
    } catch (error) {
      console.log('Error');
    }

    setLoading(false);
  };

  useEffect(() => {
    getVideoDetails(videoId);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <AppHeader />
      <View style={styles.playerView}>
        {thumbnail ? (
          <View style={styles.imageView}>
            <Image
              style={styles.thumbnail}
              source={{
                uri: thumbnail,
              }}
            />
          </View>
        ) : (
          <View
            style={[
              styles.emptyThumbnail,
              {backgroundColor: isDarkTheme ? '#CAD5E2' : '#dfe4ea'},
            ]}
          />
        )}

        <Text style={[styles.title, {color: colors.foreground}]}>
          {title.slice(0, 26)}...
        </Text>
        <Text style={[styles.subtitle, {color: colors.secondaryText}]}>
          {subtitle}
        </Text>

        <View style={styles.timerWrapper}>
          <Text style={{color: colors.foreground}}>01:35</Text>
          <Text style={{color: colors.foreground}}>04:00</Text>
        </View>

        <View style={styles.sliderWrapper}>
          <Slider
            value={20}
            style={{width: '100%', height: 0}}
            thumbStyle={[
              styles.sliderThumbStyle,
              {backgroundColor: colors.foreground},
            ]}
            // onValueChange={value => this.setState({value})}
            minimumTrackTintColor={colors.foreground}
            maximumValue={100}
          />
        </View>

        <View style={styles.btnWrapper}>
          <MaterialCommunityIcons
            name="skip-previous-outline"
            size={40}
            color={colors.foreground}
            style={styles.btnStyle}
            onPress={() => {
              console.log('Icon pressed');
            }}
          />
          <MaterialCommunityIcons
            name="pause"
            size={40}
            style={styles.btnStyle}
            color={colors.foreground}
            onPress={() => {
              console.log('Pause Icon pressed');
            }}
          />
          <MaterialCommunityIcons
            name="skip-next-outline"
            size={40}
            style={styles.btnStyle}
            color={colors.foreground}
          />
        </View>
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyThumbnail: {
    width: 261,
    height: 261,
    borderRadius: 10,
  },
  playerView: {
    marginVertical: 25,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  imageView: {
    alignItems: 'center',
    width: 261,
    height: 261,
  },
  thumbnail: {
    width: '100%',
    height: 261,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 28.25,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  sliderWrapper: {
    alignItems: 'stretch',
    justifyContent: 'center',
    zIndex: 1,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
  },
  sliderThumbStyle: {
    height: 20,
    width: 20,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    marginVertical: 20,
  },
  btnStyle: {
    marginHorizontal: 8,
  },
  timerWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 30,
  },
});
