import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import RoundButton from '../components/RoundButton';
import { colors } from '../constants';
import Product from '../components/Product';

const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

const UserScreen = ({ navigation }) => {
  const scanBottle = () => {
    navigation.navigate('NotCertified');
  };

  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={colors.blue1}
        barStyle="light-content"
        translucent={true}
      />
      <LinearGradient
        colors={[colors.blue1, colors.blue2, colors.blue3]}
        style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          <Product certified={true} />
          <Product certified={true} />
          <Product certified={false} />
          <Product certified={true} />
          <Product certified={false} />
          <Product certified={true} />
          <Product certified={true} />
          <Product certified={false} />
          <Product certified={true} />
          <Product certified={true} />
          <Product certified={true} />
          <Product certified={false} />
          <Product certified={true} />
          <Product certified={true} />
          <Product certified={false} />
        </ScrollView>
        <RoundButton handleTouch={scanBottle} backgroundColor={colors.white} />
      </LinearGradient>
    </>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
});
