import { Image as RNImage,ImageProps } from 'react-native'
import React, { useState, FC } from 'react'

const DEFAULT_IMAGE = require('../../../../assets/images/img2.png')




const Image: FC<ImageProps> = ({ source, ...extraProps }) => {
    const [image, setImage] = useState<any>(source)

    return (
        <RNImage
            {...extraProps}
            onError={() => {
                setImage(DEFAULT_IMAGE)
            }}
            source={image}
        />
    )
}

export default Image