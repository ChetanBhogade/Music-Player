import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import SongInfoCard from '../components/SongInfoCard';
import {loaderContext} from '../context/loaderContext';
import {themeContext} from '../context/themeContext';
import {API_KEY} from '@env';
import axios from 'axios';

const PlaylistScreen = ({route, navigation}) => {
  const {playlistId, playlistTitle} = route.params;

  const {setLoading} = useContext(loaderContext);
  const {colors} = useContext(themeContext);

  const [songsList, setSongsList] = useState([]);

  const renderItem = ({item}) => (
    <SongInfoCard
      title={item.title}
      thumbnailUrl={item.thumbnailUrl}
      subtitle={item.subtitle}
    />
  );

  const getPlaylistSongs = async playlistId => {
    setLoading(true);
    let newList = [];
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/playlistItems',
        {
          params: {
            key: API_KEY,
            part: 'contentDetails,id,snippet,status',
            playlistId: playlistId,
            maxResults: 25,
          },
        },
      );
      // console.log(response.data);

      const videoArray = response.data.items;
      for (let index = 0; index < videoArray.length; index++) {
        const element = videoArray[index];

        const title = element.snippet.title;
        const subtitle = element.snippet.videoOwnerChannelTitle;
        const thumbnailUrl = element.snippet.thumbnails.default.url;
        const id = element.id;
        const videoId = element.snippet.resourceId.videoId;

        // console.log(title, subtitle, thumbnailUrl, id, videoId);
        newList.push({
          title,
          subtitle,
          thumbnailUrl,
          id,
          videoId,
        });
      }
    } catch (error) {
      console.error(error);
    }
    setSongsList(newList);
    setLoading(false);
  };

  useEffect(() => {
    getPlaylistSongs(playlistId);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <AppHeader />
      <View style={styles.listArea}>
        <Text style={[styles.listTitle, {color: colors.foreground}]}>
          List of Songs
        </Text>
        <Text style={[styles.playlistName, {color: colors.foreground}]}>
          {playlistTitle}
        </Text>
        <Divider
          style={[styles.dividerStyle, {backgroundColor: colors.foreground}]}
        />
        <FlatList
          data={songsList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listArea: {
    paddingHorizontal: 20,
    marginVertical: 20,
    flex: 1
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 5,
  },
  playlistName: {
    fontSize: 19,
    marginBottom: 5,
  },
  dividerStyle: {
    width: '100%',
    marginVertical: 20,
  },
});
