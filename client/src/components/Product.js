import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../constants';
import wineImage from '../public/wine.png';

const Product = ({ certified }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={wineImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Malbec 2019</Text>
        <Text style={styles.description}>Bodega Catena Zapata</Text>
        <View style={styles.rating}>
          <FontAwesome color="gold" name="star" size={20} />
          <FontAwesome color="gold" name="star" size={20} />
          <FontAwesome color="gold" name="star" size={20} />
          <FontAwesome color="gold" name="star" size={20} />
          <FontAwesome color="gold" name="star-half-empty" size={20} />
        </View>
      </View>
      <View style={styles.iconContainer}>
        {certified ? (
          <Ionicons color={colors.black} name="ribbon-outline" size={50} />
        ) : (
          <MaterialIcons color={colors.black} name="error-outline" size={50} />
        )}
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: colors.white,
  },
  image: {
    width: 75,
    height: 75,
  },
  infoContainer: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
  },
  description: {
    marginVertical: 5,
  },
  rating: {
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
    marginRight: 20,
  },
});
