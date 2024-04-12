import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherData } from "../../assets/models";
import WeatherLocalStorageService from "../../services/weatherCityLocalStrageService";

export const fetchWeatherCity = createAsyncThunk(
    "weather/fetchWeatherCity",
    async (cityName: string) => {
        try {
            const response = await axios.get(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=EUEQ4LDRZAS7HY2ZSJTVV76JD&contentType=json`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const saveWeatherData = createAsyncThunk(
    "weather/saveWeatherData",
    async (weatherData: WeatherData, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            //@ts-ignore

            const existingWeatherData = state.weather.savedData.find(
                (data) => data.resolvedAddress === weatherData.resolvedAddress
            );
            if (existingWeatherData) {
                //@ts-ignore

                dispatch(
                    deleteWeatherData(existingWeatherData.resolvedAddress)
                );
            }
            WeatherLocalStorageService.setWeatherLocalStorage(weatherData);
            return weatherData;
        } catch (error) {
            //@ts-ignore

            return rejectWithValue(error.message);
        }
    }
);

export const deleteWeatherData = createAsyncThunk(
    "weather/deleteWeatherData",
    async (resolvedAddress: string) => {
        WeatherLocalStorageService.removeWeatherLocalStorage(resolvedAddress);
        return resolvedAddress;
    }
);
export const selectWeatherData = createAction("weather/selectWeatherData");
// Initial state
const initialState = {
    data: null,
    loading: false,
    error: null,
    savedData: [],
    //@ts-ignore
    selectedData: null,
};

// Reducer oluşturma
const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherCity.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWeatherCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(saveWeatherData.fulfilled, (state, action) => {
                state.savedData.push(action.payload);
            })
            .addCase(saveWeatherData.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteWeatherData.fulfilled, (state, action) => {
                state.savedData = state.savedData.filter(
                    (weatherData) =>
                        weatherData.resolvedAddress !== action.payload
                );
            })
            .addCase(deleteWeatherData.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(selectWeatherData, (state, action) => {
                state.selectedData = action.payload;
            });
    },
});

export default weatherSlice.reducer;
