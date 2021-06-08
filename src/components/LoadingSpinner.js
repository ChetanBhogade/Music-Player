import React from 'react';
import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const LoadingSpinner = ({loading}) => {
  return (
    <Spinner
      visible={loading}
      textStyle={styles.spinnerTextStyle}
      animation="fade"
      overlayColor="rgba(0, 0, 0, 0.6)"
    />
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
});
