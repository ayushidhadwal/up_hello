import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/auth';
import {favourites} from '../services/favourites';
import {Favourites} from '../services/types';
import {addFavourite} from '../services/addFavourite';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../navigation/types';

export const useGetFavouriteItems = () => {
  const [data, setData] = useState<Favourites[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState(null);

  const navigation = useNavigation<RootNavigationProps>();

  const {userToken} = useContext(AuthContext);

  const getFavouriteItems = async () => {
    setLoading(true);
    try {
      const result = await favourites(userToken);
      setData(result);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getFavouriteItems);
    return unsubscribe;
  }, [navigation]);

  const pressFavourite = async (id: any) => {
    const i = data?.findIndex(item => {
      return id === item.itemId;
    });

    if (i > -1) {
      try {
        await addFavourite(id, userToken);
        const filerData = data.filter(item => item.itemId !== id);
        setData(filerData);
      } catch (e: any) {
        // console.log(e.message)
      }
    }
  };

  return {data, loading, error, pressFavourite};
};
