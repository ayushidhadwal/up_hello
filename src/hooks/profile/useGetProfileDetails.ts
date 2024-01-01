import {useContext, useEffect, useState} from 'react';
import {profileDetails} from '../../services/profile/profileDetails';
import {AuthContext} from '../../context/auth';
import {Profile} from '../../services/types';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';

export const useGetProfileDetails = () => {
  // const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const {getProfile, profile} = useContext(AuthContext);

  const navigation = useNavigation<RootNavigationProps>();

  const {userToken} = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getProfile);
    return unsubscribe;
    // getRecentItems()
  }, [navigation]);

  useEffect(() => {
    getProfile();
  }, [userToken]);

  return {profile, loading, error};
};
