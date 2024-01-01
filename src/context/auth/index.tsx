import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Config from '../../config';
import { logoutFunc } from '../../services/auth/logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../../services/types';
import { profileDetails } from '../../services/profile/profileDetails';

interface AuthContextProps {
  userToken: string | null;
  createSession: (token: string, id: number) => void;
  logout: () => void;
  userId: number | null;
  tokenLoading: boolean;
  profile: Profile | undefined;
  getProfile: () => void;
  PackageSubCategory: string;
  setCategory: (subCategory: string) => void
  brandId: number | null;
  setBrandId: any;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {

  const [userToken, setUserToken] = useState<string | null>(null);
  const [userId, setuserId] = useState<any>(null);


  const [brandId, setBrandId] = useState<number | null>(null);

  const [PackageSubCategory, setPackageSubCategory] = useState('');

  const setCategory = (subCategory: string) => {
    setPackageSubCategory(subCategory);
  }

  const createSession = async (token: string, id: any) => {
    await AsyncStorage.setItem(Config.USER_SESSION, token);
    await AsyncStorage.setItem(Config.USER_ID_SESSION, String(id));

    setUserToken(token);
    setuserId(id);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(Config.USER_SESSION);
      await AsyncStorage.removeItem(Config.USER_ID_SESSION);
      await AsyncStorage.removeItem(Config.LAT);
      await AsyncStorage.removeItem(Config.LOCATION_DESC);
      await AsyncStorage.removeItem(Config.LONG);
      await AsyncStorage.removeItem(Config.LOCATION_OBJECT);
      setUserToken(null);
      setuserId(null);
      await logoutFunc(userToken);
    } catch (error: any) {
      // console.log(error.message)
    }
  };

  const [tokenLoading, setTokenLoading] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      setTokenLoading(true);
      const token = await AsyncStorage.getItem(Config.USER_SESSION);
      const id = await AsyncStorage.getItem(Config.USER_ID_SESSION);

      if (id && token) {
        setUserToken(token);
        setuserId(id);
      }
      setTokenLoading(false);
    };

    restoreSession();
  }, []);

  const [profile, setProfile] = useState<Profile>();

  const getProfile = async () => {
    try {
      const result = await profileDetails(userToken);
      setProfile(result);
    } catch (error: any) { }
  };

  const value = {
    userToken,
    createSession,
    logout,
    userId,
    tokenLoading,
    profile,
    getProfile,
    setCategory,
    PackageSubCategory,
    brandId,
    setBrandId
  };

  return <AuthContext.Provider value={value} children={children}  />;
};
