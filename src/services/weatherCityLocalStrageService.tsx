import { WeatherData } from "../assets/models";
const ADDRESS_STORAGE_PREFIX = "weather_address_";

const WeatherLocalStorageService = {
    setWeatherLocalStorage: (weatherData: WeatherData) => {
        localStorage.setItem(
            ADDRESS_STORAGE_PREFIX + weatherData.resolvedAddress,
            JSON.stringify(weatherData)
        );
    },

    getAllSavedAddresses: () => {
        const savedAddresses = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key.startsWith(ADDRESS_STORAGE_PREFIX)) {
                const addressData = localStorage.getItem(key);
                savedAddresses.push(JSON.parse(addressData));
            }
        }

        return savedAddresses;
    },
    removeWeatherLocalStorage: (resolvedAddress: string) => {
        const key = ADDRESS_STORAGE_PREFIX + resolvedAddress;
        localStorage.removeItem(key);
    },
};

export default WeatherLocalStorageService;
