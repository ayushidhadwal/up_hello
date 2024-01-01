import {
  Button,
  Input,
  ScrollView,
  Text,
  VStack,
  View,
  useSafeArea,
} from 'native-base';
import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {ContactUsForm} from '../services/types';
import {AuthContext} from '../context/auth';
import {ErrMessage, SuccessMessage} from '../utils/toastMessage';
import {contactUs} from '../services/contactUs';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../navigation/types';
import {useTranslation} from 'react-i18next';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const {userToken} = useContext(AuthContext);

  const {t} = useTranslation();

  const navigation = useNavigation<RootNavigationProps>();

  const onSubmitHandler = async () => {
    if (userToken) {
      if (name == '' || email == '' || subject == '' || message == '') {
        ErrMessage(t('All Fields are required'));
      } else {
        setLoading(true);
        const options: ContactUsForm = {
          name: name,
          email: email,
          subject: subject,
          message: message,
        };
        try {
          const result = await contactUs(options, userToken);
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
          SuccessMessage(t('Sent Successfully'));
          setLoading(false);
          navigation.navigate('Homescreen');
        } catch (error: any) {
          ErrMessage(error.message);
          setLoading(false);
        }
      }
    } else {
      navigation.navigate('AuthStack');
    }
  };

  return (
    <View flex={1} backgroundColor={'white'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack mt={10} space={7}>
          <VStack space={2}>
            <Text ml={2} bold fontSize={'lg'}>
              {t('Your Name')}
            </Text>
            <Input
              value={name}
              onChangeText={text => {
                setName(text);
              }}
              alignSelf={'center'}
              variant={'filled'}
              width={'90%'}
            />
          </VStack>
          <VStack space={2}>
            <Text ml={2} bold fontSize={'lg'}>
              {t('Email Address')}
            </Text>
            <Input
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
              alignSelf={'center'}
              variant={'filled'}
              width={'90%'}
            />
          </VStack>
          <VStack space={2}>
            <Text ml={2} bold fontSize={'lg'}>
              {t('Subject')}
            </Text>
            <Input
              value={subject}
              onChangeText={text => {
                setSubject(text);
              }}
              alignSelf={'center'}
              variant={'filled'}
              width={'90%'}
            />
          </VStack>
          <VStack space={2}>
            <Text ml={2} bold fontSize={'lg'}>
              {t('Message')}
            </Text>
            <Input
              multiline={true}
              h={100}
              textAlignVertical="top"
              value={message}
              onChangeText={text => {
                setMessage(text);
              }}
              alignSelf={'center'}
              variant={'filled'}
              width={'90%'}
            />
          </VStack>
        </VStack>
        <Button
          isLoading={loading}
          isDisabled={loading}
          onPress={onSubmitHandler}
          alignSelf={'center'}
          mt={5}
          colorScheme={'red'}
          width={'40%'}>
          {t('Submit')}
        </Button>
      </ScrollView>
    </View>
  );
};

export default ContactUs;
