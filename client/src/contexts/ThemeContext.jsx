import { createContext, useMemo, useState } from 'react';

const ThemeContext = createContext('light');

const ThemeContextProvider = (props) => {
    const { children } = props;

    const [theme, setTheme] = useState('light');

    const themeObject = useMemo(() => {
        return { theme, setTheme };
    }, [theme]);

    return (
        <ThemeContext.Provider value={themeObject}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeContextProvider };
