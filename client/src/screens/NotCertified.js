import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';

import { colors } from '../constants';

const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

const NotCertified = ({ navigation }) => {
  const handleReScan = () => {};
  const handleReport = () => {};

  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={colors.blue}
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
        <MaterialIcons color={colors.white} name="error-outline" size={200} />
        <View style={styles.sorry}>
          <Text style={styles.title}>Sorry</Text>
          <MaterialCommunityIcons
            color={colors.white}
            name="emoticon-sad-outline"
            size={40}
          />
        </View>
        <Text style={styles.description}>
          We don't recognise this bottle from our digital birth certificates.
        </Text>
        <Text style={styles.info}>
          This bottle tag could not be found in our system. It could be
          counterfeit and should be checked by an authorized representative of
          the producer/winery
        </Text>
        <View style={styles.buttons}>
          <TouchableNativeFeedback onPress={handleReScan}>
            <View style={styles.leftButton}>
              <Text style={styles.leftText}>Re-scan</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={handleReport}>
            <View style={styles.rightButton}>
              <Text style={styles.rightText}>Report this bottle</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </>
  );
};

export default NotCertified;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.blue,
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
  sorry: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: colors.white,
    marginRight: 10,
  },
  description: {
    color: colors.white,
    padding: 20,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 25,
  },
  info: {
    paddingHorizontal: 20,
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 30,
  },
  leftButton: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
    paddingRight: 10,
    paddingLeft: 20,
    paddingVertical: 5,
    width: '40%',
  },
  leftText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  rightButton: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: colors.white,
    paddingRight: 20,
    paddingLeft: 10,
    paddingVertical: 5,
    width: '40%',
  },
  rightText: {
    color: colors.blue,
    fontSize: 16,
    textAlign: 'center',
  },
});
