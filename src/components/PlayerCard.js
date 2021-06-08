import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../assets/colors';

const PlayerCard = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '100%',
          height: 190,
        }}
        resizeMode="contain"
        source={require('../assets/images/Rectangle72.png')}
      />
      <Text style={styles.title}>Monster Go Bump</Text>
      <Text style={styles.subtitle}>Chetan Bhogade</Text>
    </View>
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
    color: colors.white,
    marginTop: 10,
  },
  subtitle: {
    color: colors.secondaryText,
    fontSize: 10,
    marginTop: 5,
  },
});
