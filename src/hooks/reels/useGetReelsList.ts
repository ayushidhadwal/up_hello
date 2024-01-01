import {useContext, useEffect, useState} from 'react';
import {AllReels} from '../../services/types';
import {reelsList} from '../../services/reels/reelsList';
import {likeReel} from '../../services/reels/likeReel';
import {AuthContext} from '../../context/auth';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';

export const useGetReelsList = (page: number) => {
  const navigation = useNavigation<RootNavigationProps>();

  const {userToken} = useContext(AuthContext);

  const [data, setData] = useState<AllReels[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getReelList = async () => {
    setLoading(true);
    try {
      const result = await reelsList(page, userToken);
      setData(prevState => [...prevState, ...result]);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', getReelList);
    // return unsubscribe;
    getReelList();
  }, [page]);

  const likeFilter = async (id: number) => {
    // console.log(id, "id")
    const i = data.findIndex(item => {
      return id === item.id;
    });

    if (i > -1) {
      const type = data[i].likeStatus == '0' ? '1' : ('0' as string);

      try {
        await likeReel(id, +type, userToken);
        setData(prevState => {
          const d = [...prevState];
          d[i].likeStatus = type;
          return d;
        });
      } catch (e: any) {
        // console.log(e.message)
      }
    }
  };

  return {data, loading, error, likeFilter};
};
