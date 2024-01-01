import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigation from './DrawerNavigation'

const AppNavigation:FC = () => {
  return (
   <NavigationContainer>
    <DrawerNavigation />
   </NavigationContainer>
  )
}

export default AppNavigation