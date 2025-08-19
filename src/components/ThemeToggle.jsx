import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Alternar tema"
      onClick={toggleTheme}
      className="p-2 rounded-lg text-theme-teal hover:bg-theme-teal-light focus:outline-none focus:ring-2 focus:ring-theme-teal transition-colors duration-200 cursor-pointer"
    >
      {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
