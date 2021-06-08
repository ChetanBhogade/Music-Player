import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import colors from '../assets/colors';
import AppHeader from '../components/AppHeader';
import PlayerCard from '../components/PlayerCard';
import Playing from '../components/Playing';
import {loaderContext} from '../context/loaderContext';
import {API_KEY} from '@env';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-fbd91aa97f63',
    title: 'Forth Item',
  },
];

const RecommendedPlaylistsId = [
  'PLO7-VO1D0_6NmK47v6tpOcxurcxdW-hZa',
  'PL3oW2tjiIxvTSdJ4zqjL9dijeZ0LjcuGS',
  'PL6CTrxW12Bre4kny-OhqOEQwNjso0VKPc',
  'PLvFYFNbi-IBFeP5ALr50hoOmKiYRMvzUq',
];

const HomeScreens = () => {
  const [recommendedList, setRecommendedList] = useState([]);
  const {setLoading} = useContext(loaderContext);

  const getDetails = async () => {
    setLoading(true);
    let newList = [];
    try {
      for (let index = 0; index < RecommendedPlaylistsId.length; index++) {
        const element = RecommendedPlaylistsId[index];

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
        console.log(response.data);

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
    setRecommendedList(newList);
    setLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const renderItem = ({item}) => (
    <PlayerCard
      title={item.title}
      thumbnailUrl={item.thumbnailUrl}
      channelId={item.channelId}
    />
  );

  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView>
        <View style={styles.playlistArea}>
          <Text style={styles.playlistTitle}>Recommended for you</Text>
          <FlatList
            data={recommendedList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View>
        {/* <View style={styles.playlistArea}>
          <Text style={styles.playlistTitle}>Recommended for OldOne</Text>
          <FlatList
            data={DATA}
            renderItem={PlayerCard}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View>
        <View style={styles.playlistArea}>
          <Text style={styles.playlistTitle}>Popular playlists</Text>
          <FlatList
            data={DATA}
            renderItem={PlayerCard}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View> */}
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
    backgroundColor: colors.dark,
  },
  playlistArea: {
    // borderColor: colors.white,
    // borderWidth: 1,
    paddingLeft: 20,
    marginVertical: 20,
  },
  playlistTitle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 15,
  },
});
