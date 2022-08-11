import React from 'react';
import {ColorValue, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {topBarBackgroundColor} from '../lib/theme';
interface BottomBarProps {
  backgroundColor?: ColorValue;
}

export const BottomBar: React.FC<BottomBarProps> = (props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      key="bottom-bar"
      style={{
        height: insets.bottom,
        backgroundColor: props.backgroundColor,
      }}
    />
  );
};
BottomBar.displayName = 'BottomBar';
