import { View, Text, VStack, Input, Button, Pressable, FlatList, HStack, Box } from 'native-base'
import React, { useState, FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ErrMessage } from '../../../utils/toastMessage'
import { NavigationContainer } from '@react-navigation/native'
import { RootStackScreenProps } from '../../../navigation/types'
import { useGetBrands } from "../../../hooks/useGetBrand";
import i18n from "i18next";
import { AuthContext } from '../../../context/auth'

type Props = RootStackScreenProps<'MobileForm'>

const MobileForm: FC<Props> = ({ navigation, route }) => {

  const { categoryId, subCategoryId, item } = route.params;

  const { brands, error } = useGetBrands(categoryId, subCategoryId);

  const locale = i18n.language;

  const { t } = useTranslation()


  const { setBrandId } = useContext(AuthContext)

  const [title, setTitle] = useState(item?.add_title == null || item?.add_title == "null" ? '' : item?.add_title == undefined || item?.add_title == "undefined" ? '' : item?.add_title);
  const [desc, setDesc] = useState(item?.description == null || item?.description == "null" ? '' : item?.description == undefined || item?.description == "undefined" ? '' : item?.description)
  const [brandModel, setBrandModal] = useState(false);
  const [brand, setBrand] = useState(item?.brand_name == null || item?.brand_name == "null" ? '' : item?.brand_name == undefined || item?.brand_name == "undefined" ? '' : item?.brand_name);

  const height = Dimensions.get('window').height;


  const renderItem = ({ item }: { item: any }) => {
    return (
      <Pressable onPress={() => {
        setBrandModal(false);
        setBrandId(item.id)
        setBrand(locale == 'en'
          ? item.brandName
          : locale == 'bn'
            ? item.brandNamebn
            : locale == 'ar'
              ? item.brandNamear
              : item.brandNamehn)
      }}>
        <HStack my={3} mx={1} justifyContent={'space-between'}>
          <Text fontSize={'md'}>{locale == 'en'
            ? item.brandName
            : locale == 'bn'
              ? item.brandNamebn
              : locale == 'ar'
                ? item.brandNamear
                : item.brandNamehn}</Text>
          <AntDesign name="right" size={20} />
        </HStack>
      </Pressable>
    )
  }

  const onNext = () => {
    if (brand == '' || title == "" || desc == "") {
      ErrMessage(t('Required fields cannot be empty'));
    }
    else {
      navigation.navigate('AddImages', {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        bikes: null,
        cars: null,
        properties: null,
        commercial: null,
        mobile: {
          brand: brand
        },
        title: title,
        description: desc,
        item: item
      })
    }
  }




  return (
    <View flex={1} bg={'white'}>
      <Box flex={1} pt={10}>
        <VStack space={6}>
          <Pressable
            mx={5}
            onPress={() => {
              setBrandModal(true);
            }}
            w={'90%'}
            borderBottomWidth={0.5}
            borderColor={'silver'}
            variant={'underlined'}
            h={8}>
            <Text color={brand == '' ? 'grey' : 'black'}>
              {brand == '' ? t('Brand *') : brand}
            </Text>
          </Pressable>

          <Input
            value={title}
            onChangeText={text => {
              setTitle(text);
            }}
            placeholder={t('Ad Title *')}
            placeholderTextColor={'grey'}
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
            placeholder={t('Describe what you are selling *')}
            placeholderTextColor={'grey'}
            mt={2}
            w={'90%'}
            variant={'underlined'}
            alignSelf={'center'}
          />
        </VStack>

        <Text ml={3} mt={1} color={'grey'}>
          * {t("Required fields")}
        </Text>
      </Box>
      <Button
        onPress={onNext}
        mb={10}
        mx={6}
        colorScheme={'red'}
        _text={{ fontSize: 'lg' }}
        m={2}>
        {t('Next')}
      </Button>

      {/* brand modal */}
      <Modal transparent={true} visible={brandModel}>
        <Pressable
          onPress={() => {
            setBrandModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Text fontSize={'xl'}>
              <Text color={'gray.400'}>{t("Mobiles")}</Text>
                >{t("Brand")}
            </Text>
            <Text bold fontSize={'lg'} mt={6}>
              {t("Popular")}
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={brands}
              renderItem={renderItem}
            />
            <Text
              mt={2}
              onPress={() => {
                setBrandModal(false);
              }}
              alignSelf={'flex-end'}
              fontSize={'lg'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export default MobileForm
