import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import AppHeader from '../components/AppHeader';
import PlayerCard from '../components/PlayerCard';
import Playing from '../components/Playing';
import {loaderContext} from '../context/loaderContext';
import {API_KEY} from '@env';
import {themeContext} from '../context/themeContext';

const RecommendedPlaylists = [
  'PLgzTt0k8mXzEk586ze4BjvDXR7c-TUSnx',
  'PLO7-VO1D0_6NmK47v6tpOcxurcxdW-hZa',
  'PL3oW2tjiIxvTSdJ4zqjL9dijeZ0LjcuGS',
  'PL6CTrxW12Bre4kny-OhqOEQwNjso0VKPc',
  'PLvFYFNbi-IBFeP5ALr50hoOmKiYRMvzUq',
];

const HindiPlaylist = [
  'PL9oqVauEE2LIXtGYECl3wT1f5ae5EwDEZ',
  'PLvczmdAAtKHtY2Cz_Gd8n4Ry9dO7DtgTv',
  'PLwgf_2_aBmU1kuCXh6_SNQ0lLOidOE94m',
  'PLpUZ06MlpWaBDomczo6ftjdOAL3KNLk2z',
];

const MarathiPlaylist = [
  'PLClKG3RAWVOte20nJvOHgrirZXZkrO6p_',
  'PLN_pFG_Bv6D4-gpRS06J2auY87DQaEDuo',
  'PLGpLqaMxppFp2FUQJnJeUT7FZj1wLcJHA',
  'PLGpLqaMxppFq6htuAYtoKIlwItU_Gl_Zs',
  'PLnGgwGS29G0GkGvNRuLyHg0MMbpIJHuu_',
];

const HomeScreens = ({navigation}) => {
  const [recommendedList, setRecommendedList] = useState([]);
  const [hindiList, setHindiList] = useState([]);
  const [marathiList, setMarathiList] = useState([]);

  const {setLoading} = useContext(loaderContext);
  const {colors} = useContext(themeContext);

  const getPlaylistDetails = async playlist => {
    setLoading(true);
    let newList = [];
    try {
      for (let index = 0; index < playlist.length; index++) {
        const element = playlist[index];

        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/playlists',
          {
            params: {
              key: API_KEY,
              part: 'snippet,contentDetails,status,id,localizations,player',
              id: element,
            },
          },
        );
        // console.log(response.data);

        const title = response.data.items[0].snippet.title;
        const channelId = response.data.items[0].snippet.channelTitle;
        const thumbnailUrl =
          response.data.items[0].snippet.thumbnails.medium.url;
        const id = response.data.items[0].id;

        newList.push({
          title,
          channelId,
          thumbnailUrl,
          id,
        });
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    return newList;
  };

  const setDefaultHomeData = async () => {
    const recommendedData = await getPlaylistDetails(RecommendedPlaylists);
    const hindiPlaylistData = await getPlaylistDetails(HindiPlaylist);
    const marathiPlaylistData = await getPlaylistDetails(MarathiPlaylist);
    setRecommendedList(recommendedData);
    setHindiList(hindiPlaylistData);
    setMarathiList(marathiPlaylistData);
  };

  useEffect(() => {
    setDefaultHomeData();
  }, []);

  const renderItem = ({item}) => (
    <PlayerCard
      title={item.title}
      thumbnailUrl={item.thumbnailUrl}
      channelId={item.channelId}
      playlistId={item.id}
      navigation={navigation}
    />
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <AppHeader />
      <ScrollView>
        <View style={styles.playlistArea}>
          <Text style={[styles.playlistTitle, {color: colors.foreground}]}>
            Recommended for you (Global)
          </Text>
          <FlatList
            data={recommendedList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View>

        <View style={styles.playlistArea}>
          <Text style={[styles.playlistTitle, {color: colors.foreground}]}>
            Hindi Playlists
          </Text>
          <FlatList
            data={hindiList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View>

        <View style={styles.playlistArea}>
          <Text style={[styles.playlistTitle, {color: colors.foreground}]}>
            Marathi Playlists
          </Text>
          <FlatList
            data={marathiList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View>
      </ScrollView>
      <Playing
        title="First Song"
        subtitle="Chetan"
        thumbnail={require('../assets/images/Rectangle69.png')}
        sliderValue={32}
      />
    </View>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playlistArea: {
    // borderColor: colors.foreground,
    // borderWidth: 1,
    paddingLeft: 20,
    marginVertical: 20,
  },
  playlistTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 15,
  },
});
