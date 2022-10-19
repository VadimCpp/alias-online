import styled from "styled-components";
import {ReactComponent as SettingsLogo} from "../icons/icon.svg";
import {ReactComponent as MainLogo} from "../icons/location-globe.svg";

const StyledHeader = styled.div`
  position: relative;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 390px;
  height: 407px;
  background-position: top left;
  background-image: linear-gradient(198deg, #2BC48A 8.96%, 
  rgba(43, 196, 138, 0.962165) 56.08%, 
  rgba(43, 196, 138, 0.61) 76.08%, #ffffff 56.08%);    
`
const StyledMainLogo = styled(MainLogo)`
  position: absolute;
  top: 82%; left: 50%;
  transform: translate(-50%, -50%);  
`
const StyledSettingsLogo = styled(SettingsLogo)`
  transition: all .5s;
 &:hover{
   transform: scale(1.25);
 }
`

const Header = ({children}) => {
  return <StyledHeader>
    <StyledSettingsLogo />
    <StyledMainLogo  />
    {children}
  </StyledHeader>
};

export default Header;