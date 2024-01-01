import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { GetCategory, MYItems, MyReels } from '../services/types';
import { FormDataImg } from '../screens/ListingScreen';

export type BottomTabsParamList = {
  Homescreen: undefined;
  message: ChatStackParamList;
  AddScreen: undefined;
  Reelscreen: undefined;
  myAds: AdsTopBarParamList;
};

export type RootStackParamsList = {
  BottomTabs: BottomTabsParamList | undefined;
  ChooseLocation: undefined;
  Favourites: undefined;
  Notification: undefined;
  RecentItem: undefined;
  PopularItem: undefined;
  DiscountItem: undefined;
  SellerAccount: undefined;
  RegisterVerify: undefined;
  Itemscreen: {
    id: number;
  };
  GoogleMapSearchScreen: undefined;
  Message: undefined;
  Listing: undefined;
  Chat: {
    sellerId: number | undefined;
    sellerName: string | undefined;
    itemImage: string | undefined;
    itemId: number | undefined;
    itemTitle: string | undefined;
    chatId: string;
    phoneNumber:string | null;
  };
  CategoriesScreen: undefined;
  Searchscreen: undefined;
  Contactus: undefined;
  Locationscreen: undefined;
  GetStarted: undefined;
  Loginscreen: undefined;
  Registerscreen: undefined;
  ChangePassword: undefined;
  AuthStack: AuthStackParamList | undefined;
  Morecategories: undefined;
  SubCategory: {
    id: number;
    item: GetCategory;
  };
  ItemCategory: {
    categoryId: string;
    subCategoryId: string;
    searchItem: string;
    item: GetCategory;
  };
  city: {
    name: string;
    id: number;
  };
  locality: {
    cityName: string;
    cityId: number;
    stateName: string;
    stateId: number;
  };
  EditAds: { item: MYItems };
  MyAdsDetails: {
    id: number;
  };
  MyReels: undefined;
  MyReelsDetail: {
    item: MyReels;
  };
  AddSubCategory: {
    id: number;
    name: string;
  };
  AddDescription: {
    categoryId: string;
    subCategoryId: string;
    item: any;
  };
  AddImages: {
    categoryId: string;
    subCategoryId: string;
    cars: {
      brand: string;
      year: string;
      fuel: string;
      transmission: string;
      kmDriven: string;
      noOfOwner: string;
    } | null;
    properties: {
      type: string;
      bedrooms: string;
      bathrooms: string;
      furnishing: string;
      constructionStatus: string;
      listedBy: string;
      superArea: string;
      carpetArea: string;
      maintainance: string;
      totalFloors: string;
      floorNo: string;
      carParking: string;
      facing: string;
    } | null;
    commercial: {
      type: string;
      year: string;
      kmDriven: string;
    } | null;
    mobile: {
      brand: string;
    } | null;
    bikes: {
      brand: string;
      year: string;
      kmDriven: string;
    } | null;
    title: string;
    description: string;
    item: any;
  };
  AddPrice: {
    categoryId: string;
    subCategoryId: string;
    title: string;
    description: string;
    images: FormDataImg[];
    cars: {
      brand: string;
      year: string;
      fuel: string;
      transmission: string;
      kmDriven: string;
      noOfOwner: string;
    } | null;
    properties: {
      type: string;
      bedrooms: string;
      bathrooms: string;
      furnishing: string;
      constructionStatus: string;
      listedBy: string;
      superArea: string;
      carpetArea: string;
      maintainance: string;
      totalFloors: string;
      floorNo: string;
      carParking: string;
      facing: string;
    } | null;
    commercial: {
      type: string;
      year: string;
      kmDriven: string;
    } | null;
    mobile: {
      brand: string;
    } | null;
    bikes: {
      brand: string;
      year: string;
      kmDriven: string;
    } | null;
    item: any;
  };
  AddLocation: {
    categoryId: string;
    subCategoryId: string;
    title: string;
    description: string;
    images: FormDataImg[];
    price: string;
    cars: {
      brand: string;
      year: string;
      fuel: string;
      transmission: string;
      kmDriven: string;
      noOfOwner: string;
    } | null;
    properties: {
      type: string;
      bedrooms: string;
      bathrooms: string;
      furnishing: string;
      constructionStatus: string;
      listedBy: string;
      superArea: string;
      carpetArea: string;
      maintainance: string;
      totalFloors: string;
      floorNo: string;
      carParking: string;
      facing: string;
    } | null;
    commercial: {
      type: string;
      year: string;
      kmDriven: string;
    } | null;
    mobile: {
      brand: string;
    } | null;
    bikes: {
      brand: string;
      year: string;
      kmDriven: string;
    } | null;
    item: any;
    editCheck: any;
  };
  AddPost: {
    categoryId: string;
    subCategoryId: string;
    title: string;
    description: string;
    images: FormDataImg[];
    price: string;
    cars: {
      brand: string;
      year: string;
      fuel: string;
      transmission: string;
      kmDriven: string;
      noOfOwner: string;
    } | null;
    properties: {
      type: string;
      bedrooms: string;
      bathrooms: string;
      furnishing: string;
      constructionStatus: string;
      listedBy: string;
      superArea: string;
      carpetArea: string;
      maintainance: string;
      totalFloors: string;
      floorNo: string;
      carParking: string;
      facing: string;
    } | null;
    commercial: {
      type: string;
      year: string;
      kmDriven: string;
    } | null;
    mobile: {
      brand: string;
    } | null;
    bikes: {
      brand: string;
      year: string;
      kmDriven: string;
    } | null;
    locationDesc: any;
    item: any;
  };
  AddStateScreen: {
    categoryId: number;
    subCategoryId: number;
    description: string;
    images: FormDataImg[];
    price: string;
    title: string;
    cars: {
      brand: string;
      year: string;
      fuel: string;
      transmission: string;
      kmDriven: string;
      noOfOwner: string;
    } | null;
    properties: {
      type: string;
      bedrooms: string;
      bathrooms: string;
      furnishing: string;
      constructionStatus: string;
      listedBy: string;
      superArea: string;
      carpetArea: string;
      maintainance: string;
      totalFloors: string;
      floorNo: string;
      carParking: string;
      facing: string;
    } | null;
    commercial: {
      type: string;
      year: string;
      kmDriven: string;
    } | null;
    mobile: {
      brand: string;
    } | null;
    bikes: {
      brand: string;
      year: string;
      kmDriven: string;
    } | null;
    item: any;
  };
  AddCityScreen: {
    name: string;
    id: number;
    categoryId: number;
    subCategoryId: number;
    description: string;
    images: FormDataImg[];
    price: string;
    title: string;
    cars: {
      brand: string;
      year: string;
      fuel: string;
      transmission: string;
      kmDriven: string;
      noOfOwner: string;
    } | null;
    properties: {
      type: string;
      bedrooms: string;
      bathrooms: string;
      furnishing: string;
      constructionStatus: string;
      listedBy: string;
      superArea: string;
      carpetArea: string;
      maintainance: string;
      totalFloors: string;
      floorNo: string;
      carParking: string;
      facing: string;
    } | null;
    commercial: {
      type: string;
      year: string;
      kmDriven: string;
    } | null;
    mobile: {
      brand: string;
    } | null;
    bikes: {
      brand: string;
      year: string;
      kmDriven: string;
    } | null;
    item: any;
  };
  AddGoogleApiScreen: {
    categoryId: number;
    subCategoryId: number;
    description: string;
    images: FormDataImg[];
    price: string;
    title: string;
    cars: {
      brand: string;
      year: string;
      fuel: string;
      transmission: string;
      kmDriven: string;
      noOfOwner: string;
    } | null;
    properties: {
      type: string;
      bedrooms: string;
      bathrooms: string;
      furnishing: string;
      constructionStatus: string;
      listedBy: string;
      superArea: string;
      carpetArea: string;
      maintainance: string;
      totalFloors: string;
      floorNo: string;
      carParking: string;
      facing: string;
    } | null;
    commercial: {
      type: string;
      year: string;
      kmDriven: string;
    } | null;
    mobile: {
      brand: string;
    } | null;
    bikes: {
      brand: string;
      year: string;
      kmDriven: string;
    } | null;
    item: any;
  };
  AddLocalityScreen: {
    cityName: string;
    cityId: number;
    stateName: string;
    stateId: number;
    categoryId: number;
    subCategoryId: number;
    description: string;
    images: FormDataImg[];
    price: string;
    title: string;
    cars: {
      brand: string;
      year: string;
      fuel: string;
      transmission: string;
      kmDriven: string;
      noOfOwner: string;
    } | null;
    properties: {
      type: string;
      bedrooms: string;
      bathrooms: string;
      furnishing: string;
      constructionStatus: string;
      listedBy: string;
      superArea: string;
      carpetArea: string;
      maintainance: string;
      totalFloors: string;
      floorNo: string;
      carParking: string;
      facing: string;
    } | null;
    commercial: {
      type: string;
      year: string;
      kmDriven: string;
    } | null;
    mobile: {
      brand: string;
    } | null;
    bikes: {
      brand: string;
      year: string;
      kmDriven: string;
    } | null;
    item: any;
  };
  CarForm: {
    categoryId: string;
    subCategoryId: string;
    item: any;
  };
  MobileForm: {
    categoryId: string;
    subCategoryId: string;
    item: any;
  };
  BikeForm: {
    categoryId: string;
    subCategoryId: string;
    item: any;
  };
  PropertyForm: {
    categoryId: string;
    subCategoryId: string;
    item: any;
  };
  DefaultForm: {
    categoryId: string;
    subCategoryId: string;
    item: any;
  };
  CommercialVehicle: {
    categoryId: string;
    subCategoryId: string;
    item: any;
  };
};

