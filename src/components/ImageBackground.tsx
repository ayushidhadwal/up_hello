import { ImageBackground as RNImageBackground, ImageBackgroundProps } from 'react-native'
import React, { useState, FC, PropsWithChildren } from 'react'

const DEFAULT_IMAGE = require('../../assets/images/no_image.png')

const ImageBackground: FC<ImageBackgroundProps> = ({ source, ...extraProps }) => {


    const [image, setImage] = useState<any>(source)

    return (
        <RNImageBackground
            {...extraProps}
            onError={() => {
                setImage(DEFAULT_IMAGE)
            }}
            source={image}
        />
    )
}

export default ImageBackground