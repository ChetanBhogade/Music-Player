import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import AppHeader from '../components/AppHeader';
import {buyCake} from '../myRedux';
import {FAB} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeContext} from '../context/themeContext';
import PlaylistInfo from '../components/PlaylistInfo';

const HomeScreen = ({noOfCakes, buyCake, navigation, playlist}) => {
  // const {colors, isDarkTheme, setIsDarkTheme} = useContext(themeContext);

  const renderPlaylistFolders = ({item}) => {
    return (
      <PlaylistInfo name={item.name} noOfAudioFiles={item.audioFiles?.length} />
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
        {/* <TouchableOpacity
          onPress={() => {
            console.log('Button Pressed');
          }}
          style={{padding: 10, borderRadius: 10, backgroundColor: '#8D3DAF'}}>
          <Text style={{fontSize: 20, color: '#FFF'}}>
            Start Your App From Here
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 30}}>No of cakes: - {noOfCakes} </Text>
        <TouchableOpacity
          onPress={() => {
            console.log('Buy Cake');
            buyCake();
          }}
          style={{padding: 10, borderRadius: 10, backgroundColor: '#383CC1'}}>
          <Text style={{fontSize: 20, color: '#FFF'}}>Buy Cake</Text>
        </TouchableOpacity> */}
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
    noOfCakes: state.cakeReducer.noOfCakes,
    playlist: state.playlistReducer.playlist,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buyCake: () => dispatch(buyCake()),
  };
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
