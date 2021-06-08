import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {Divider, Header} from 'react-native-elements';
import colors from '../assets/colors';
import AppHeader from '../components/AppHeader';
import PlayerCard from '../components/PlayerCard';
import Playing from '../components/Playing';

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

const HomeScreens = () => {
  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView>
        <View style={styles.playlistArea}>
          <Text style={styles.playlistTitle}>Recommended for you</Text>
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
