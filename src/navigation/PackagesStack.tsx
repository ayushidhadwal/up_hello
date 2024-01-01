import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PackagesStackParamList, } from './types';
import { useTranslation } from 'react-i18next';
import BuyPackagesScreen from '../screens/Packages/BuyPackagesScreen';
import MyOrdersScreen from '../screens/Packages/MyOrdersScreen';
import PackagesScreen from '../screens/Packages/PackagesScreen';
import InvoicesScreen from '../screens/Packages/InvoicesScreen';
import PackageCategoryScreen from '../screens/Packages/PackageCategoryScreen';
import PackageCityScreen from '../screens/Packages/PackageCityScreen';
import PackageLocalityScreen from '../screens/Packages/PackageLocalityScreen';
import PackageSubCategoryScreen from '../screens/Packages/PackageSubCategoryScreen';
import PackageStateScreen from '../screens/Packages/PackageStateScreen';
import i18n from '../i18n';
import PackagesGoogleSearch from '../screens/Packages/PackagesGoogleSearch';
import { Text } from 'native-base';

const PackagesStack = ({ navigation }) => {
  const Stack = createNativeStackNavigator<PackagesStackParamList>();

  const { t } = useTranslation();



  const locale = i18n.language;

  return (
    <Stack.Navigator
      initialRouteName="Packages"
    // screenOptions={{headerShown: true}}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: true,
          title: 'Invoices & Billing',
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <AntDesign
              onPress={() => {
                navigation.goBack();
              }}
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          ),
        }}
        name="Packages"
        component={PackagesScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: true,
          title: t('Buy Packages'),
          headerTitleAlign: 'center',
        }}
        name="BuyPackages"
        component={BuyPackagesScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: t('My Orders'),
        }}
        name="Orders"
        component={MyOrdersScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: true,
          title: t('Invoices'),
        }}
        name="Invoices"
        component={InvoicesScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: true,
          title: t('Category'),
        }}
        name="PackageCategoryScreen"
        component={PackageCategoryScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerShown: true,
          headerShadowVisible: true,
          headerTitle: () =>
            <Text bold fontSize={'lg'} textTransform={'capitalize'}>
              {locale === 'en' && route.params.item.categoryNameEn}
              {locale === 'hn' && route.params.item.categoryNameHn}
              {locale === 'bn' && route.params.item.categoryNameBn}
              {locale === 'ar' && route.params.item.categoryNameAr}
            </Text>,
        })}
        name="PackageSubCategoryScreen"
        component={PackageSubCategoryScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: true,
          title: t('Location'),
        }}
        name="PackageStateScreen"
        component={PackageStateScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerShown: true,
          headerShadowVisible: true,
          headerTitle: () =>
            <Text bold fontSize={'lg'} textTransform={'capitalize'}>{route.params.name}</Text>,
        })}
        name="PackageCityScreen"
        component={PackageCityScreen}
      />

      <Stack.Screen
        options={({ route }) => ({
          headerShown: true,
          headerShadowVisible: true,
          headerTitle: () =>
            <Text bold fontSize={'lg'} textTransform={'capitalize'}>{route.params.cityName}</Text>,
        })}
        name="PackageLocalityScreen"
        component={PackageLocalityScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PackageGoogleSearchScreen"
        component={PackagesGoogleSearch}
      />

    </Stack.Navigator>
  );
};

export default PackagesStack;
