import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Header } from 'react-native-elements';
import colors from '../assets/colors';

const AppHeader = () => {
  return (
    <View>
      <Header
        barStyle="default"
        backgroundColor={colors.dark}
        leftComponent={{icon: 'menu', color: colors.white}}
        placement="center"
        rightComponent={{icon: 'search', color: colors.white}}
        leftContainerStyle={{paddingLeft: 10}}
        rightContainerStyle={{paddingRight: 10}}
      />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
