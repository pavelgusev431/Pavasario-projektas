import { createContext, useState } from 'react';

const ThemeContext = createContext('light');

const ThemeContextProvider = (props) => {
    const { children } = props;

    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeContextProvider };