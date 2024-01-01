import { View, Input, VStack, Button } from 'native-base'
import React, { FC, useState } from 'react'
import { RootStackScreenProps } from '../../navigation/types'
import { ErrMessage } from '../../utils/toastMessage'
import { useTranslation } from 'react-i18next'

type Props = RootStackScreenProps<'AddDescription'>

const AddDescription: FC<Props> = ({ navigation, route }) => {

    const { categoryId, subCategoryId } = route.params

    const [title, setTitle] = useState('');

    const [desc, setDesc] = useState('');

    const onNext = () => {
        if (title == '' || desc == '') {
            ErrMessage(t('All Fields are required'));
        }
        else {
            navigation.navigate('AddImages', {
                categoryId: categoryId,
                subCategoryId: subCategoryId,
                title: title,
                description: desc
            })
        }
    }

    const {t} = useTranslation()




    return (
        <View flex={1} bg={'white'}>
            <VStack flex={1} pt={10} space={6}>
                <Input
                    value={title}
                    onChangeText={(text) => { setTitle(text) }}
                    placeholder={t('Ad Title')}
                    mt={2}
                    w={'90%'}
                    variant={'underlined'}
                    alignSelf={'center'} />
                <Input
                    multiline={true}
                    value={desc}
                    onChangeText={(text) => { setDesc(text) }}
                    placeholder={t('Describe what you are selling')}
                    mt={2} w={'90%'}
                    variant={'underlined'}
                    alignSelf={'center'}
                />
            </VStack>
            <Button onPress={onNext} mb={10} mx={6} colorScheme={'red'} _text={{ fontSize: 'lg' }} m={2}>{t("Next")}</Button>
        </View>
    )
}

export default AddDescription
