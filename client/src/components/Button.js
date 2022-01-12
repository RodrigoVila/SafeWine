import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import { colors } from '../constants';

const Button = ({ handleTouch, label, color }) => {
  return (
    <TouchableNativeFeedback onPress={handleTouch}>
      <View style={[styles.container]}>
        <Text style={[styles.text, { color }]}>{label}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '70%',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    borderColor: colors.white,
    borderWidth: 1,
  },
  text: {
    color: colors.black,
    fontSize: 18,
  },
});
