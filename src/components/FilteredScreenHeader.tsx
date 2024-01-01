import React, { FC, useState } from 'react'
import { HStack, VStack, View, Divider, Heading, Input, Center, Box, Icon, } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../navigation/types';

type Props = {
    openModalHandler: () => void
    onPressSearch: (text: string) => void
    searchItem: string;
}

function SearchBar({ onChangeText, onSearch, value, onBack }: any) {
    return (
        <VStack my="3" space={4} w="100%" divider={<Box px="2">
            <Divider />
        </Box>}>
            <VStack w="100%" space={5} alignSelf="center">
                <Input

                    borderColor={'black'}
                    variant={'outline'}
                    placeholder="search"
                    width="100%"
                    value={value}
                    onChangeText={onChangeText}
                    borderRadius="4"
                    py="2"
                    px="1"
                    fontSize="14"
                    InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.500" as={<Ionicons onPress={onBack} name="arrow-back" />} />}
                    InputRightElement={<Icon onPress={onSearch} m="2" mr="3" size="6" color="gray.500" as={<AntDesign name="search1" />} />}
                />
            </VStack>
        </VStack>
    )
}

const FilteredScreenHeader: FC<Props> = ({ openModalHandler, onPressSearch,searchItem }) => {

    const [searchVal, setSearchVal] = useState(searchItem)

    const navigation = useNavigation<RootNavigationProps>()



    return (
        <View>
            <HStack mt={2} mx={4} alignItems={'center'} justifyContent={'space-between'}>
                <HStack alignItems={'center'} space={5}>
                    <Center flex={1} >
                        <SearchBar searchItem={searchItem}  onBack={() => { navigation.goBack() }} value={searchVal} onSearch={() => onPressSearch(searchVal)} onChangeText={(text: string) => { setSearchVal(text) }} />
                    </Center>
                    <Ionicons onPress={openModalHandler} color={'black'} size={24} name='options' />
                </HStack>

            </HStack>
        </View>
    )
}

export default FilteredScreenHeader