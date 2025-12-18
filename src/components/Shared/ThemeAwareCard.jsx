import { useTheme } from "../../hooks/useTheme";

const ThemeAwareCard = ({ children, className = "" }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`card shadow-lg transition-all duration-300 ${className}`}
      style={{
        backgroundColor: "var(--color-card-bg)",
        color: "var(--color-text-dark)",
        borderColor: "var(--color-border)",
      }}
    >
      {children}
    </div>
  );
};

export default ThemeAwareCard;
