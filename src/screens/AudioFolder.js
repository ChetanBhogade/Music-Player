import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AppHeader from '../components/AppHeader';
import {Divider, Button} from 'react-native-elements';
import FolderInfo from '../components/FolderInfo';
import {width} from '../constant/ScreenDimensions';

const AudioFolder = () => {
  return (
    <View style={styles.root}>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Modify your playlists</Text>
        <Divider orientation="horizontal" style={{marginVertical: 10}} />
        <FolderInfo />
        <FolderInfo />
        <FolderInfo />
        <FolderInfo />
      </View>
      <Divider orientation="horizontal" style={{marginVertical: 10}} />
      <View style={styles.bottomActionWrapper}>
        <Button title="Add New Playlist" />
        <View style={styles.actionBtnWrapper}>
          <Button buttonStyle={styles.actionBtn} title="Cancel" />
          <Button buttonStyle={styles.actionBtn} title="OK" />
        </View>
      </View>
    </View>
  );
};

export default AudioFolder;

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
});
