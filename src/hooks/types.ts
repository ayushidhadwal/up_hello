export type RecentItems = {
  id: number;
  itemName: string;
  price: number;
  location: string;
  images: string[];
  brandName: string;
  description: string;
  favorite: boolean;
  stateName: string;
  districtName: string;
  cityName: string;
  cState: string;
  cCity: string;
  cNeighbourhood: string;
  calcPrice: string;
  symbol: string;
  featuredPackage: boolean;
};

export type RecentItemsDetails = {
  id: number;
  itemName: string;
  price: number;
  location: string;
  images: string[];
  brandName: string;
  description: string;
  userName: string;
  userImg: string;
  favorite: boolean;
  sellerId: number;
};

export type Banner = {
  image: string;
};

export type Slider = {
  image: string;
};

export type MyItemDetails = {
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
};

export type GoogleAddressCoords = {
  latitude: number;
  longitude: number;
};

export type GoogleAddress = {
  id: string;
  name: string;
  description: string;
  formattedAddress: string;
  country: string;
};
