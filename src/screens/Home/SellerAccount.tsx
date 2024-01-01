import { Box, Divider,  HStack, Image, Text } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const SellerAccount = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <HStack alignItems={'center'} mt={1} px={1} justifyContent={'space-between'}>
                <Ionicons color={'black'} name='arrow-back' size={28} />
                <SimpleLineIcons color={'black'} name="options-vertical" size={24} />
            </HStack>
            <Divider mt={3} />
            <Box>
                <HStack m={2} space={2} alignItems={'center'} mt={2}>
                    <Image
                        alt="no img"
                        source={{ uri: 'https://www.postendekker.nl/wp-content/uploads/2021/10/dummy-profile.jpg' }}
                        height={'50'}
                        width={'50'}
                        rounded={'full'}
                    />
                    <Text bold fontSize={'2xl'}>AliKhan</Text>
                </HStack>
                <HStack space={2} m={2}>
                    <AntDesign name="book" size={22} />
                    <Text>Member Since Jun 2020</Text>
                </HStack>
                <HStack space={2} ml={2}>
                    <AntDesign name="infocirlceo" size={22} />
                    <Text>Lorem Ipsum is simply dummy text.</Text>
                </HStack>
            </Box>
            <Divider mt={3} />
        </SafeAreaView>
    )
}

export default SellerAccount