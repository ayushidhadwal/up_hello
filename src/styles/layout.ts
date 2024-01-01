import {Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Layouts = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

export {bottomNavBarHeight};
