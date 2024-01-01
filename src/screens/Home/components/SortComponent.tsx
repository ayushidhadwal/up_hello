import {Box, Text, VStack, View, HStack, Input} from 'native-base';
import React, {FC, useState} from 'react';
import {Pressable} from 'react-native';
import {t} from 'i18next';

type Props = {
  min: string;
  max: string;
  onMin: (text: string) => any;
  onMax: (text: string) => any;
};

const SortComponent: FC<Props> = ({min, max, onMin, onMax}) => {
  return (
    <View>
      <HStack mt={4} justifyContent={'space-evenly'}>
        <VStack space={1} w="40%">
          <Text alignSelf={'center'}>{t('Min.')}</Text>
          <Input
            value={min}
            onChangeText={text => {
              onMin(text);
            }}
            borderColor={'black'}
          />
        </VStack>
        <VStack space={1} w="40%">
          <Text alignSelf={'center'}>{t('Max.')}</Text>
          <Input
            value={max}
            onChangeText={text => {
              onMax(text);
            }}
            borderColor={'black'}
          />
        </VStack>
      </HStack>
    </View>
  );
};

export default SortComponent;
