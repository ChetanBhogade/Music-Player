import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Divider, Button} from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import ListOfFolder from '../components/ListOfFolder';
import RNFS from 'react-native-fs';

const ChooseFolder = () => {
  const [currentFolderList, setCurrentFolderList] = useState([]);
  const [latestFolderPath, setLatestFolderPath] = useState('');


  const renderRootFolder = async () => {
    console.log('Rendering root folder....');

    RNFS.readDir('/storage/')
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
          if (folderPath === '/storage/emulated') {
            validFolders.push({
              ...statDetails,
              folderName: `${folderName}/0`,
              path: `${folderPath}/0`,
            });
          } else {
            if (folderPath !== '/storage/self') {
              validFolders.push({...statDetails, folderName: folderName});
            }
          }
        }
        setCurrentFolderList(validFolders);
        setLatestFolderPath("/storage")
      })
      .catch(err => {
        console.log('Error: - ', err.message, err.code);
      });
  };

  const getSelectedFolderList = item => {
    console.log('Getting selected folder list....');
    RNFS.readDir(item.path)
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
        setLatestFolderPath(item.path);
      })
      .catch(error => {
        console.log('Got an error: - ', error.message, error.code);
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
