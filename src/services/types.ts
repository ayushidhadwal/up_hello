import { FormDataImg } from '../screens/ListingScreen';

export type GetCategory = {
  id: number;
  brandId: string;
  categoryNameEn: string;
  categoryName: string;
  categoryNameHn: string;
  categoryNameBn: string;
  categoryNameAr: string;
  categoryCover: string;
  categoryIcon: string;
  type: string;
};

export type SubCategory = {
  id: number;
  categoryId: number;
  subCategoryNameEn: string;
  subCategoryNameBn: string;
  subCategoryNameHn: string;
  subCategoryNameAr: string;
  subCategoryPhoto: string;
  subCategoryIcon: string;
  formType: string;
};

export type AddItem = {
  image: FormDataImg[];
  categoryId: number | string;
  subCategoryId: number | string;
  stateId: number | undefined;
  cityId: number | undefined;
  localityId: number | undefined;
  description: string;
  price: string;
  title: string;
  lat: number;
  long: number;
  location: string;
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
  brandId: number | null
};

export type EditItem = {
  id: number;
  image: FormDataImg[];
  categoryId: number | string;
  subCategoryId: number | string;
  stateId: number;
  cityId: number;
  localityId: number;
};

export type ContactUsForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ChangePassword = {
  oldPass: string;
  newPass: string;
  confPass: string;
};

export type StatesType = {
  id: number;
  stateName: string;
};

export type CityType = {
  id: number;
  cityName: string;
};

export type LocalityType = {
  id: number;
  localityName: string;
  cityId: number;
  stateId: number;
};

export type MYItems = {
  id: number;
  name: string;
  price: number;
  location: string;
  brandName: string;
  categoryId: number;
  subcategoryId: number;
  description: string;
  discount: number;
  type: string;
  stateId: number;
  districtId: number;
  cityId: number;
  username: string;
  profileImage: string;
  categoryName: string;
  subCategoryName: string;
  stateName: string;
  districtName: string;
  cityName: string;
  itemImages: string[];
  loacalityId: string;
  soldOut: boolean;
  viewCount: number;
  createdAt: string;
  favouriteCount: string;
};

export type Favourites = {
  id: number;
  userId: string;
  itemId: string;
  userName: string;
  itemName: string;
  symbol: string;
  itemPrice: number;
  image: string[];
};

export type Brand = {
  id: number;
  brandName: string;
  brandNamehn: string;
  brandNamear: string;
  brandNamebn: string;
};

export type Profile = {
  id: number;
  username: string;
  email: string;
  profileImage: string;
  address: string;
  phoneNumber: string;
  code: string;
};

export type SearchItems = {
  id: number;
  name: string;
  price: number;
  location: string;
  brandId: string;
  categoryId: string;
  subcategoryId: string;
  photo: string[];
  description: string;
  discount: number;
  stateId: number;
  districtId: number;
  cityId: number;
  brandName: string;
  categoryName: string;
  subCategoryName: string;
  stateName: string;
  districtName: string;
  cityName: string;
  favorite: boolean;
  featuredPackage: boolean;
  categoryNameEn: string;
  currency: string;
};

export type MyReels = {
  id: number;
  title: string;
  description: string;
  video: string;
  type: string;
  thumbnail: string;
};

export type AllReels = {
  id: number;
  title: string;
  description: string;
  video: string;
  likeStatus: string;
  username: string;
  profileImage: string;
};

export type Notification = {
  id: number;
  notificationTitle: string;
  notificationBody: string;
  createdAt: string;
};
