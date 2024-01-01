import { Text, View } from 'native-base'
import React from 'react'
import ChatNavigation from '../../navigation/ChatNavigation'
import { useTranslation } from 'react-i18next'

const MessageScreen = () => {

  const {t} = useTranslation()

  return (
    <View flex={1} bg={'white'}>
      <Text fontSize={'2xl'} p={2}>{t("Chats")}</Text>
      <ChatNavigation />
    </View>
  )
}

export default MessageScreen