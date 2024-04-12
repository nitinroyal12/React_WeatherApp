//@ts-ignore
import moment from "moment";
import { BsCloudMinusFill } from "react-icons/bs";
import { WiThermometer } from "react-icons/wi";
import { useDispatch } from "react-redux";
import { WeatherData } from "../../assets/models";
import WeatherIconService from "../../services/weatherIconService";
import { deleteWeatherData, selectWeatherData } from "../store/weatherSlice";

const WeatherCard = (props: { weatherData: WeatherData }) => {
    const weatherData = props.weatherData;
    const dispatch = useDispatch();

    const onDeleteWeather = (weatherData: WeatherData) => async () => {
        try {
            //@ts-ignore
            await dispatch(deleteWeatherData(weatherData.resolvedAddress));
        } catch (error) {
            console.error(
                "An error occurred while deleting weather data:",
                error
            );
        }
    };
    const updateSelectedData = (weatherData: WeatherData) => {
        //@ts-ignore
        dispatch(selectWeatherData(weatherData));
    };

    const onSelectData = (selectWeather: WeatherData) => () => {
        updateSelectedData(selectWeather);
        smoothScrollToTop();
    };
    const smoothScrollToTop = () => {
        const scrollToOptions = {
            top: 0,
            behavior: "smooth",
        };
        //@ts-ignore
        window.scrollTo(scrollToOptions);
    };
    return (
        <div>
            <div
                onClick={onSelectData(weatherData)}
                className="card bg-orange-50 backdrop-blur-md card-bordered border-white hover:border-orange-500"
            >
                <div
                    onClick={onDeleteWeather(weatherData)}
                    className=" absolute top-[20px] right-[20px] bg-red-400 hover:bg-red-600 rounded-full p-[6px]"
                >
                    <BsCloudMinusFill
                        size={15}
                        color="white"
                    ></BsCloudMinusFill>
                </div>
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-gray-800 font-bold card-title card h-24 overflow-hidden">
                        {weatherData.resolvedAddress}
                    </h2>
                </div>
                <div className="flex flex-row items-center space-x-5 justify-around">
                    {WeatherIconService.getIconByCondition(
                        weatherData.days[0].conditions,
                        75
                    )}
                    <div className="flex flex-row mt-1 items-center">
                        <p className=" text-2xl font-bold text-left ">
                            {weatherData.days[0].temp}
                        </p>
                        <WiThermometer size={30} color="gray"></WiThermometer>
                    </div>
                </div>
                <div className="overflow-x-auto pb-4">
                    <div className="flex space-x-4 ">
                        {weatherData.days.map((day) => (
                            <div
                                key={day.datetime}
                                className="flex-shrink-0 border rounded-md hover:bg-orange-200 border-gray-200 w-[150px] p-4 mt-5 space-x-5"
                            >
                                <h2 className=" border-b border-gray-300">
                                    {moment(day.datetime).format("DD") + "  "}
                                    {moment(day.datetime).format("dddd")}
                                </h2>
                                <div className="flex flex-row space-x-6 items-center mt-3 ">
                                    <div>
                                        {WeatherIconService.getIconByCondition(
                                            day.conditions,
                                            40
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className=" font-bold flex">
                                            {Math.round(day.tempmax)}
                                            &deg;
                                        </p>
                                        <p className=" font-light flex">
                                            {day.tempmin}
                                            &deg;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
