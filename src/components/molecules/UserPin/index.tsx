import React from 'react';
import {Animated} from 'react-native';
import styles from './styles';
// libs
import {RNCamera} from 'react-native-camera';

export const DEFAULT_SIZE_PIN_USER = 70;

export interface IUserPin {
  x?: Animated.Value | 0;
  y?: Animated.Value | 0;
}

export default function UserPin({x = 0, y = 0}: IUserPin) {
  const styleContainer = {
    width: DEFAULT_SIZE_PIN_USER,
    height: DEFAULT_SIZE_PIN_USER,
    borderRadius: DEFAULT_SIZE_PIN_USER / 2,
  };
  return (
    <Animated.View
      style={[styles.container, styleContainer, {transform: [{translateX: x}, {translateY: y}]}]}>
      <RNCamera style={[styles.camera, styleContainer]} type={RNCamera.Constants.Type.front} />
    </Animated.View>
  );
}
