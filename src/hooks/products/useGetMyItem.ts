import {useContext, useEffect, useState} from 'react';
import {MYItems} from '../../services/types';
import {myItem} from '../../services/product/myItem';
import {AuthContext} from '../../context/auth';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';
import {itemDelete} from '../../services/itemDelete';

export const useGetMyItems = () => {
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation<RootNavigationProps>();

  const {userToken} = useContext(AuthContext);

  const getMyItems = async () => {
    setLoading(true);
    try {
      const Result = await myItem(userToken);
      setItems(Result);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getMyItems);

    return unsubscribe;
  }, [navigation, userToken]);

  const deleteItem = async (id: number) => {
    try {
      await itemDelete(id, userToken);

      const deltedItems = items?.filter((m: any) => m.id !== id);

      setItems(deltedItems);
    } catch (error: any) {
      // console.log(error.message)
    }
  };

  return {items, loading, error, deleteItem};
};
