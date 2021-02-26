import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Animated,
  Pressable,
  ScrollView,
  useWindowDimensions,
  GestureResponderEvent,
} from 'react-native';
import styles from './styles';
// components
import LoaderView from '../../components/atoms/LoaderView';
import RoomImageBackground from '../../components/atoms/RoomImageBackground';
import UserPin, {DEFAULT_SIZE_PIN_USER} from '../../components/molecules/UserPin';

const {Value, parallel, timing} = Animated;
const DEFAULT_SCALE_ROOM = 4;

export default function RoomScreen() {
  const {width, height} = useWindowDimensions();
  const [preloading, setPreloading] = useState(true);
  const animX = useRef(new Value(width / 2 - DEFAULT_SIZE_PIN_USER / 2)).current;
  const animY = useRef(new Value(height / 2 - DEFAULT_SIZE_PIN_USER / 2)).current;

  const onLoadImage = () => setPreloading(false);

  const moveTo = useCallback(
    (x, y) => {
      parallel([
        timing(animX, {
          toValue: x - DEFAULT_SIZE_PIN_USER / 2,
          duration: 500,
          useNativeDriver: true,
        }),
        timing(animY, {
          toValue: y - DEFAULT_SIZE_PIN_USER / 2,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [animX, animY],
  );

  const onTapRoom = useCallback(
    (e: GestureResponderEvent) => {
      const {locationX, locationY} = e.nativeEvent;
      moveTo(locationX, locationY);
    },
    [moveTo],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{height: height * DEFAULT_SCALE_ROOM}}>
        <ScrollView
          bounces={false}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{width: width * DEFAULT_SCALE_ROOM}}>
          <Pressable onPress={onTapRoom}>
            <RoomImageBackground scale={DEFAULT_SCALE_ROOM} onLoad={onLoadImage}>
              <UserPin x={animX} y={animY} />
            </RoomImageBackground>
          </Pressable>
        </ScrollView>
      </ScrollView>
      {preloading && <LoaderView />}
    </View>
  );
}
