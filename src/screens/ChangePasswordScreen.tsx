import {VStack, View, Text, Input, Button} from 'native-base';
import React, {useContext, useState} from 'react';
import {changePassword} from '../services/changePassword';
import {ChangePassword} from '../services/types';
import {AuthContext} from '../context/auth';
import {ErrMessage, SuccessMessage} from '../utils/toastMessage';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

const ChangePasswordScreen = () => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const {t} = useTranslation();

  const {userToken} = useContext(AuthContext);

  const onSubmitHandler = async () => {
    if (oldPass == '' || newPass == '' || confPass == '') {
      ErrMessage(t('All Fields are required'));
    } else {
      setLoading(true);
      const options: ChangePassword = {
        oldPass: oldPass,
        newPass: newPass,
        confPass: confPass,
      };
      try {
        const result = await changePassword(options, userToken);
        setOldPass('');
        setNewPass('');
        setConfPass('');
        SuccessMessage(t('Password Changed Successfully'));
        setLoading(false);
      } catch (error: any) {
        ErrMessage(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <View flex={1} bg={'white'}>
      <VStack mt={4} space={2}>
        <VStack mt={4} space={1}>
          <Text px={4} fontSize={'xl'}>
            {t('Old Password')}
          </Text>
          <Input
            value={oldPass}
            onChangeText={text => {
              setOldPass(text);
            }}
            mx={4}
            rounded={'10'}
            placeholder={t('Enter Old Password')}
          />
        </VStack>
        <VStack mt={4} space={1}>
          <Text px={4} fontSize={'xl'}>
            {t('New Password')}
          </Text>
          <Input
            value={newPass}
            onChangeText={text => {
              setNewPass(text);
            }}
            mx={4}
            rounded={'10'}
            placeholder={t('Enter New Password')}
          />
        </VStack>
        <VStack mt={4} space={1}>
          <Text px={4} fontSize={'xl'}>
            {t('Confirm Password')}
          </Text>
          <Input
            value={confPass}
            onChangeText={text => {
              setConfPass(text);
            }}
            mx={4}
            rounded={'10'}
            placeholder={t('Enter Confirm Password')}
          />
        </VStack>
        <Button
          onPress={onSubmitHandler}
          isLoading={loading}
          isDisabled={loading}
          colorScheme={'red'}
          mt={8}
          mx={8}>
          {t('Confirm')}
        </Button>
      </VStack>
    </View>
  );
};

export default ChangePasswordScreen;
