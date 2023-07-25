import { styled } from "styled-components";
import SwitchComponent from "./ThemeSwitch";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <SwitchComponent />
    </HeaderContainer>
  );
}
