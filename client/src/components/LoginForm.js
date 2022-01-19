import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  Button,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';

import { colors } from '../constants';
import image from '../public/sea.jpg';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const LoginForm = ({
  onChangeUser,
  onChangePassword,
  onSubmit,
  errorMessage,
  isLoading,
  onConnect,
}) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={styles.container} onPress={() => Keyboard.dismiss()}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <ImageBackground source={image} style={styles.image} blurRadius={10}>
        <Button title="hola" onPress={onConnect} />
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <FontAwesome style={styles.icon} name="user-o" size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Usuario"
              placeholderTextColor={colors.white}
              autoCorrect={false}
              onChangeText={onChangeUser}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="lock-outline" size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Clave"
              placeholderTextColor={colors.white}
              autoCorrect={false}
              onChangeText={onChangePassword}
              secureTextEntry={showPassword}
            />

            <MaterialCommunityIcons
              style={styles.passwordIcon}
              name={showPassword ? 'eye-off' : 'eye-outline'}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <TouchableOpacity
            style={styles.loginButtonTouchable}
            activeOpacity={1}
            onPress={onSubmit}>
            <View style={styles.loginButtonContainer}>
              <Text style={styles.loginButtonText}>Iniciar sesion</Text>
            </View>
          </TouchableOpacity>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : null}
      </ImageBackground>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },

  formContainer: {
    width: '100%',
    padding: 20,
    zIndex: 20,
  },

  icon: {
    color: 'white',
    padding: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.white,
  },

  textInput: {
    flex: 1,
  },

  passwordIcon: {
    color: 'white',
    alignSelf: 'center',
  },

  loginButtonTouchable: {
    marginVertical: 20,
  },

  loginButtonContainer: {
    padding: 9,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },

  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },

  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.red,
  },
});
