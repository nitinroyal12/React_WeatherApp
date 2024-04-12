import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "./App.css";
import MySubscribed from "./components/mySubscribe";
import SearchBar from "./components/searchBar";
import { TopMenu } from "./components/shared/menu";
import { store } from "./components/store/store";
import { useState } from "react";
import CityList from "./components/cityList/CityList";
const customTheme = extendTheme({
    styles: {
        //@ts-ignore
        global: (props) => ({
            body: {
                background: `linear-gradient(to bottom, #ffffff,#baf7ff)`,
                minHeight: "100vh",
            },
        }),
    },
});
function App() {

    const [toggle, setToggle] = useState(false)
    const [value,setValue] = useState("")
    
    return (
        <Provider store={store}>
            <ChakraProvider theme={customTheme}>
                <TopMenu setToggle={setToggle}/>
                {toggle ? <>
                    <SearchBar value={value} />
                    <MySubscribed />
                </>
                :<CityList setToggle={setToggle} setValue={setValue} />
                }

            </ChakraProvider>
        </Provider>
    );
}

export default App;
