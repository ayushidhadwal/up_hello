import { View, Text } from 'native-base'
import React from 'react'
import { Image } from 'react-native'

const GifLoader = () => {
  return (
    <View style={{flex:1,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
        <Image source={require('../../assets/images/loadingGif.gif')} />
    </View>
  )
}

export default GifLoader