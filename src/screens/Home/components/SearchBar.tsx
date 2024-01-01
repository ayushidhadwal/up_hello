import React, { useContext } from 'react';
import { Box, Divider, HStack, Text, Pressable } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../../navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../../context/auth';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {

  const { userToken } = useContext(AuthContext);

  const { t } = useTranslation()

  const navigation = useNavigation<RootNavigationProps>();
  return (
    <HStack space={1}
      bg={'white'}
      py={3}
      justifyContent={'space-around'}
      alignItems={'center'}
      px={2}
    >
      <Pressable borderWidth={1}  flexDirection={'row'} alignItems={'center'} py={2} ml={2} px={2} rounded={2} flex={1} bg={'white'} onPress={()=>{navigation.navigate('Searchscreen')}}>
        <HStack alignItems={'center'} space={2}>

          <Feather  name='search' size={23} />
          <Text flex={1} numberOfLines={1} fontSize={18} color={'grey'}>{t("Find Cars,Mobile Phones And...")} </Text>
      </HStack>
      </Pressable>
      <Ionicons onPress={()=>{navigation.navigate('Notification')}} style={{marginRight:1}} name='notifications-sharp' color={'red'} size={23} />
    </HStack>
  );
};

export default SearchBar;