export type AddStackParamList = {
  Addscreen: undefined;
};

export type DrawerParamList = {
  Home: RootStackParamsList;
  ProfileStack: ProfileStackParamList;
};

export type AuthStackParamList = {
  GetStarted: undefined;
  Loginscreen: undefined;
  Registerscreen: undefined;
  TermsAndCondition: undefined;
  ForgotPasswordscreen: undefined;
  Verificationscreen: {
    otp: number;
    email: string;
  };
  NewPasswordscreen: {
    otps: number;
    email: string;
  };
  RegisterVerify: {
    emailOtp: any;
    mobileOtp: any;
    email: string;
    id: any;
  };
  LoginWithPhone: undefined;
  MobileVerification: {
    id: any;
    otp: any;
    token: any;
    number: any;
    code: any;
  };
};

export type ProfileStackParamList = {
  profile: undefined;
  Edit: undefined;
  Contactus: undefined;
  Settings: undefined;
  help: undefined;
  ChangePassword: undefined;
};

export type AdsTopBarParamList = {
  ads: undefined;
  Videos: undefined;
  favourite: undefined;
};
export type OrdersTopBarParamList = {
  Active: undefined;
  Scheduled: undefined;
  Expired: undefined;
};

export type ChatStackParamList = {
  buying: undefined;
  selling: undefined;
};

