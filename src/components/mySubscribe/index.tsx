import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
    deleteWeatherData,
    fetchWeatherCity,
    saveWeatherData,
} from "../store/weatherSlice";
import WeatherCard from "../weatherCard";

const MySubscribed = () => {
    const dispatch = useDispatch();
    const savedAddresses = useSelector(
        (state: RootState) => state.weather.savedData
    );
    // const currentWeatherData = useSelector(
    //     (state: RootState) => state.weather.data
    // );

    useEffect(() => {
        const currentDate = new Date();

        const updateWeatherData = async () => {
            const updatedSavedAddresses = [];

            for (const weatherData of savedAddresses) {
                const firstDay = weatherData.days[0];
                const datetime = new Date(firstDay.datetime);

                const isSameDate =
                    currentDate.getFullYear() === datetime.getFullYear() &&
                    currentDate.getMonth() === datetime.getMonth() &&
                    currentDate.getDate() === datetime.getDate();

                if (!isSameDate && datetime < currentDate) {
                    //@ts-ignore
                    dispatch(deleteWeatherData(weatherData.resolvedAddress));
                    const response = await dispatch(
                        //@ts-ignore
                        fetchWeatherCity(weatherData.resolvedAddress)
                    );
                    if (fetchWeatherCity.fulfilled.match(response)) {
                        const updatedWeatherData = response.payload;
                        //@ts-ignore
                        dispatch(saveWeatherData(updatedWeatherData));
                        updatedSavedAddresses.push(updatedWeatherData);
                    }
                } else {
                    updatedSavedAddresses.push(weatherData);
                }
            }
            //@ts-ignore
            dispatch(setSavedData(updatedSavedAddresses));
        };

        updateWeatherData();
    }, [savedAddresses, dispatch]);

    return (
        <div className="flex flex-col">
            {savedAddresses.length > 0 && (
                <h2 className="text-left mt-8 mb-1 text-slate-400 font-bold uppercase">
                    Saved Locations
                </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {savedAddresses.map((weatherData, index) => (
                    <WeatherCard key={index} weatherData={weatherData} />
                ))}
            </div>
        </div>
    );
};

export default MySubscribed;
