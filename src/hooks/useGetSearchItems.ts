import {useContext, useEffect, useState} from 'react';
import {Search} from '../screens/Home/ItemCategoryScreen';
import {searchItem} from '../services/searchItem';
import {SearchItems} from '../services/types';
import {addFavourite} from '../services/addFavourite';
import {AuthContext} from '../context/auth';

export const useGetSearchItems = (options: Search) => {
  const [data, setData] = useState<SearchItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const {userToken} = useContext(AuthContext);

  useEffect(() => {
    const getSearchItems = async () => {
      setLoading(true);
      try {
        const result = await searchItem(options, userToken);
        setData(result);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    getSearchItems();
  }, [
    options.search,
    options.brandsArray,
    options.categoryId,
    options.subCategoryId,
    options.maxAmount,
    options.minAmount,
  ]);

  const pressFavourite = async (id: number) => {
    const i = data?.findIndex(item => {
      return id === item.id;
    });
    // console.log(id);

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

  return {data, loading, error, pressFavourite};
};
