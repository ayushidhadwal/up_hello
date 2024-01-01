import React, {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import Config from '../../config';
import i18n from '../../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCountries } from '../../services/getCountries';

type LangContext = {
  lang: string;
  setLanguage: (lang: string, id: number | undefined) => void;
  setCountries: (country: string, id: number) => void;
  country: string;
  countryId: number | undefined;
  languageId: number | undefined;
  isUsingLocation: boolean;
  updateIsUsingLocation: (status: boolean) => void;
  countriesData:[];
  countryLoading: boolean;
};

export const LangContext = createContext({} as LangContext);

const LangContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [lang, setLang] = useState('English');

  const [isUsingLocation, setIsUsingLocation] = useState(false);


  const [countriesData, setCountriesData] = useState([])
  const [countryLoading, setCountryLoading] = useState(false);

  // language id state is used for showing  already selected language in setting screen modal
  const [languageId, setLanguageId] = useState<number | undefined>();

  const [country, setCountry] = useState('USA');

  // country id state is used for showing  already selected country in setting screen modal
  const [countryId, setCountryId] = useState<number | undefined>();


  useEffect(() => {

    const getCountryData = async () => {
      setCountryLoading(true);
      const result = await getCountries();
      setCountriesData(result);
      setCountryLoading(false);
    }
    getCountryData();

  }, [])


  const setCountries = async (
    country: string,
    id: number,
  ) => {
    setCountry(country);
    setCountryId(id);
    await AsyncStorage.setItem(Config.Country, country);
    await AsyncStorage.setItem(Config.CountryId, String(id));
  };

  const setLanguage = async (lang: string, id: number | undefined) => {
    setLang(lang);
    setLanguageId(id);
    await AsyncStorage.setItem(Config.Lang, lang);
    await AsyncStorage.setItem(Config.LanguageIDKey, String(id));
  };

  const restoreSession = async () => {
    const lang = await AsyncStorage.getItem(Config.Lang);
    const country = await AsyncStorage.getItem(Config.Country);
    const id = await AsyncStorage.getItem(Config.CountryId);
    const langId = await AsyncStorage.getItem(Config.LanguageIDKey);

    const isUsingLocationStore = await AsyncStorage.getItem(Config.IS_USING_LOCATION);

    setIsUsingLocation(isUsingLocationStore ? true : false)

    if (country) {
      setCountry(country);
    }
    if (id) {
      setCountryId(Number(id));
    }
    if (lang) {
      setLang(lang);
      i18n.changeLanguage(lang);
    }
    if (langId) {
      setLanguageId(Number(langId));
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  const updateIsUsingLocation = async (status: boolean) => {
    setIsUsingLocation(status)
    await AsyncStorage.setItem(Config.IS_USING_LOCATION, status ? "true" : "");
  }

  const value = {
    lang,
    setLanguage,
    
    //
    setCountries,
    country,
    countryId,
    languageId,

    //location
    isUsingLocation,
    updateIsUsingLocation,
    countriesData,
    countryLoading,
  };

  return <LangContext.Provider value={value} children={children} />;
};

export default LangContextProvider;
