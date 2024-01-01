import { Text, View } from 'native-base'
import React from 'react'
import Header from './components/Header'
import Storiescomponent from './components/storiescomponent'
import ImagesComponent from './components/ImagesComponent'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Storiesscreen = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
       <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <Header  />
        <Storiescomponent />
        <ImagesComponent />
    </SafeAreaView>
  )
}

export default Storiesscreen