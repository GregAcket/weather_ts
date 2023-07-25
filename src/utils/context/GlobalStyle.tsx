import { useContext } from "react";
import { ThemeContext } from "./index";
import { createGlobalStyle } from "styled-components";

const StyledGlobalStyle = createGlobalStyle`
    body {
        background-color: ${({ isDarkMode }) =>
          isDarkMode ? "black" : "white"};
        color: ${({ isDarkMode }) => (isDarkMode ? "white" : "black")};
        margin: 0;
    }
`;

export default function GlobalStyle() {
  const { theme } = useContext(ThemeContext);

  return <StyledGlobalStyle isDarkMode={theme === "dark"} />;
}
