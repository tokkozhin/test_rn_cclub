import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';

export default function LoaderView() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'#0F49A1'} />
    </View>
  );
}
