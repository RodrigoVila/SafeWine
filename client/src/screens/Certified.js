import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

import { colors } from '../constants';
import Button from '../components/Button';

const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

const Certified = ({ navigation }) => {
  const handleViewMore = () => {};
  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={colors.wine}
        barStyle="light-content"
        translucent={true}
      />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons
            style={styles.backIcon}
            name="ios-arrow-back-sharp"
            size={33}
            color={colors.white}
          />
        </TouchableWithoutFeedback>
        <Ionicons color={colors.white} name="ribbon-outline" size={250} />
        <Text style={styles.title}>Certified!</Text>
        <Text style={styles.description}>
          We can verify that the wine you're holding is authentic.
        </Text>
        <Text style={styles.info}>
          This wine was bottled on the 26 May 2020 9:38am by Bodega Catena
          Zapata bottling facility.
        </Text>

        <Button
          handleTouch={handleViewMore}
          label="Bottle Info"
          backgroundColor={colors.green}
          color={colors.white}
        />
      </View>
    </>
  );
};

export default Certified;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.wine,
    color: colors.white,
    paddingTop: StatusBar.currentHeight * 2,
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 99,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: colors.white,
  },
  description: {
    color: colors.white,
    padding: 20,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 25,
  },
  info: {
    paddingHorizontal: 20,
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 20,
  },
});
