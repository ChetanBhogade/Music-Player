import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from 'react-native-elements';
import {themeContext} from '../context/themeContext';

const AppHeader = () => {
  const {colors, isDarkTheme, setIsDarkTheme} = useContext(themeContext);

  return (
    <Header
      barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      backgroundColor={colors.background}
      centerComponent={{
        text: 'Music Player',
        style: {color: colors.foreground, fontSize: 18},
        onPress: () => {
          console.log('Center Header clicked...');
        },
      }}
      leftComponent={{
        icon: isDarkTheme ? 'brightness-high' : 'brightness-4',
        color: colors.foreground,
        onPress: () => {
          setIsDarkTheme(!isDarkTheme);
        },
      }}
      placement="center"
      rightComponent={{icon: 'search', color: colors.foreground}}
      leftContainerStyle={{paddingLeft: 10}}
      rightContainerStyle={{paddingRight: 10}}
    />
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
