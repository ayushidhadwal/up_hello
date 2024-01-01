import React, { FC, } from 'react'
import { VStack, Box, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageBackground from '../../components/ImageBackground'

type Props = {
    uri: string | undefined;
    index: number;
    onDelete: (id: number) => void
}

const ImageBox: FC<Props> = ({ uri, index, onDelete }) => {
    return (
        <VStack
            bg={'white'}
            py={1}
            shadow={2}
            space={2}
            m={1}
            w={'30%'}
        >
            <ImageBackground key={uri} resizeMode="contain" alt={"no img"} source={{ uri: uri }} style={{ width: '100%', height: 100, paddingHorizontal: 1 }} >
                {index === 0 ? <Box w={20} mt={1} backgroundColor={'yellow.400'}><Text ml={2} fontSize={10}>Main photo</Text></Box> : null}
            </ImageBackground>

            <Ionicons onPress={() => { onDelete(index) }} style={{ alignSelf: 'center' }} name="trash-bin" color={'red'} size={18} />
        </VStack>
    )
}

export default ImageBox