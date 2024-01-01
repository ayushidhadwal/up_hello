import {View, Text, VStack, Input, Button} from 'native-base';
import React, {FC, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {RootStackScreenProps} from '../../navigation/types';
import {ErrMessage} from '../../utils/toastMessage';

type Props = RootStackScreenProps<'DefaultForm'>;

const DefaultForm: FC<Props> = ({navigation, route}) => {
  const {categoryId, subCategoryId, item} = route.params;

  const [title, setTitle] = useState(
    item?.add_title == null || item?.add_title == 'null'
      ? ''
      : item?.add_title == undefined || item?.add_title == 'undefined'
      ? ''
      : item?.add_title,
  );
  const [desc, setDesc] = useState(
    item?.description == null || item?.description == 'null'
      ? ''
      : item?.description == undefined || item?.description == 'undefined'
      ? ''
      : item?.description,
  );

  const {t} = useTranslation();

  const onNext = () => {
    if (title == '' || desc == '') {
      ErrMessage(t('All fields are required'));
    } else {
      navigation.navigate('AddImages', {
        cars: null,
        bikes: null,
        properties: null,
        commercial: null,
        mobile: null,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        title: title,
        description: desc,
        item: item,
      });
    }
  };

  return (
    <View flex={1} bg={'white'}>
      <VStack flex={1} pt={10} space={6}>
        <Input
          value={title}
          onChangeText={text => {
            setTitle(text);
          }}
          placeholder={t('Ad Title')}
          mt={2}
          w={'90%'}
          variant={'underlined'}
          alignSelf={'center'}
        />
        <Input
          multiline={true}
          value={desc}
          onChangeText={text => {
            setDesc(text);
          }}
          placeholder={t('Describe what you are selling')}
          mt={2}
          w={'90%'}
          variant={'underlined'}
          alignSelf={'center'}
        />
      </VStack>
      <Button
        onPress={onNext}
        mb={10}
        mx={6}
        colorScheme={'red'}
        _text={{fontSize: 'lg'}}
        m={2}>
        {t('Next')}
      </Button>
    </View>
  );
};

export default DefaultForm;
