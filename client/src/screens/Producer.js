import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../constants';
import Button from '../components/Button';

const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

const ProducerScreen = () => {
  const addProduct = () => {};
  const removeProduct = () => {};
  const addQRCode = () => {};
  const removeQRCode = () => {};
  const sellProduct = () => {};
  const changeOwnership = () => {};
  const addProducer = () => {};
  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={colors.green1}
        barStyle="light-content"
        translucent={true}
      />
      <LinearGradient
        colors={[colors.green1, colors.green2, colors.green3]}
        style={styles.container}>
        <Button
          handleTouch={addProducer}
          label="Create account"
          backgroundColor={colors.green}
          color={colors.white}
        />
        <Button
          handleTouch={addProduct}
          label="Add Product"
          backgroundColor={colors.green}
          color={colors.white}
        />
        <Button
          handleTouch={removeProduct}
          label="Remove Product"
          backgroundColor={colors.green}
          color={colors.white}
        />
        <Button
          handleTouch={addQRCode}
          label="Add QR Code"
          backgroundColor={colors.green}
          color={colors.white}
        />
        <Button
          handleTouch={removeQRCode}
          label="Remove QR Code"
          backgroundColor={colors.green}
          color={colors.white}
        />
        <Button
          handleTouch={sellProduct}
          label="Sell Product"
          backgroundColor={colors.green}
          color={colors.white}
        />
        <Button
          handleTouch={changeOwnership}
          label="Change Ownership"
          backgroundColor={colors.green}
          color={colors.white}
        />
      </LinearGradient>
    </>
  );
};

export default ProducerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {},
});