export type SellTopBarParamList = {
  sellItem: undefined;
  addReel: undefined;
};
export type PackagesStackParamList = {
  Packages: undefined;
  BuyPackages: {
    subCategory: string;
  };
  Orders: undefined;
  Invoices: undefined;
  PackageCategoryScreen: undefined;
  PackageSubCategoryScreen: {
    id: any,
    item: GetCategory,

  };
  PackageStateScreen: undefined;
  PackageCityScreen: {
    id: any;
    name: any;
  };
  PackageLocalityScreen: { cityId: any, cityName: any, stateName: any, stateId: any };
  PackageGoogleSearchScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, Screen>;

export type AddStackScreenProps<Screen extends keyof AddStackParamList> =
  NativeStackScreenProps<AddStackParamList, Screen>;

export type SellTopBarScreenProps<Screen extends keyof SellTopBarParamList> =
  NativeStackScreenProps<SellTopBarParamList, Screen>;

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList,
> = NativeStackScreenProps<ProfileStackParamList, Screen>;

export type PackagesStackScreenProps<
  Screen extends keyof PackagesStackParamList,
> = NativeStackScreenProps<PackagesStackParamList, Screen>;

export type OrderTopBarScreenProps<Screen extends keyof OrdersTopBarParamList> =
  NativeStackScreenProps<OrdersTopBarParamList, Screen>;

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;

export type AppDrawerScreenProps<Screen extends keyof DrawerParamList> =
  DrawerScreenProps<DrawerParamList, Screen>;

export type RootNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamsList>,
  BottomTabNavigationProp<BottomTabsParamList>
>;

export type DrawerNavigationProps = DrawerNavigationProp<DrawerParamList>;

export type RootBottomTabScreenProps<Screen extends keyof BottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >;
