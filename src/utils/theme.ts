import { createTheme } from "@mui/material/styles";

// Зберігаємо та завантажуємо тему з localStorage
const getSavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? JSON.parse(savedTheme) : 'light'; // За замовчуванням світла тема
};

const saveTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', JSON.stringify(theme));
};

// Створюємо теми
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const getCurrentTheme = () => themes[getSavedTheme() as 'light' | 'dark'];
export const setCurrentTheme = (theme: 'light' | 'dark') => {
  saveTheme(theme);
};
