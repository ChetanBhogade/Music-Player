import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, BackHandler} from 'react-native';
import {Divider, Button} from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import ListOfFolder from '../components/ListOfFolder';
import RNFS from 'react-native-fs';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import {connect} from 'react-redux';
import uuid from 'react-native-uuid';
import {addPlaylist} from '../myRedux';

const ChooseFolder = ({navigation, addPlaylist}) => {
  const [currentFolderList, setCurrentFolderList] = useState([]);
  const [latestFolderPath, setLatestFolderPath] = useState('/storage');
  const [loading, setLoading] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);

  const handleSelectFolder = async () => {
    console.log('I like this folder.');
    const playlistName = latestFolderPath.split('/').pop();
    console.log('Selected Folder Name is: - ', playlistName);
    const audioList = await grabAudioFiles(latestFolderPath);
    console.log("Folder's Audio Files: - ", audioList, audioList.length);

    addPlaylist({
      id: uuid.v4(),
      name: playlistName,
      audioFilesInfo: await audioList.map(item => {
        return {
          id: uuid.v4(),
          title: item.fileName,
          url: item.originalFilepath,
          size: item.size,
        };
      }),
      timestamp: new Date().getTime(),
    });
    navigation.goBack();
  };

  const grabAudioFiles = path => {
    setLoading(true);
    return RNFS.readDir(path)
      .then(async result => {
        console.log('Got the result: - ', result);
        let newAudioFileList = [];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          const fileName = element.path.substring(
            element.path.lastIndexOf('/') + 1,
            element.path.length,
          );
          await RNFS.stat(element.path)
            .then(fileStat => {
              console.log('File Stat isFile: - ', fileStat.isFile());
              if (
                fileStat.isFile() &&
                (fileName.split('.').pop() === 'mp3' ||
                  fileName.split('.').pop() === 'MP3')
              ) {
                console.log('FileInfo: - ', fileStat);
                newAudioFileList.push({
                  ...fileStat,
                  fileName,
                });
              }
            })
            .catch(error => {
              console.log('Got an Error: - ', error);
            });
        }
        setLoading(false);
        return newAudioFileList;
      })
      .catch(error => {
        console.log('Got an error: - ', error.message, error.code);
        setLoading(false);
      });
  };

  useEffect(() => setVisibleToast(false), [visibleToast]);

  const verifyPath = path => {
    if (path === '/storage/emulated') {
      setLatestFolderPath('/storage/emulated/0');
    } else if (path === '/storage/self') {
      console.log('Path You are not allowed to access this folder');
      setVisibleToast(true);
      setLatestFolderPath('/storage');
    } else if (path === '/' || path === '') {
      navigation.goBack();
    }
  };

  const handleBackPress = () => {
    const folderStack = latestFolderPath.split('/');
    console.log('Hardware Back button pressed: - ');
    folderStack.pop();
    const newPath = folderStack.join('/');

    if (newPath === '/storage/emulated') {
      setLatestFolderPath('/storage');
    } else {
      setLatestFolderPath(newPath);
    }

    return true;
  };

  useEffect(() => {
    getSelectedFolderList(latestFolderPath);
  }, [latestFolderPath]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  });

  const renderRootFolder = async () => {
    console.log('Rendering root folder....');

    RNFS.readDir(latestFolderPath)
      .then(async result => {
        console.log('Got Result: - ', result);

        let validFolders = [];

        for (let index = 0; index < result.length; index++) {
          const statDetails = await RNFS.stat(result[index].path);
          const folderPath = statDetails.path;
          const folderName = folderPath.substring(
            folderPath.lastIndexOf('/') + 1,
            folderPath.length,
          );
          validFolders.push({...statDetails, folderName: folderName});
        }
        setCurrentFolderList(validFolders);
        // setLatestFolderPath('/storage');
      })
      .catch(err => {
        console.log('Error: - ', err.message, err.code);
      });
  };

  const getSelectedFolderList = path => {
    console.log('Getting selected folder list....');
    setLoading(true);
    verifyPath(path);
    RNFS.readDir(path)
      .then(async result => {
        console.log('Got the result: - ', result);
        let newFoldersList = [];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          const folderName = element.path.substring(
            element.path.lastIndexOf('/') + 1,
            element.path.length,
          );
          await RNFS.stat(element.path)
            .then(fileStat => {
              console.log('File Stat isDirectory: - ', fileStat.isDirectory());
              if (fileStat.isDirectory()) {
                // console.log('FileInfo: - ', fileStat);
                newFoldersList.push({
                  ...fileStat,
                  folderName: folderName,
                });
              }
            })
            .catch(error => {
              console.log('Got an Error: - ', error);
            });
        }
        setCurrentFolderList(newFoldersList);
        setLatestFolderPath(path);
        setLoading(false);
      })
      .catch(error => {
        console.log('Got an error: - ', error.message, error.code);
        setLoading(false);
      });
  };

  const renderChooseFoldersList = ({item}) => {
    return (
      <ListOfFolder
        name={item.folderName}
        item={item}
        onSelect={getSelectedFolderList}
      />
    );
  };

  useEffect(() => {
    renderRootFolder();
  }, []);

  return (
    <View style={styles.root}>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Choose Your Folder</Text>
        <Divider orientation="horizontal" style={{marginVertical: 10}} />
        <Text style={styles.breadcrumb}>
          Location: -{' '}
          <Text style={styles.breadcrumbText}>{latestFolderPath}</Text>
        </Text>
        <FlatList
          data={currentFolderList}
          renderItem={renderChooseFoldersList}
          keyExtractor={item => item.path}
        />
      </View>
      <Divider orientation="horizontal" style={{marginVertical: 10}} />
      <View style={styles.bottomActionWrapper}>
        <Button
          onPress={() => {
            handleSelectFolder();
          }}
          title="Select This Folder"
        />
      </View>
      <LoadingSpinner loading={loading} />
      <Toast
        visible={visibleToast}
        message="Path You are not allowed to access this folder"
      />
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addPlaylist: data => dispatch(addPlaylist(data)),
  };
};
export default connect(null, mapDispatchToProps)(ChooseFolder);

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
  breadcrumb: {
    fontSize: 14,
    marginHorizontal: 10,
    marginBottom: 10,
    color: '#758283',
  },
  breadcrumbText: {
    fontSize: 16,
    color: '#242B2E',
  },
});
