import { useTheme } from '../../hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ className = '', variant = 'navbar' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const getButtonClasses = () => {
    const baseClasses = "btn btn-ghost btn-circle transition-all duration-300";
    
    if (variant === 'navbar') {
      return `${baseClasses} hover:bg-white/10 ${className}`;
    } else if (variant === 'dashboard') {
      return `${baseClasses} hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`;
    }
    
    return `${baseClasses} ${className}`;
  };

  const getIconClasses = () => {
    if (variant === 'navbar') {
      return isDarkMode 
        ? "w-5 h-5 text-yellow-400 animate-pulse" 
        : "w-5 h-5 text-white";
    } else if (variant === 'dashboard') {
      return isDarkMode 
        ? "w-5 h-5 text-yellow-400 animate-pulse" 
        : "w-5 h-5 text-gray-600";
    }
    
    return "w-5 h-5";
  };

  return (
    <button
      onClick={toggleTheme}
      className={getButtonClasses()}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {isDarkMode ? (
          <FaSun className={getIconClasses()} />
        ) : (
          <FaMoon className={getIconClasses()} />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;