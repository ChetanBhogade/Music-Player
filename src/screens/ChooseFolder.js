import React, {useEffect, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Divider, Button} from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import ListOfFolder from '../components/ListOfFolder';
import RNFS from 'react-native-fs';

const ChooseFolder = () => {
  const [currentFolderList, setCurrentFolderList] = useState([]);

  const renderRootFolder = async () => {
    console.log('Rendering root folder....');

    RNFS.readDir('/storage/')
      .then(async result => {
        console.log('Got Result: - ', result);

        let validFolders = [];

        for (let index = 0; index < result.length; index++) {
          const statDetails = await RNFS.stat(result[index].path);
          if (statDetails.path === '/storage/emulated') {
            validFolders.push({
              ...statDetails,
              path: `${statDetails.path}/0`,
            });
          } else {
            validFolders.push(statDetails);
          }
        }
        console.log('ValidFolders: - ', validFolders);
        setCurrentFolderList(validFolders);
        return validFolders;
      })
      .catch(err => {
        console.log('Error: - ', err.message, err.code);
      });
  };

  const renderChooseFoldersList = ({item}) => {
    return (
      <ListOfFolder
        name={item.path}
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
        <Text style={styles.headerStyle}>Modify your playlists</Text>
        <Divider orientation="horizontal" style={{marginVertical: 10}} />
        <ListOfFolder name="Chetan" />
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
            console.log('I like this folder.');
          }}
          title="Select This Folder"
        />
      </View>
    </View>
  );
};

export default ChooseFolder;

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
