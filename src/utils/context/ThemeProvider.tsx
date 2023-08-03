import { PropsWithChildren, createContext, useCallback, useState } from "react"

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState("dark")
  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme]
  )
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
