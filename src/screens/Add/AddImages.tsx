import { View, Text, Box, Button, Pressable } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  AddStackScreenProps,
  RootStackScreenProps,
} from '../../navigation/types';
import { FormDataImg } from '../ListingScreen';
import { ErrMessage } from '../../utils/toastMessage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ImageBox from '../Home/ImageBox';
import { useTranslation } from 'react-i18next';
import Config from '../../config';

type Props = RootStackScreenProps<'AddImages'>;
const AddImages: FC<Props> = ({ navigation, route }) => {
  const {
    categoryId,
    subCategoryId,
    description,
    title,
    bikes,
    cars,
    commercial,
    mobile,
    properties,
    item,
  } = route.params;


  const { t } = useTranslation();

  const [image, setImage] = useState<FormDataImg[]>(
    item?.item_images?.length > 0
      ? item?.item_images?.map((item: any) => {
        return {
          uri: `${Config.API_URL}/public/${item}`,
          type: '',
          name: '',
        };
      })
      : [],
  );

  const _uploadImageHandler = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
    });
    if (result?.assets && result.assets?.length > 0) {
      const total = image.length + result.assets?.length

      if (total > 5) {
        // show error
        ErrMessage(t('you can only select upto 5 images'));
      } else {

        const images = result.assets?.map((img): FormDataImg => {
          return {
            name: img.fileName,
            type: img.type,
            uri: img.uri,
          };
        });
        setImage(prevState => [...images, ...prevState]);
      }
    }
  };

  const onDelete = (id: number) => {
    setImage(prevState => {
      return prevState.filter((_, index) => index !== id);
    });
  };

  const onNext = () => {
    if (image.length === 0) {
      ErrMessage(t('please select an image'));
    } else {
      navigation.navigate('AddPrice', {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        title: title,
        description: description,
        images: image,
        bikes: bikes,
        cars: cars,
        commercial: commercial,
        mobile: mobile,
        properties: properties,
        item: item,
      });
    }
  };

  // ["assets/photo/items/1701172598_6565d57635824.jpg"]

  return (
    <View flex={1} bg={'white'}>
      <View flex={1}>
        <Pressable onPress={_uploadImageHandler}>
          <Box
            mx={6}
            mt={10}
            alignItems={'center'}
            justifyContent={'center'}
            borderWidth={1}
            width={'20'}
            borderRadius={'10'}
            height={'20'}>
            <EvilIcons name="camera" color={'red'} size={38} />
          </Box>
        </Pressable>
        <Text mx={3} mt={2}>
          {t('You can upload upto 5 photos')}
        </Text>
        <Box flexWrap={'wrap'} flexDirection={'row'}>
          {image.map((item, index) => (
            <ImageBox onDelete={onDelete} uri={item.uri} index={index} />
          ))}
        </Box>
      </View>
      <Box>
        <Button
          mx={6}
          mb={10}
          colorScheme={'red'}
          _text={{ fontSize: 'lg' }}
          m={2}
          onPress={onNext}>
          {t('Next')}
        </Button>
      </Box>
    </View>
  );
};

export default AddImages;
