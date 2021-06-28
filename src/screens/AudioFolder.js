import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, FlatList} from 'react-native';
import AppHeader from '../components/AppHeader';
import {Divider, Button, Overlay, Input} from 'react-native-elements';
import FolderInfo from '../components/FolderInfo';
import {width} from '../constant/ScreenDimensions';
import {connect} from 'react-redux';
import {addPlaylist} from '../myRedux';
import uuid from 'react-native-uuid';

const AudioFolder = ({navigation, playlist, addPlaylist}) => {
  const [visible, setVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const renderPlaylistFolders = ({item}) => {
    return (
      <FolderInfo name={item.name} noOfAudioFiles={item.audioFiles.length} />
    );
  };

  return (
    <View style={styles.root}>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Modify your playlists</Text>
        <Divider orientation="horizontal" style={{marginVertical: 10}} />
        <FlatList
          data={playlist}
          renderItem={renderPlaylistFolders}
          keyExtractor={item => item.id}
        />
      </View>
      <Divider orientation="horizontal" style={{marginVertical: 10}} />
      <View style={styles.bottomActionWrapper}>
        <Button
          onPress={() => {
            setVisible(true);
          }}
          title="Add New Playlist"
        />
        <View style={styles.actionBtnWrapper}>
          <Button buttonStyle={styles.actionBtn} title="Cancel" />
          <Button buttonStyle={styles.actionBtn} title="OK" />
        </View>
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={{fontSize: 20}}> Create Your New Playlist: - </Text>
        <View style={styles.formWrapper}>
          <Input
            placeholder="Playlist Name"
            leftIcon={{type: 'font-awesome', name: 'plus-square-o'}}
            style={styles.inputStyle}
            onChangeText={value => setPlaylistName(value)}
          />
          <Button
            title="Add Playlist"
            type="outline"
            onPress={() => {
              console.log('Playlist Name: - ', playlistName);
              addPlaylist({
                id: uuid.v4(),
                name: playlistName,
                audioFiles: [],
                timestamp: new Date().getTime(),
              });
              setVisible(false)
            }}
          />
        </View>
      </Overlay>
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
    addPlaylist: data => dispatch(addPlaylist(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioFolder);

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
  actionBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionBtn: {
    width: width / 2 - 10,
  },
  inputStyle: {
    width: '100%',
  },
  formWrapper: {
    marginVertical: 5,
  },
});
