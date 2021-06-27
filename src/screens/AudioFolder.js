import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppHeader from '../components/AppHeader';
import {Divider, Button} from 'react-native-elements';
import FolderInfo from '../components/FolderInfo';

const AudioFolder = () => {
  return (
    <View style={styles.root}>
      <AppHeader />
      <View style={styles.container}>
        <Text style={{fontSize: 25, textAlign: 'center'}}>
          Modify your playlists
        </Text>
        <Divider orientation="horizontal" style={{marginVertical: 10}} />
        <FolderInfo />
        <FolderInfo />
        <FolderInfo />
        <FolderInfo />
      </View>
      <View>
        <Button title="Solid Button" />
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
});
