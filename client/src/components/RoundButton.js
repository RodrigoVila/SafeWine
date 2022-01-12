import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../constants';

const RoundButton = ({ handleTouch, backgroundColor }) => {
  return (
    <TouchableNativeFeedback onPress={handleTouch}>
      <View style={[styles.container, { backgroundColor }]}>
        <AntDesign color={colors.blue} name="scan1" size={25} />
      </View>
    </TouchableNativeFeedback>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 10,
  },
});
