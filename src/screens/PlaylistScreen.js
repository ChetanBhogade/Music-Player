import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import AppHeader from '../components/AppHeader';
import SongInfo from '../components/SongInfo';
import DocumentPicker from 'react-native-document-picker';
import {addPlaylistSong} from '../myRedux';
import uuid from 'react-native-uuid';
import Playing from '../components/Playing';

const PlaylistScreen = ({route, playlist, addPlaylistSong}) => {
  const {name, id} = route.params;

  const audioFilesList = playlist => {
    let audioList;
    for (let index = 0; index < playlist.length; index++) {
      const element = playlist[index];
      if (element.id === id) {
        audioList = element.audioFilesInfo;
      }
    }
    return audioList;
  };

  const renderSongInfo = ({item}) => {
    return <SongInfo name={item.name} />;
  };

  const pickMultipleFiles = async () => {
    console.log('Pick Multiple files from storage....');
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.audio],
      });
      for (const res of results) {
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
        const newSongDetails = {
          id: uuid.v4(),
          name: res.name,
          path: res.uri,
          type: res.type,
          size: res.size,
        };
        addPlaylistSong({id, newSongDetails});
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log('User cancelled the picker!');
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={styles.root}>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.headerStyle}>{name}</Text>
        <Divider orientation="horizontal" style={{marginVertical: 10}} />
        <FlatList
          data={audioFilesList(playlist)}
          renderItem={renderSongInfo}
          keyExtractor={item => item.id}
        />
      </View>
      <Divider orientation="horizontal" style={{marginVertical: 10}} />
      <View style={styles.bottomActionWrapper}>
        <Button
          onPress={() => {
            pickMultipleFiles();
          }}
          title="Add Your Songs"
        />
      </View>
      <Divider orientation="horizontal" style={{marginVertical: 10}} />
      <View>
        <Playing
          title="Chetan Bhogade"
          sliderValue={35}
          subtitle="01:20 - 04:30"
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    playlist: state.playlistReducer.playlist,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPlaylistSong: data => dispatch(addPlaylistSong(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginVertical: 1,
  },
  headerStyle: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 5,
  },
  bottomActionWrapper: {
    margin: 8,
  },
});
