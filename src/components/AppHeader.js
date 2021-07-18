import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from 'react-native-elements';

const AppHeader = () => {
  // const {colors, isDarkTheme, setIsDarkTheme} = useContext(themeContext);

  return (
    <Header
      barStyle='light-content'
      // backgroundColor={colors.background}
      centerComponent={{
        text: 'Music Player',
        style: {fontSize: 18, color: "#FFF"},
        onPress: () => {
          console.log('Center Header clicked...');
        },
      }}
      leftComponent={{
        icon: 'library-music',
        color: "#FFF",
        onPress: () => {
          console.log("Music Player Icon Clicked...")
        },
      }}
      placement="left"
      // rightComponent={{icon: 'search', color: colors.foreground}}
      leftContainerStyle={{paddingLeft: 10}}
      rightContainerStyle={{paddingRight: 10}}
    />
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
