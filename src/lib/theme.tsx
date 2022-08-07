//
// Colors
//
export const primary = '#344955';
export const pLight = '#5f7481';
export const secondary = '#F9AA33';
export const darkgray = '#bbbbbb';
export const gray = '#ededed';
export const black = '#333333';
export const white = '#FFFFFF';
export const appBackgroundColor = darkgray;
export const buttonBackgroundColor = secondary;
export const buttonColor = black;
export const keyboardBackgroundColor = primary;
export const keyboardColor = white;
export const topBarColor = white;
export const topBarBackgroundColor = primary;
export const pastilleBackgroundColor = gray;
export const pastilleSelectdBackgroundColor = '#F9AA33';
export const pastilleColor = black;
export const inputBackgroundColor = white;
export const inputColor = black;
export const bannerBackgroundColor = pLight;
export const bannerColor = white;
export const borderColor = primary;

//
// UI constants
//
export const fontSizes = {small: 12, medium: 18, large: 22, extraLarge: 26};
export const buttonHeight = {small: 30, medium: 40, large: 48, extraLarge: 60};
export const borderRadius = 4;
export const topBarButtonWidth = 120;
export const scoreButtonWidth = 70;
export const spacing = 12;

//
// Elevation
//
// Values computed with https://ethercreative.github.io/react-native-shadow-generator/
export const elevations = {
  small: {
    // elevation = 1
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  medium: {
    // elevation = 2
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  large: {
    // elevation = 3
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  extraLarge: {
    // elevation = 4
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
};
