import React, {ReactNode} from 'react';
import {ImageBackground, ImageBackgroundProps, useWindowDimensions} from 'react-native';

interface IRoomImageBackground extends Omit<ImageBackgroundProps, 'source'> {
  children?: ReactNode;
  scale?: number;
}
export default function RoomImageBackground({children, scale = 4, ...props}: IRoomImageBackground) {
  const {width, height} = useWindowDimensions();
  return (
    <ImageBackground
      {...props}
      source={require('../../../assets/images/room.jpg')}
      style={{width: width * scale, height: height * scale}}>
      {children}
    </ImageBackground>
  );
}
