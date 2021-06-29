import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import AppHeader from '../components/AppHeader';
import {FAB} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaylistInfo from '../components/PlaylistInfo';

const HomeScreen = ({navigation, playlist}) => {
  const renderPlaylistFolders = ({item}) => {
    return (
      <PlaylistInfo
        name={item.name}
        navigation={navigation}
        audioFilesInfo={item.audioFilesInfo}
        id={item.id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.mainContent}>
        <FlatList
          data={playlist}
          renderItem={renderPlaylistFolders}
          keyExtractor={item => item.id}
        />
      </View>
      <FAB
        placement="right"
        color="#1B98F5"
        size="large"
        icon={
          <MaterialCommunityIcons name="playlist-plus" size={25} color="#FFF" />
        }
        onPress={() => {
          console.log('Add Playlist Button Clicked...');
          navigation.navigate('AudioFolder');
        }}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    playlist: state.playlistReducer.playlist,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
});
