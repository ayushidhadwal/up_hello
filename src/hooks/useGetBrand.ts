import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth"
import { brand } from "../services/brand"
import { Brand } from "../services/types";
export const useGetBrands = (categoryId:string,subCategoryId:string) => {

    const [brands, setBrand] = useState<Brand[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState(null);

    const { userToken } = useContext(AuthContext)

    useEffect(() => {
        const getBrand = async () => {
            setLoading(true)
            try {
                const result = await brand(userToken,categoryId,subCategoryId);
                setBrand(result);
                setLoading(false)
            } catch (error: any) {
                setError(error.message)
                setLoading(false)
            }
        }
        getBrand()
    }, [])
    return { brands, loading, error }
}