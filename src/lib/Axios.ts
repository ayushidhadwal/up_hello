import axios, {AxiosHeaders} from 'axios';
import {ApiEndPoints} from '../services/ApiEndPoints';
import Config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Axios = axios.create({
  baseURL: Config.API_URL,
});

const authRoutes: string[] = [];

for (const property in ApiEndPoints.auth) {
  authRoutes.push(
    ApiEndPoints.auth[property as keyof typeof ApiEndPoints.auth],
  );
}

Axios.interceptors.request.use(
  async function (config: any) {
    if (!config) {
      config = {};
    }

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    const country = await AsyncStorage.getItem(Config.Country);

    if (country) {
      config.headers.set('country', country);
    } else {
      config.headers.set('country', 'india');
    }

    // console.log(config.url);

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  response => {
    if (!response?.data?.status) {
      throw new Error(response?.data?.message);
    }

    return response;
  },
  error => {
    if (error.response && error.response.data) {
      if (error.response.status === 401) {
        return Promise.reject(new Error(error.response.status));
      }
    }
    console.log(error.response);

    return Promise.reject(new Error(error.response.status));
  },
);
