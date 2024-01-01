import { Axios } from "../lib/Axios"
import { ApiEndPoints } from "./ApiEndPoints"

export const getCountries = async () => {
    const response = await Axios.get(ApiEndPoints.location.getCountries);


    return response.data.data.map((item:any)=>{
        return {
            id: item.id,
            name_en: item.country_name,
            name_ar: item.ar,
            name_bn: item.bn,
            name_hn: item.hi,
            img: item.image,
            shortName: item.short_name,
            currency:item.symbol,
            currency_price:item.value
        }
    })
}