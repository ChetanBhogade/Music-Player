import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';

const SongInfoCard = ({thumbnailUrl, title, subtitle, videoId, navigation}) => {
  return (
    <View>
      <ListItem
        Component={TouchableHighlight}
        containerStyle={{}}
        style={{marginVertical: 5}}
        disabledStyle={{opacity: 0.5}}
        onLongPress={() => console.log('onLongPress()')}
        onPress={() => {
          console.log('onPress()');
          navigation.navigate('Player', {
            videoId,
          });
        }}
        pad={20}>
        <Avatar
          source={{
            uri: thumbnailUrl,
          }}
          style={styles.avatarStyle}
        />
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.titleStyle}>{title.slice(0, 30)}...</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.subtitleStyle}>{subtitle}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default SongInfoCard;

const styles = StyleSheet.create({
  avatarStyle: {
    width: 50,
    height: 50,
  },
  titleStyle: {
    fontWeight: 'bold',
    color: '#120E43',
  },
  subtitleStyle: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#5A20CB',
  },
});
