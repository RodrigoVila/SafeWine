import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const FocusedGradient = ['#4c669f', '#3b5998', '#192f6a'];
const NotFocusedGradient = ['#ffffff', '#ffffff'];

const CustomTabBar = ({ navigation }) => {
  return (
    <LinearGradient
      colors={FocusedGradient}
      style={{
        flex: 1,
        backgroundColor: 'dodgerblue',
      }}>
      <View />
    </LinearGradient>
  );
};

export default CustomTabBar;
