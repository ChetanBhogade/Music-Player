import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Divider } from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import colors from './assets/colors';
import Playing from './components/Playing';


const App = () => {
  return (
    <SafeAreaProvider>
      <View>
        <Text
          style={{
            fontSize: 20,
            padding: 5,
          }}>
          Chetan Bhogade - Welcome Screen
        </Text>
        <Divider style={{ backgroundColor: "blue", marginVertical: 30 }} />
        <Playing />
        <Divider style={{ backgroundColor: "blue", marginVertical: 30 }} />
        <Playing />
      </View>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
