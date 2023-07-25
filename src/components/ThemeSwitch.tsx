import { useContext } from "react";
import { styled } from "styled-components";
import { ThemeContext } from "../utils/context/index";

const StyledInput = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  &: checked + label .switch {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;

const StyledLabel = styled.label`
  margin-top: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 60px;
  height: 34px;
  background: grey;
  border-radius: 100px;
  transition: background-color 0.2s;
  }
`;

const Switch = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 30px;
  height: 30px;
  border-radius: 45px;
  transition: 0.2s;
`;

export default function SwitchComponent() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <>
      <StyledInput type="checkbox" id="switch" onClick={() => toggleTheme()} />
      <StyledLabel htmlFor="switch">
        <Switch
          className="switch"
          style={{ background: theme === "dark" ? "black" : "white" }}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </Switch>
      </StyledLabel>
    </>
  );
}
