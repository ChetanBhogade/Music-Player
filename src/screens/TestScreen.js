import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppHeader from '../components/AppHeader';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import TrackPlayer from 'react-native-track-player';

const TestScreen = () => {
  const pickYourFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
        res,
      );
      return res;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const pickYourFolder = async () => {
    try {
      const res = await DocumentPicker.pickDirectory();
      console.log(res);
      return res.uri;
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw error;
      }
    }
  };

  const basicFileSystemImplementation = async () => {
    const path = await pickYourFolder();
    RNFS.readDirAssets(path)
      .then(ReadDirItem => {
        console.log('Got Result As: - ', ReadDirItem);

        // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then(statResult => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
      })
      .then(contents => {
        // log the file contents
        console.log(contents);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };

  const musicTrack = async () => {
    //
    const fileRes = await pickYourFile();
    console.log("File Response: - ", fileRes);

    TrackPlayer.setupPlayer().then(() => {
      // The player is ready to be used
      console.log('The player is ready to be used');
    });

    await TrackPlayer.add({
      id: 'trackId',
      url: "https://www.youtube.com/watch?v=UVWB9UHpXzY", //fileRes.uri,
      title: fileRes.name,
      artist: 'Track Artist',
      // artwork: require('track.png'),
    });

    await TrackPlayer.play();
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.mainContent}>
        <TouchableOpacity
          onPress={() => {
            // pickYourFile();
            // pickYourFolder();
            // basicFileSystemImplementation();
            musicTrack();
          }}
          style={{padding: 10, borderRadius: 10, backgroundColor: '#8D3DAF'}}>
          <Text style={{fontSize: 20, color: '#FFF'}}>Please your audios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
