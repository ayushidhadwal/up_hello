import { useEffect, useState } from "react"
import { SubCategory } from "../../services/types";
import { getSubCategories } from "../../services/categories/getSubCategories";

export const useGetSubCategory = (id:number) => {

    const [subCategoryData, setSubCategoryData] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState(null);

    

    useEffect(() => {
        const getSubCategory = async () => {
            setLoading(true)
            try {
                
                const result = await getSubCategories(id);
                setSubCategoryData(result);
                setLoading(false)
            } catch (error:any) {
                setError(error.message)
                setLoading(false)
            }
        }
        if (id) {
            getSubCategory();
        }
    }, [id])
    return {subCategoryData,loading,error}

}