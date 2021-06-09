import React, {createContext, useEffect, useState} from 'react';

export const themeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [colors, setColors] = useState({});

  const handleChange = () => {
    if (isDarkTheme) {
      setColors({
        background: '#120E43',
        foreground: '#EAF0FF',
        secondaryText: '#A5C0FF',
      });
    } else {
      setColors({
        background: '#CAD5E2',
        foreground: '#242B2E',
        secondaryText: '#5A20CB',
      });
    }
  };

  useEffect(() => {
    handleChange();
  }, [isDarkTheme]);

  return (
    <themeContext.Provider
      value={{
        colors,
        isDarkTheme,
        setIsDarkTheme,
      }}>
      {children}
    </themeContext.Provider>
  );
};
