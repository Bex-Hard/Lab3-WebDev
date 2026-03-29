import { useThemeContext } from '../context/ThemeContext';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button className="secondary-button" onClick={toggleTheme}>
      Tema: {theme === 'light' ? 'Claro' : 'Escuro'}
    </button>
  );
}