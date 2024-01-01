import React, {useState} from 'react';
import {FlatList, Image, View, Text, Pressable, Box} from 'native-base';
import {Alert, Dimensions, Modal} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const storiescomponent = () => {
  const data = [
    {
      id: 1,
      profileImg:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
      storyImg:
        'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80',
    },
    {
      id: 2,
      profileImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ixZ-nYtJOfuKqIXZwBViBt1KUYSCT3as_TgOnYIG-w&usqp=CAU&ec=48600113',
      storyImg:
        'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80',
    },
    {
      id: 3,
      profileImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdJ__2_Tm8ude3462l9TF1WPyJc0ufCFkpTset60kHlw&usqp=CAU&ec=48600113z',
      storyImg:
        'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80',
    },
    {
      id: 4,
      profileImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8cAy4szsepLxKLc-dFm_nY3A33j4Q0PJiJB3Y9XlrQ&usqp=CAU&ec=48600113',
      storyImg:
        'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80',
    },
    {
      id: 5,
      profileImg:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
      storyImg:
        'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80',
    },
  ];

  const [open, setOpen] = useState(false);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const renderItem = ({item}: any) => {
    return (
      <>
        <Pressable onPress={() => setOpen(true)}>
          <Image
            borderWidth={1}
            borderColor={'red.600'}
            mx={4}
            alt={'no img'}
            rounded={'full'}
            size={'sm'}
            source={{uri: item.profileImg}}
          />
        </Pressable>
        <Modal
          onRequestClose={() => {
            Alert.alert(t('Modal has been closed.'));
          }}
          statusBarTranslucent={true}
          animationType="fade"
          transparent={false}
          visible={open}>
          <Pressable
            backgroundColor={'black'}
            justifyContent={'center'}
            alignItems={'center'}
            flex={1}
            onPress={() => setOpen(false)}>
            <Box bottom={20} pr={2} alignSelf={'flex-end'}>
              <Pressable
                onPress={() => {
                  setOpen(false);
                }}>
                <Entypo name="cross" style={{}} size={32} color={'silver'} />
              </Pressable>
            </Box>

            <Pressable onPress={() => setOpen(false)}>
              <Image
                resizeMode="cover"
                width={width}
                height={height / 2}
                alt={'no img'}
                source={{uri: item.storyImg}}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </>
    );
  };

  return (
    <View my={5}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default storiescomponent;
