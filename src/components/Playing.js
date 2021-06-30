import React, {useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Avatar, ListItem, Slider} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {loaderContext} from '../context/loaderContext';

const Playing = ({title, subtitle, sliderValue}) => {
  const {setLoading} = useContext(loaderContext);

  return (
    <>
      <View style={styles.sliderWrapper}>
        <Slider
          value={sliderValue}
          style={{width: '100%', height: 0}}
          thumbStyle={styles.sliderThumbStyle}
          // onValueChange={value => this.setState({value})}
          maximumValue={100}
        />
      </View>
      <ListItem
        Component={View}
        containerStyle={{backgroundColor: '#dfe6e9'}}
        disabledStyle={{opacity: 0.5}}
        pad={20}
        // onLongPress={() => console.log('onLongPress()')}
        // onPress={() => console.log('onPress()')}
        // ViewComponent={View}
        // topDivider
      >
        <Avatar
          // source={require('../assets/gifs/music.gif')}
          icon={{ name: "music-note", type: "material-community", size: 45 }}
          size="large"
          overlayContainerStyle={{backgroundColor: '#000'}}
          style={{width: 55, height: 55 }}
          // iconStyle={{ width: 90 }}
          rounded
        />
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.titleStyle}>{title}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.subtitleStyle}>{subtitle}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <View style={styles.playerBtnWrapper}>
          <MaterialCommunityIcons
            name="skip-previous-outline"
            size={30}
            // color={colors.foreground}
            style={styles.btnStyle}
            onPress={() => {
              console.log('Icon pressed');
            }}
          />
          <MaterialCommunityIcons
            name="pause"
            size={30}
            style={styles.btnStyle}
            // color={colors.foreground}
            onPress={() => {
              console.log('Pause Icon pressed');
              setLoading(true);
            }}
          />
          <MaterialCommunityIcons
            name="skip-next-outline"
            size={30}
            style={styles.btnStyle}
            // color={colors.foreground}
          />
        </View>
      </ListItem>
    </>
  );
};

export default Playing;

const styles = StyleSheet.create({
  sliderWrapper: {
    alignItems: 'stretch',
    justifyContent: 'center',
    zIndex: 1,
  },
  sliderThumbStyle: {
    height: 15,
    width: 15,
    backgroundColor: '#120E43',
  },
  titleStyle: {fontWeight: 'bold'},
  subtitleStyle: {
    textTransform: 'uppercase',
    fontSize: 14,
  },
  playerBtnWrapper: {
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: colors.foreground,
    paddingVertical: 5,
  },
  btnStyle: {
    marginHorizontal: 8,
  },
});
