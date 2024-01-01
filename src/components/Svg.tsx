import React, { FC, useEffect, useState } from 'react'
import { SvgCssUri } from 'react-native-svg'
import { Image } from 'react-native'


const checkValidUrl = async (uri: string): Promise<boolean> => {
    try {
        const response = await fetch(uri)
        if (response.ok) {
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

type Props = {
    uri: string;
}

const SvgImage: FC<Props> = ({ uri }) => {
    const [isError, setIsError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true);
    const [component, setComponent] = useState(<Image style={{width:30,height:30}}  source={require('../../assets/images/category_icon.png')} />);

    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await checkValidUrl(uri);
            if (result) {
                setComponent(<SvgCssUri
                    style={{ alignSelf: 'center' }}
                    width={30}
                    height={30}
                    uri={uri}
                />)
            }
            setLoading(false);
        })()
    }, [uri])

    if (loading) {
        return null;
    }

    return component
}

export default SvgImage