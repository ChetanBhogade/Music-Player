import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, ListItem, Slider} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeContext} from '../context/themeContext';
import {loaderContext} from '../context/loaderContext';

const Playing = ({title, subtitle, thumbnail, sliderValue}) => {
  const {setLoading} = useContext(loaderContext);
  const {colors} = useContext(themeContext);

  return (
    <>
      <View style={styles.sliderWrapper}>
        <Slider
          value={sliderValue}
          style={{width: '100%', height: 0}}
          thumbStyle={[
            styles.sliderThumbStyle,
            {backgroundColor: colors.foreground},
          ]}
          // onValueChange={value => this.setState({value})}
          minimumTrackTintColor={colors.foreground}
          maximumValue={100}
        />
      </View>
      <ListItem
        Component={View}
        containerStyle={{backgroundColor: colors.background}}
        disabledStyle={{opacity: 0.5}}
        pad={20}
        // onLongPress={() => console.log('onLongPress()')}
        // onPress={() => console.log('onPress()')}
        // ViewComponent={View}
        // topDivider
      >
        <Avatar source={thumbnail} style={{width: 64, height: 64}} rounded />
        <ListItem.Content>
          <ListItem.Title>
            <Text style={[styles.titleStyle, {color: colors.foreground}]}>
              {title}
            </Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={[styles.subtitleStyle, {color: colors.secondaryText}]}>
              {subtitle}
            </Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <View style={styles.playerBtnWrapper}>
          <MaterialCommunityIcons
            name="skip-previous-outline"
            size={30}
            color={colors.foreground}
            style={styles.btnStyle}
            onPress={() => {
              console.log('Icon pressed');
            }}
          />
          <MaterialCommunityIcons
            name="pause"
            size={30}
            style={styles.btnStyle}
            color={colors.foreground}
            onPress={() => {
              console.log('Pause Icon pressed');
              setLoading(true);
            }}
          />
          <MaterialCommunityIcons
            name="skip-next-outline"
            size={30}
            style={styles.btnStyle}
            color={colors.foreground}
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
  sliderThumbStyle: {height: 15, width: 15},
  titleStyle: {fontWeight: 'bold'},
  subtitleStyle: {
    textTransform: 'uppercase',
    fontSize: 12,
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
