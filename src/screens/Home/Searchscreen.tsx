import {useNavigation} from '@react-navigation/native';
import {
  HStack,
  Icon,
  Input,
  Button,
  Text,
  Divider,
  Box,
  VStack,
  Pressable,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootNavigationProps} from '../../navigation/types';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';

const Searchscreen = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchItem, setSearchItem] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('History');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error: any) {
      console.error('Error', error.message);
    }
  };

  const saveSearchTerm = async () => {
    try {
      const updatedHistory = [searchItem, ...searchHistory.slice(0, 9)];
      setSearchHistory(updatedHistory);

      await AsyncStorage.setItem('History', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error ', error);
    }
  };
  useEffect(() => {
    loadSearchHistory();
  }, []);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const onPressSearch = () => {
    saveSearchTerm();
    navigation.navigate('ItemCategory', {
      categoryId: '',
      subCategoryId: '',
      searchItem: searchItem,
    });
  };

  const {t} = useTranslation();

  const navigation = useNavigation<RootNavigationProps>();

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <HStack mt={4} px={1} alignSelf={'center'}>
        <Input
          onChangeText={text => setSearchItem(text)}
          ref={inputRef}
          placeholder={t('Find Cars,Mobile Phones and more...')}
          variant="outline"
          tintColor={'blue.300'}
          width="88%"
          borderRadius="5"
          height={10}
          py="1"
          borderColor={'blue.400'}
          InputLeftElement={
            <Icon
              onPress={() => {
                navigation.goBack();
              }}
              ml="2"
              size="8"
              as={<Ionicons name="arrow-back" />}
            />
          }
        />
        <Button
          backgroundColor={searchItem == '' ? 'silver' : '#006400'}
          height="10">
          <AntDesign
            disabled={searchItem == '' ? true : false}
            onPress={onPressSearch}
            size={20}
            color={'white'}
            name="search1"
          />
        </Button>
      </HStack>
      <Divider mt={2} />

      <FlatList
        data={searchHistory}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => (
          <>
            <Text m={3}>{item}</Text>
            <Divider />
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Searchscreen;
