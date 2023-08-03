import { styled } from "styled-components"
import SwitchComponent from "./ThemeSwitch"

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
`

export default function Header() {
  return (
    <HeaderContainer>
      <SwitchComponent />
    </HeaderContainer>
  )
}
