import { useCallback, useState, useEffect } from "react";

export default function useTheme() {
  const html = document.documentElement;
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || (html.classList.contains("dark") ? "dark" : "light");
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [html.classList, theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggleTheme };
}
