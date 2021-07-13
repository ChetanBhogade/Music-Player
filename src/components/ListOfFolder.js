import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ListOfFolder = ({name, item, onSelect}) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        console.log('Choose Folder Clicked...');
        onSelect(item.path);
        // navigation.navigate('Playlist', {
        //   name,
        //   id,
        //   isEdit: true,
        // });
      }}>
      <MaterialCommunityIcons name="folder-open" size={45} color="#7f8c8d" />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        {/* <ListItem.Subtitle>Audio Files: {noOfAudioFiles}</ListItem.Subtitle> */}
      </ListItem.Content>
      <ListItem.Chevron size={30} />
    </ListItem>
  );
};

export default ListOfFolder;

const styles = StyleSheet.create({});
