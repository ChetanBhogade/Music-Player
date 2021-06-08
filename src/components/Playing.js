import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {Avatar, Card, ListItem, Slider} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors';

const Playing = ({ title, subtitle, thumbnail, sliderValue }) => {
  return (
    <>
      <View style={styles.sliderWrapper}>
        <Slider
          value={sliderValue}
          style={{width: '100%', height: 0}}
          thumbStyle={styles.sliderThumbStyle}
          // onValueChange={value => this.setState({value})}
          minimumTrackTintColor={colors.white}
          maximumValue={100}
        />
      </View>
      <ListItem
        Component={View}
        containerStyle={{backgroundColor: colors.dark}}
        disabledStyle={{opacity: 0.5}}
        pad={20}
        // onLongPress={() => console.log('onLongPress()')}
        // onPress={() => console.log('onPress()')}
        // ViewComponent={View}
        // topDivider
      >
        <Avatar
          source={thumbnail}
          style={{width: 64, height: 64}}
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
            color={colors.white}
            style={styles.btnStyle}
            onPress={() => {
              console.log('Icon pressed');
            }}
          />
          <MaterialCommunityIcons
            name="pause"
            size={30}
            style={styles.btnStyle}
            color={colors.white}
          />
          <MaterialCommunityIcons
            name="skip-next-outline"
            size={30}
            style={styles.btnStyle}
            color={colors.white}
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
  sliderThumbStyle: {height: 15, width: 15, backgroundColor: colors.white},
  titleStyle: {color: colors.white, fontWeight: "bold"},
  subtitleStyle: {
    textTransform: 'uppercase',
    color: colors.secondaryText,
    fontSize: 12,
  },
  playerBtnWrapper: {
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: colors.white,
    paddingVertical: 5,
  },
  btnStyle: {
    marginHorizontal: 8,
  },
});
