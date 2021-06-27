import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AppHeader from '../components/AppHeader';
import {buyCake} from '../myRedux';
import {FAB} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({noOfCakes, buyCake}) => {
  return (
    <View style={styles.container}>
      <AppHeader />
      <FAB
        placement="right"
        icon={
          <MaterialCommunityIcons name="playlist-plus" size={30} color="#FFF" />
        }
        onPress={() => {
          console.log('Add Playlist Button Clicked...');
        }}
      />
      <View style={styles.mainContent}>
        <TouchableOpacity
          onPress={() => {
            console.log('Button Pressed');
          }}
          style={{padding: 10, borderRadius: 10, backgroundColor: '#8D3DAF'}}>
          <Text style={{fontSize: 20, color: '#FFF'}}>
            Start Your App From Here
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 30}}>No of cakes: - {noOfCakes} </Text>
        <TouchableOpacity
          onPress={() => {
            console.log('Buy Cake');
            buyCake();
          }}
          style={{padding: 10, borderRadius: 10, backgroundColor: '#383CC1'}}>
          <Text style={{fontSize: 20, color: '#FFF'}}>Buy Cake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    noOfCakes: state.cakeReducer.noOfCakes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buyCake: () => dispatch(buyCake()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
