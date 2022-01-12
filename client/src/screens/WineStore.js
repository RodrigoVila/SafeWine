import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../components/Button';
import { colors } from '../constants';

const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

const StoreScreen = ({ navigation }) => {
  const scanProduct = () => {
    navigation.navigate('QRScanner');
  };
  const sellBottle = () => {
    navigation.navigate('QRScanner');
  };

  const addStore = () => {
    navigation.navigate('QRScanner');
  };
  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={colors.red1}
        barStyle="light-content"
        translucent={true}
      />
      <LinearGradient
        colors={[colors.red1, colors.red2, colors.red3]}
        style={styles.container}>
        <Button
          handleTouch={addStore}
          label="Create account"
          backgroundColor={colors.wine}
          color={colors.white}
        />
        <Button
          handleTouch={scanProduct}
          label="Scan existing product"
          backgroundColor={colors.wine}
          color={colors.white}
        />
        <Button
          handleTouch={sellBottle}
          label="Sell product"
          backgroundColor={colors.wine}
          color={colors.white}
        />
        <Button
          handleTouch={addStore}
          label="Add new store"
          backgroundColor={colors.wine}
          color={colors.white}
        />
      </LinearGradient>
    </>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
