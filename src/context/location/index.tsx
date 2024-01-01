import React, {
    FC,
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from 'react';
import Config from '../../config';
import { LocationObject } from '../../screens/Home/locationComponent/LocalityListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface LocationContextProps {
    locationDesc: string | null;
    setLocationDescription: (location: string) => void;
    locationData: LocationObject | null;
    setLocationObject: (locationObject: LocationObject) => void;
    setCoordinates: (lat: number, long: number) => void;
    long: number | null;
    lat: number | null;
}



export const LocationContext = createContext({} as LocationContextProps);

export const LocationContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [locationDesc, setlocationDesc] = useState<string | null>(null);
    const [locationData, setLocationData] = useState<LocationObject | null>(null)


    const [lat, setLat] = useState<number | null>(null);
    const [long, setLong] = useState<number | null>(null);

    const setLocationDescription = async (location: string) => {
        await AsyncStorage.setItem(Config.LOCATION_DESC, location);
        setlocationDesc(location);
        setLocationData(null);
        await AsyncStorage.removeItem(Config.LOCATION_OBJECT);
    }

    const setLocationObject = async (locationObject: LocationObject) => {

        const jsonValue = JSON.stringify(locationObject);

        await AsyncStorage.setItem(Config.LOCATION_OBJECT, jsonValue)
        setLocationData(locationObject);
        setlocationDesc(null);
        await AsyncStorage.removeItem(Config.LOCATION_DESC);
        await AsyncStorage.removeItem(Config.LAT);
        await AsyncStorage.removeItem(Config.LONG);
    }

    const setCoordinates = async (lat: number, long: number) => {
        setLat(lat)
        setLong(long);
        await AsyncStorage.setItem(Config.LAT, String(lat));
        await AsyncStorage.setItem(Config.LONG, String(long));
        await AsyncStorage.removeItem(Config.LOCATION_OBJECT);
    }


    useEffect(() => {
        const restoreSession = async () => {
            const location = await AsyncStorage.getItem(Config.LOCATION_DESC);
            const jsonLocation = await AsyncStorage.getItem(Config.LOCATION_OBJECT);
            const lats = await AsyncStorage.getItem(Config.LAT);
            const longs = await AsyncStorage.getItem(Config.LONG);
            if (location) {
                setlocationDesc(location);
            }
            if (jsonLocation) {
                const locationObjects = JSON.parse(jsonLocation);
                setLocationObject(locationObjects);
            }
            if (lats) {
                setLat(Number(lats));
            }
            if (longs) {
                setLong(Number(longs));
            }
        };

        restoreSession();
    }, []);

    const value = { locationDesc, setLocationDescription, locationData, setLocationObject, setCoordinates, lat, long };

    return <LocationContext.Provider value={value} children={children} />;
};
