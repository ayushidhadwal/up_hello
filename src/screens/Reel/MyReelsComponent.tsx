import {Box, Menu, Pressable, Text} from 'native-base';
import React, {FC, useContext} from 'react';
import ImageBackground from '../../components/ImageBackground';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';
import {Alert} from 'react-native';
import {MyReels} from '../../services/types';
import Config from '../../config';
import {t} from 'i18next';

type Props = {
  item: MyReels;
  onDelete: (id: number) => void;
};

const MyReelsComponent: FC<Props> = ({item, onDelete}) => {
  const navigation = useNavigation<RootNavigationProps>();

  const onPressDelete = () => {
    Alert.alert(
      t('Delete'),
      t('You are about to delete reel you wont be able to undo this.'),
      [
        {
          text: t('Cancel'),

          style: 'cancel',
        },
        {
          text: t('Delete'),
          onPress: () => {
            onDelete(item.id);
          },

          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          console.log(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  };

  function Example() {
    return (
      <Box w="90%" alignItems="flex-end" m={2}>
        <Menu
          w="190"
          trigger={triggerProps => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}>
                <SimpleLineIcons
                  size={24}
                  name="options-vertical"
                  color={'gray'}
                />
              </Pressable>
            );
          }}>
          <Menu.Item onPress={() => onPressDelete()}>{t('Delete')}</Menu.Item>
        </Menu>
      </Box>
    );
  }

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('MyReelsDetail', {item});
      }}
      shadow={1}
      backgroundColor={'white'}
      borderWidth={0.5}
      borderRadius={5}
      borderColor={'silver'}
      mx={1}
      mt={2}
      mb={1}
      width={'48%'}>
      <ImageBackground
        resizeMode="contain"
        style={{width: '100%', height: 200}}
        source={{uri: `${Config.API_URL}/public/${item.thumbnail}`}}>
        <Box flex={1} flexDirection={'row'}>
          <Box alignItems={'center'} flex={1} justifyContent={'center'}>
            {/* <FontAwesome5 name="play" size={20} color={'white'}  /> */}
          </Box>
          <Box alignItems={'center'}>
            <Example />
          </Box>
        </Box>
      </ImageBackground>
    </Pressable>
  );
};

export default MyReelsComponent;
