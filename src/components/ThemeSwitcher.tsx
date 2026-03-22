import type { Theme } from '../types/Weather';

type ThemeSwitcherProps = {
  theme: Theme;
  onToggle: () => void;
};

export function ThemeSwitcher({ theme, onToggle }: ThemeSwitcherProps) {
  return (
    <button className="secondary-button" onClick={onToggle}>
      Tema: {theme === 'light' ? 'Claro' : 'Escuro'}
    </button>
  );
}