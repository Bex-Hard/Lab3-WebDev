import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useThemeContext } from '../context/ThemeContext';

export function AppLayout() {
  const { theme } = useThemeContext();

  return (
    <main className={`app ${theme}`}>
      <div className="container">
        <header className="header">
          <Navbar />
          <ThemeSwitcher />
        </header>

        <Outlet />
      </div>
    </main>
  );
}