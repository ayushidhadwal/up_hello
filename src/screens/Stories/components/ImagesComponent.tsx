import { View, Text } from 'react-native'
import React,{FC} from 'react'

import { FlatList, Image } from 'native-base'

const ImagesComponent:FC = () => {

     const data = [
        {
            id:1,
            img:"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        },
        {
            id:2,
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-a2iPO_0gtD97xTmD1cFZovEuiUFwn9V730_HjVMhRLP0XAgpIcfKOWGDMsvh_Uni1wXanu6GEw&usqp=CAU&ec=48600113"
        },
        {
            id:3,
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7k29WIhGgfjEcpmyFv0wYKcdcU5pl5oiLRpM6ijo_bQ&usqp=CAU&ec=48600113"
        },
        {
            id:4,
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt2zYd2BqZjGYkpBdsoSenSepgMgRpqlFp2mjFmZ7NKw&usqp=CAU&ec=48600113"
        },
        {
            id:5,
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkEh8BSrhhrpoIBcqDC4wBxow04NFyH_3kjq8nAxMjgA&usqp=CAU&ec=48600113"
        },
        {
            id:6,
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvITyloLTY-z6Kuk5SAqk1Un3eLO2F3-f0AqRY7cTCQ&usqp=CAU&ec=48600113"
        },
     ]

     const renderItem = ({item}:any) => {
        return(
            <Image
            resizeMode='cover'
            m={2}
            alt={'no img'}
            source={{uri:item.img}}
            width={"45%"}
            height={220}
            />
        )
     }

  return (
    <FlatList
    my={2}
    pb={2}
    data={data}
    renderItem={renderItem}
    showsVerticalScrollIndicator={false}
    numColumns={2}
    />
  )
}

export default ImagesComponent
