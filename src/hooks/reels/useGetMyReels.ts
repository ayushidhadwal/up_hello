import {useContext, useEffect, useState} from 'react';
import {MyReels} from '../../services/types';
import {myReels} from '../../services/reels/myReels';
import {AuthContext} from '../../context/auth';
import {likeReel} from '../../services/reels/likeReel';
import {RootNavigationProps} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {deleteReel} from '../../services/reels/deleteReel';

export const useGetMyReels = () => {
  const [data, setData] = useState<MyReels[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const {userToken} = useContext(AuthContext);

  const navigation = useNavigation<RootNavigationProps>();

  const getMyReels = async () => {
    setLoading(true);
    try {
      const result = await myReels(userToken);
      setData(result);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getMyReels);

    return unsubscribe;
  }, [navigation]);

  const likeReels = async (id: number) => {
    const i = data.findIndex(item => {
      return id === item.id;
    });
    if (id > -1) {
      const type = data[i].type == '0' ? '1' : ('0' as string);

      try {
        await likeReel(id, +type, userToken);
        setData(prevState => {
          const d = [...prevState];
          d[i].type = type;
          return d;
        });
      } catch (e: any) {
        // console.log(e.message)
      }
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await deleteReel(id, userToken);

      const deltedItems = data?.filter(m => m.id !== id);

      setData(deltedItems);
    } catch (error: any) {
      // console.log(error.message)
    }
  };

  return {data, error, loading, likeReels, deleteItem};
};
