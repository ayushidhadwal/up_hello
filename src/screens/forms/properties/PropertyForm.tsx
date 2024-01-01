import {
  View,
  Text,
  ScrollView,
  VStack,
  Pressable,
  Button,
  Box,
  Input,
} from 'native-base';
import React, {useState, FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Dimensions} from 'react-native';
import {ErrMessage} from '../../../utils/toastMessage';
import {RootStackScreenProps} from '../../../navigation/types';
import {addItem} from '../../../services/product/addItem';

type Props = RootStackScreenProps<'PropertyForm'>;

const PropertyForm: FC<Props> = ({navigation, route}) => {
  const {categoryId, subCategoryId, item} = route.params;

  // Modal State
  const [typeModal, setTypeModal] = useState(false);
  const [bedModal, setBedModal] = useState(false);
  const [bathroomModal, setbathroomModal] = useState(false);
  const [furnishingModal, setFurnishingModal] = useState(false);
  const [constructionModal, setConstructionModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [carParkModal, setCarParkModal] = useState(false);
  const [facingModal, setFacingModal] = useState(false);

  // Value State
  const [type, setType] = useState(
    item?.type == null || item?.type == 'null'
      ? ''
      : item?.type == undefined || item?.type == 'undefined'
      ? ''
      : item?.type,
  );
  const [bedroom, setBedroom] = useState(
    item?.bedrooms == null || item?.bedrooms == 'null'
      ? ''
      : item?.bedrooms == undefined || item?.bedrooms == 'undefined'
      ? ''
      : item?.bedrooms,
  );
  const [bathroom, setBathroom] = useState(
    item?.bathroom == null || item?.bathroom == 'null'
      ? ''
      : item?.bathroom == undefined || item?.bathroom == 'undefined'
      ? ''
      : item?.bathroom,
  );
  const [furnishing, setFurnishing] = useState(
    item?.furnishing == null || item?.furnishing == 'null'
      ? ''
      : item?.furnishing == undefined || item?.furnishing == 'undefined'
      ? ''
      : item?.furnishing,
  );
  const [construction, setConstruction] = useState(
    item?.construction_status == null || item?.construction_status == 'null'
      ? ''
      : item?.construction_status == undefined ||
        item?.construction_status == 'undefined'
      ? ''
      : item?.construction_status,
  );
  const [list, setList] = useState(
    item?.listed_by == null || item?.listed_by == 'null'
      ? ''
      : item?.listed_by == undefined || item?.listed_by == 'undefined'
      ? ''
      : item?.listed_by,
  );
  const [superArea, setSuperArea] = useState(
    item?.super_bueltp_area == null || item?.super_bueltp_area == 'null'
      ? ''
      : item?.super_bueltp_area == undefined ||
        item?.super_bueltp_area == 'undefined'
      ? ''
      : item?.super_bueltp_area,
  );
  const [carpetArea, setCarpetArea] = useState(
    item?.corpet_area == null || item?.corpet_area == 'null'
      ? ''
      : item?.corpet_area == undefined || item?.corpet_area == 'undefined'
      ? ''
      : item?.corpet_area,
  );
  const [maintainence, setMaintainence] = useState(
    item?.maintenance == null || item?.maintenance == 'null'
      ? ''
      : item?.maintenance == undefined || item?.maintenance == 'undefined'
      ? ''
      : item?.maintenance,
  );
  const [totalFloors, setTotalFloors] = useState(
    item?.total_floors == null || item?.total_floors == 'null'
      ? ''
      : item?.total_floors == undefined || item?.total_floors == 'undefined'
      ? ''
      : item?.total_floors,
  );
  const [floorNo, setFloorNo] = useState(
    item?.floor_no == null || item?.floor_no == 'null'
      ? ''
      : item?.floor_no == undefined || item?.floor_no == 'undefined'
      ? ''
      : item?.floor_no,
  );
  const [carPark, setCarPark] = useState(
    item?.car_parking == null || item?.car_parking == 'null'
      ? ''
      : item?.car_parking == undefined || item?.car_parking == 'undefined'
      ? ''
      : item?.car_parking,
  );
  const [facing, setFacing] = useState(
    item?.facing == null || item?.facing == 'null'
      ? ''
      : item?.facing == undefined || item?.facing == 'undefined'
      ? ''
      : item?.facing,
  );
  const [title, setTitle] = useState(
    item?.add_title == null || item?.add_title == 'null'
      ? ''
      : item?.add_title == undefined || item?.add_title == 'undefined'
      ? ''
      : item?.add_title,
  );
  const [desc, setDesc] = useState(
    item?.description == null || item?.description == 'null'
      ? ''
      : item?.description == undefined || item?.description == 'undefined'
      ? ''
      : item?.description,
  );

  const height = Dimensions.get('window').height;

  const {t} = useTranslation();

  const onNext = () => {
    if (
      type == '' ||
      superArea == '' ||
      carpetArea == '' ||
      title == '' ||
      desc == ''
    ) {
      ErrMessage(t('Requied fields cannot be empty'));
    } else {
      navigation.navigate('AddImages', {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        cars: null,
        properties: {
          type: type,
          bathrooms: bathroom,
          bedrooms: bedroom,
          carpetArea: carpetArea,
          carParking: carPark,
          constructionStatus: construction,
          facing: facing,
          floorNo: floorNo,
          furnishing: furnishing,
          listedBy: list,
          maintainance: maintainence,
          superArea: superArea,
          totalFloors: totalFloors,
        },
        bikes: null,
        commercial: null,
        mobile: null,
        title: title,
        description: desc,
        item: item,
      });
    }
  };

  return (
    <View flex={1} bg={'white'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack flex={1} pt={10} space={7}>
          <Pressable
            mx={5}
            onPress={() => {
              setTypeModal(true);
            }}
            w={'90%'}
            borderBottomWidth={0.5}
            borderColor={'black'}
            variant={'underlined'}
            h={8}>
            <Text fontSize={13} color={type==''?'grey':'black'}>
              {type == '' ?
               t('Type *') :
                type}
            </Text>
          </Pressable>
          <Pressable
            mx={5}
            onPress={() => {
              setBedModal(true);
            }}
            w={'90%'}
            borderBottomWidth={0.5}
            borderColor={'black'}
            variant={'underlined'}
            h={8}>
            <Text fontSize={13} color={bedroom==''?'grey':'black'}>
              {bedroom == '' ? t('Bedrooms') : bedroom}
            </Text>
          </Pressable>
          <Pressable
            mx={5}
            onPress={() => {
              setbathroomModal(true);
            }}
            w={'90%'}
            borderBottomWidth={0.5}
            borderColor={'black'}
            variant={'underlined'}
            h={8}>
            <Text fontSize={13} color={bathroom == ''?'grey':'black'}>
              {bathroom == '' ? t('Bathrooms') : bathroom}
            </Text>
          </Pressable>
          <Pressable
            mx={5}
            onPress={() => {
              setFurnishingModal(true);
            }}
            w={'90%'}
            borderBottomWidth={0.5}
            borderColor={'black'}
            variant={'underlined'}
            h={8}>
            <Text fontSize={13} color={furnishing == '' ?'grey':'black'}>
              {furnishing == '' ? t('Furnishing') : furnishing}
            </Text>
          </Pressable>
          <Pressable
            mx={5}
            onPress={() => {
              setConstructionModal(true);
            }}
            w={'90%'}
            borderBottomWidth={0.5}
            borderColor={'black'}
            variant={'underlined'}
            h={8}>
            <Text fontSize={13} color={construction==''?'grey':'black'}>
              {construction == '' ? t('Construction Status') : construction}
            </Text>
          </Pressable>
          <Pressable
            mx={5}
            onPress={() => {
              setListModal(true);
            }}
            w={'90%'}
            borderBottomWidth={0.5}
            borderColor={'black'}
            variant={'underlined'}
            h={8}>
            <Text fontSize={13} color={list==''?'grey':'black'}>
              {list == '' ? t('Listed By') : list}
            </Text>
          </Pressable>
          <Input
            value={superArea}
            onChangeText={text => {
              setSuperArea(text);
            }}
            placeholder={t(`Super Builtup area (ft square) *`)}
            placeholderTextColor={'grey'}
            w={'90%'}
            variant={'underlined'}
            alignSelf={'center'}
            borderColor={'black'}
          />
          <Input
            value={carpetArea}
            onChangeText={text => {
              setCarpetArea(text);
            }}
            placeholder={t(`Carpet Area (ft square) *`)}
            placeholderTextColor={'grey'}
            w={'90%'}
            variant={'underlined'}
            alignSelf={'center'}
            borderColor={'black'}
          />
          <Input
            value={maintainence}
            onChangeText={text => {
              setMaintainence(text);
            }}
            placeholder={t(`Maintenance (Monthly)`)}
            placeholderTextColor={'grey'}
            w={'90%'}
            variant={'underlined'}
            alignSelf={'center'}
            borderColor={'black'}
          />
          <Input
            value={totalFloors}
            onChangeText={text => {
              setTotalFloors(text);
            }}
            placeholder={t('Total Floors')}
            placeholderTextColor={'grey'}
            w={'90%'}
            variant={'underlined'}
            alignSelf={'center'}
            borderColor={'black'}
          />
          <Input
            value={floorNo}
            onChangeText={text => {
              setFloorNo(text);
            }}
            placeholder={t('Floor No.')}
            placeholderTextColor={'grey'}
            w={'90%'}
            variant={'underlined'}
            alignSelf={'center'}
            borderColor={'black'}
          />
          <Pressable
            mx={5}
            onPress={() => {
              setCarParkModal(true);
            }}
            w={'90%'}
            borderBottomWidth={0.5}
            borderColor={'black'}
            variant={'underlined'}
            h={8}>
            <Text fontSize={13} color={carPark == ''?'grey':'black'}>
              {carPark == '' ? t('Car Parking') : carPark}
            </Text>
          </Pressable>

          <Pressable
            mx={5}
            onPress={() => {
              setFacingModal(true);
            }}
            w={'90%'}
            borderBottomWidth={0.5}
            borderColor={'black'}
            variant={'underlined'}
            h={8}>
            <Text fontSize={13} color={facing == ''?'grey':'black'}>
              {facing == '' ? t('Facing') : facing}
            </Text>
          </Pressable>

          <Input
            value={title}
            onChangeText={text => {
              setTitle(text);
            }}
            placeholder={`${t('Ad Title')} *`}
            placeholderTextColor={'grey'}
            w={'90%'}
            variant={'underlined'}
            alignSelf={'center'}
            borderColor={'black'}
          />
          <Input
            value={desc}
            onChangeText={text => {
              setDesc(text);
            }}
            placeholder={`${t('Describe what you are selling')} *`}
            placeholderTextColor={'grey'}
            w={'90%'}
            variant={'underlined'}
            alignSelf={'center'}
            borderColor={'black'}
          />
        </VStack>
        <Text ml={4} color={'grey'} mt={1} mb={3}>
          *{t('Required fields')}
        </Text>
      </ScrollView>

      <Button
        mb={5}
        mx={6}
        onPress={onNext}
        colorScheme={'red'}
        _text={{fontSize: 'lg'}}
        m={2}>
        {t('Next')}
      </Button>

      {/* Type modal */}
      <Modal transparent={true} visible={typeModal}>
        <Pressable
          onPress={() => {
            setTypeModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Box>
              <Text bold fontSize={'xl'}>
                {t('Type')}
              </Text>
              <VStack mt={8} space={5}>
                <Text
                  onPress={() => {
                    setTypeModal(false);
                    setType(t('Apartments'));
                  }}
                  fontSize={'xl'}>
                  {t('Apartments')}
                </Text>
                <Text
                  onPress={() => {
                    setTypeModal(false);
                    setType(t('Builder Floors'));
                  }}
                  fontSize={'lg'}>
                  {t('Builder Floors')}
                </Text>
                <Text
                  onPress={() => {
                    setTypeModal(false);
                    setType(t('Farm Houses'));
                  }}
                  fontSize={'lg'}>
                  {t('Farm Houses')}
                </Text>
                <Text
                  onPress={() => {
                    setTypeModal(false);
                    setType(t('Houses & Villas'));
                  }}
                  fontSize={'lg'}>
                  {t('Houses & Villas')}
                </Text>
              </VStack>
            </Box>
            <Text
              onPress={() => {
                setTypeModal(false);
              }}
              fontSize={'lg'}
              alignSelf={'flex-end'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Bedroom Modal */}
      <Modal transparent={true} visible={bedModal}>
        <Pressable
          onPress={() => {
            setBedModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Box>
              <Text bold fontSize={'xl'}>
                {t('Bedrooms')}
              </Text>
              <VStack mt={8} space={5}>
                <Text
                  onPress={() => {
                    setBedModal(false);
                    setBedroom('1');
                  }}
                  fontSize={'xl'}>
                  1
                </Text>
                <Text
                  onPress={() => {
                    setBedModal(false);
                    setBedroom('2');
                  }}
                  fontSize={'lg'}>
                  2
                </Text>
                <Text
                  onPress={() => {
                    setBedModal(false);
                    setBedroom('3');
                  }}
                  fontSize={'lg'}>
                  3
                </Text>
                <Text
                  onPress={() => {
                    setBedModal(false);
                    setBedroom('4');
                  }}
                  fontSize={'lg'}>
                  4
                </Text>
                <Text
                  onPress={() => {
                    setBedModal(false);
                    setBedroom('4+');
                  }}
                  fontSize={'lg'}>
                  4+
                </Text>
              </VStack>
            </Box>
            <Text
              onPress={() => {
                setBedModal(false);
              }}
              fontSize={'lg'}
              alignSelf={'flex-end'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Bathroom Modal */}
      <Modal transparent={true} visible={bathroomModal}>
        <Pressable
          onPress={() => {
            setbathroomModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Box>
              <Text bold fontSize={'xl'}>
                {t('Bathrooms')}
              </Text>
              <VStack mt={8} space={5}>
                <Text
                  onPress={() => {
                    setbathroomModal(false);
                    setBathroom('1');
                  }}
                  fontSize={'xl'}>
                  1
                </Text>
                <Text
                  onPress={() => {
                    setbathroomModal(false);
                    setBathroom('2');
                  }}
                  fontSize={'lg'}>
                  2
                </Text>
                <Text
                  onPress={() => {
                    setbathroomModal(false);
                    setBathroom('3');
                  }}
                  fontSize={'lg'}>
                  3
                </Text>
                <Text
                  onPress={() => {
                    setbathroomModal(false);
                    setBathroom('4');
                  }}
                  fontSize={'lg'}>
                  4
                </Text>
                <Text
                  onPress={() => {
                    setbathroomModal(false);
                    setBathroom('4+');
                  }}
                  fontSize={'lg'}>
                  4+
                </Text>
              </VStack>
            </Box>
            <Text
              onPress={() => {
                setbathroomModal(false);
              }}
              fontSize={'lg'}
              alignSelf={'flex-end'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Furnishing Modal */}
      <Modal transparent={true} visible={furnishingModal}>
        <Pressable
          onPress={() => {
            setFurnishingModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Box>
              <Text bold fontSize={'xl'}>
                {t('Furnishing')}
              </Text>
              <VStack mt={8} space={5}>
                <Text
                  onPress={() => {
                    setFurnishingModal(false);
                    setFurnishing(t('Furnished'));
                  }}
                  fontSize={'xl'}>
                  {t('Furnished')}
                </Text>
                <Text
                  onPress={() => {
                    setFurnishingModal(false);
                    setFurnishing(t('Semi-Furnished'));
                  }}
                  fontSize={'lg'}>
                  {t('Semi-Furnished')}
                </Text>
                <Text
                  onPress={() => {
                    setFurnishingModal(false);
                    setFurnishing(t('Unfurnished'));
                  }}
                  fontSize={'lg'}>
                  {t('Unfurnished')}
                </Text>
              </VStack>
            </Box>
            <Text
              onPress={() => {
                setFurnishingModal(false);
              }}
              fontSize={'lg'}
              alignSelf={'flex-end'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Construction Status Modal */}
      <Modal transparent={true} visible={constructionModal}>
        <Pressable
          onPress={() => {
            setConstructionModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Box>
              <Text bold fontSize={'xl'}>
                {t('Construction Status')}
              </Text>
              <VStack mt={8} space={5}>
                <Text
                  onPress={() => {
                    setConstructionModal(false);
                    setConstruction(t('New Launch'));
                  }}
                  fontSize={'xl'}>
                  {t('New Launch')}
                </Text>
                <Text
                  onPress={() => {
                    setConstructionModal(false);
                    setConstruction(t('Ready to Move'));
                  }}
                  fontSize={'lg'}>
                  {t('Ready to Move')}
                </Text>
                <Text
                  onPress={() => {
                    setConstructionModal(false);
                    setConstruction(t('Under Construction'));
                  }}
                  fontSize={'lg'}>
                  {t('Under Construction')}
                </Text>
              </VStack>
            </Box>
            <Text
              onPress={() => {
                setConstructionModal(false);
              }}
              fontSize={'lg'}
              alignSelf={'flex-end'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Listed by */}
      <Modal transparent={true} visible={listModal}>
        <Pressable
          onPress={() => {
            setListModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Box>
              <Text bold fontSize={'xl'}>
                {t('Listed by')}
              </Text>
              <VStack mt={8} space={5}>
                <Text
                  onPress={() => {
                    setListModal(false);
                    setList('Builder');
                  }}
                  fontSize={'xl'}>
                  {t('Builder')}
                </Text>
                <Text
                  onPress={() => {
                    setListModal(false);
                    setList('Dealer');
                  }}
                  fontSize={'lg'}>
                  {t('Dealer')}
                </Text>
                <Text
                  onPress={() => {
                    setListModal(false);
                    setList('owner');
                  }}
                  fontSize={'lg'}>
                  {t('owner')}
                </Text>
              </VStack>
            </Box>
            <Text
              onPress={() => {
                setListModal(false);
              }}
              fontSize={'lg'}
              alignSelf={'flex-end'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Car Parking */}
      <Modal transparent={true} visible={carParkModal}>
        <Pressable
          onPress={() => {
            setCarParkModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Box>
              <Text bold fontSize={'xl'}>
                {t('Car Parking')}
              </Text>
              <VStack mt={8} space={5}>
                <Text
                  onPress={() => {
                    setCarParkModal(false);
                    setCarPark('0');
                  }}
                  fontSize={'xl'}>
                  0
                </Text>
                <Text
                  onPress={() => {
                    setCarParkModal(false);
                    setCarPark('1');
                  }}
                  fontSize={'lg'}>
                  1
                </Text>
                <Text
                  onPress={() => {
                    setCarParkModal(false);
                    setCarPark('2');
                  }}
                  fontSize={'lg'}>
                  2
                </Text>
                <Text
                  onPress={() => {
                    setCarParkModal(false);
                    setCarPark('3');
                  }}
                  fontSize={'lg'}>
                  3
                </Text>
                <Text
                  onPress={() => {
                    setCarParkModal(false);
                    setCarPark('3+');
                  }}
                  fontSize={'lg'}>
                  3+
                </Text>
              </VStack>
            </Box>
            <Text
              onPress={() => {
                setCarParkModal(false);
              }}
              fontSize={'lg'}
              alignSelf={'flex-end'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* facing Modal */}
      <Modal transparent={true} visible={facingModal}>
        <Pressable
          onPress={() => {
            setFacingModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Box>
              <Text bold fontSize={'xl'}>
                {t('Facing')}
              </Text>
              <VStack mt={8} space={5}>
                <Text
                  onPress={() => {
                    setFacingModal(false);
                    setFacing('East');
                  }}
                  fontSize={'xl'}>
                  {t('East')}
                </Text>
                <Text
                  onPress={() => {
                    setFacingModal(false);
                    setFacing('North');
                  }}
                  fontSize={'lg'}>
                  {t('North')}
                </Text>
                <Text
                  onPress={() => {
                    setFacingModal(false);
                    setFacing('North-East');
                  }}
                  fontSize={'lg'}>
                  {t('North - East')}
                </Text>
                <Text
                  onPress={() => {
                    setFacingModal(false);
                    setFacing('North-West');
                  }}
                  fontSize={'lg'}>
                  {t('North - West')}
                </Text>
                <Text
                  onPress={() => {
                    setFacingModal(false);
                    setFacing('South');
                  }}
                  fontSize={'lg'}>
                  {t('South')}
                </Text>
                <Text
                  onPress={() => {
                    setFacingModal(false);
                    setFacing('South-East');
                  }}
                  fontSize={'lg'}>
                  {t('South - East')}
                </Text>
                <Text
                  onPress={() => {
                    setFacingModal(false);
                    setFacing('South-West');
                  }}
                  fontSize={'lg'}>
                  {t('South - West')}
                </Text>
                <Text
                  onPress={() => {
                    setFacingModal(false);
                    setFacing('West');
                  }}
                  fontSize={'lg'}>
                  {t('West')}
                </Text>
              </VStack>
            </Box>
            <Text
              onPress={() => {
                setFacingModal(false);
              }}
              fontSize={'lg'}
              alignSelf={'flex-end'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default PropertyForm;
