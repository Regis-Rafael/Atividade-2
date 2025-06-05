import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const lightTheme = {
    mode: "light",
    background: "#f0f0f0",
    text: "#000",
    inputText: "#000",
    inputBackground: "#ddd",
    border: "#ccc",
    placeholder: "#888",
    checkbox: "#fff",
    statusBar: "#f0f0f0",
    error: "#ff0000",
    
};

const darkTheme = {
    mode: "dark",
    background: "#000",
    text: "#fff",
    inputText: "#000",
    inputBackground: "#fff",
    border: "#666",
    placeholder: "#bbb",
    checkbox: "#fff",
    statusBar: "#050024",
    error: "#ff0000",
};

const ThemeContext = createContext(lightTheme);

export function ThemeProvider({ children }) {
    const systemColorScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState("system");

    useEffect(() => {
        AsyncStorage.getItem("themeMode").then((storedMode) => {
            if (storedMode) setThemeMode(storedMode);
        });
    }, []);

    const updateThemeMode = async (mode) => {
        setThemeMode(mode);
        await AsyncStorage.setItem("themeMode", mode);
    };

    const theme =
        themeMode === "dark"
            ? darkTheme
            : themeMode === "light"
            ? lightTheme
            : systemColorScheme === "dark"
            ? darkTheme
            : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, setThemeMode: updateThemeMode, themeMode }}>
            <StatusBar
                backgroundColor={theme.statusBar}
                barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
            />
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

