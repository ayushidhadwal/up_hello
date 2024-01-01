import {useContext, useEffect, useState} from 'react';
import {RecentItems} from '../types';
import {addFavourite} from '../../services/addFavourite';
import {AuthContext} from '../../context/auth';
import {recentItems} from '../../services/product/recentItems';
import {LangContext} from '../../context/lang';

export const useRecentItems = (navigation: any) => {
  const [data, setData] = useState<RecentItems[]>([]);
  const [recentLoading, setRecentLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const {userToken} = useContext(AuthContext);

  const {country} = useContext(LangContext);

  const getRecentItems = async () => {
    setRecentLoading(true);
    try {
      const Result = await recentItems(userToken, country);
      setData(Result);
      setRecentLoading(false);
    } catch (error: any) {
      setError(error.message);
      setRecentLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getRecentItems);
    return unsubscribe;
    // getRecentItems()
  }, [navigation, userToken]);

  useEffect(() => {
    getRecentItems();
  }, [userToken]);

  const pressFavourite = async (id: number) => {
    const i = data?.findIndex(item => {
      return id === item.id;
    });

    if (i > -1) {
      const isFav = data[i].favorite ? false : true;

      try {
        await addFavourite(id, userToken);
        setData(prevState => {
          const d = [...prevState];
          d[i].favorite = isFav;
          return d;
        });
      } catch (e: any) {
        // console.log(e.message)
      }
    }
  };

  return {data, recentLoading, error, pressFavourite};
};
