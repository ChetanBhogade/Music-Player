import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AppHeader from '../components/AppHeader';

const TestScreen = () => {
  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.mainContent}>
        <TouchableOpacity
          onPress={() => {
            console.log("Button Pressed")
          }}
          style={{padding: 10, borderRadius: 10, backgroundColor: '#8D3DAF'}}>
          <Text style={{fontSize: 20, color: '#FFF'}}>Please your audios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
