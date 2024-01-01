import Toast from 'react-native-toast-message';

export const SuccessMessage = (msg: string) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: msg,
    position: 'bottom',
  });
};

export const ErrMessage = (msg: string) => {
  Toast.show({
    type: 'error',
    text1: 'Error!',
    text2: msg,
    position: 'bottom',
  });
};
