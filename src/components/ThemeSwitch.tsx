import { useContext } from "react";
import { styled } from "styled-components";
import { ThemeContext } from "../utils/context/ThemeProvider";
import { StyledProps } from "../models/types";

const StyledInput = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  &: checked + label span {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;

const StyledLabel = styled.label<StyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 45px;
  height: 28px;
  background: ${({ $isDarkMode }) => ($isDarkMode ? "#e6e6e6" : "#333")};
  border-radius: 100px;
  transition: background-color 0.2s;
    @media (min-width: 768px){
      width: 60px;
      height:34px;
    }
  }
`;

const Switch = styled.span<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 25px;
  height: 25px;
  border-radius: 45px;
  transition: 0.2s;
  background: ${({ $isDarkMode }) => ($isDarkMode ? "black" : "white")};
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

export default function SwitchComponent() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <>
      <StyledInput type="checkbox" id="switch" onClick={() => toggleTheme()} />
      <StyledLabel htmlFor="switch" $isDarkMode={theme === "dark"}>
        <Switch className="switch" $isDarkMode={theme === "dark"}>
          {theme === "dark" ? "🌙" : "☀️"}
        </Switch>
      </StyledLabel>
    </>
  );
}
