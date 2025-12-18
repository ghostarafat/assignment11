import { useTheme as useThemeContext } from '../providers/ThemeProvider';

// Re-export the theme hook for easier imports
export const useTheme = useThemeContext;

export default useTheme;