import { useEffect, useState } from "react"
import { getCategories } from "../../services/categories/getCategories";
import { GetCategory } from "../../services/types";

const useGetCategories = () => {
    const [data, setData] = useState<GetCategory[]>([]);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(()=>{
        
    const getCategory = async () => {
        setCategoryLoading(true)
        try {
            const result = await getCategories();
            setData(result)
            setCategoryLoading(false)
        } catch (error:any) {
            setError(error.message)
            setCategoryLoading(false)
        }
    }
    
        getCategory()
    },[])

    


    return { data, categoryLoading, error }

}

export default useGetCategories;