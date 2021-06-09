import React, {useContext} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {themeContext} from '../context/themeContext';

const PlayerCard = ({
  thumbnailUrl,
  title,
  channelId,
  playlistId,
  navigation,
}) => {
  const {colors} = useContext(themeContext);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('Card Pressed with id: - ', playlistId);
        navigation.navigate('Playlist', {
          playlistId,
          playlistTitle: title,
        });
      }}>
      <View
        onPress={() => {
          console.log('Card Pressed with id: - ', playlistId);
        }}
        style={styles.container}>
        <Image
          style={{
            width: '100%',
            height: 180,
          }}
          resizeMode="contain"
          source={{
            uri: thumbnailUrl,
          }}
        />
        <Text style={[styles.title, {color: colors.foreground}]}>
          {title.slice(0, 20)}...
        </Text>
        <Text style={[styles.subtitle, {color: colors.secondaryText}]}>
          {channelId}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlayerCard;

const styles = StyleSheet.create({
  container: {
    width: 190,
    height: 242,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 18.83,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 10,
    marginTop: 5,
  },
});
