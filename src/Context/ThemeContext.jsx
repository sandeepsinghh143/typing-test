import { createContext, useState ,useContext } from "react";
import { themeOptions } from "../Utils/themeOptions";


const ThemeContext = createContext();

export const ThemeContextProvider = (props)=> {
    const defaultValue = JSON.parse(localStorage.getItem("theme"))||themeOptions[0].value;
    const [theme, setTheme] = useState(defaultValue);
    const values = {
        theme,
        setTheme
    }
    return (
        <ThemeContext.Provider value={values}>{props.children}</ThemeContext.Provider>
    )
}

export const useTheme=()=>useContext(ThemeContext);