import {
    WiCloud,
    WiCloudy,
    WiDaySunny,
    WiNightRain,
    WiRainMix,
} from "react-icons/wi";

interface WeatherIconServiceProps {
    condition: string;
}

const WeatherIconService = {
    getIconByCondition: (condition: string, size: number = 100) => {
        switch (condition) {
            case "Rain, Partially cloudy":
            case "Rain":
                return <WiRainMix size={size} color="gray" />;
            case "Clear":
                return <WiDaySunny size={size} color="orange" />;
            case "Partially cloudy":
                return <WiCloud size={size} color="gray" />;
            case "Overcast":
                return <WiCloudy size={size} color="gray" />;
            case "Rain, Overcast":
                return <WiNightRain size={size} color="gray" />;
            default:
                return condition;
        }
    },
};

export default WeatherIconService;
