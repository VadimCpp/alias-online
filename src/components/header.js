import styled, { keyframes } from "styled-components";
import {ReactComponent as SettingsLogo} from "../icons/icon.svg";
import {ReactComponent as MainLogo} from "../icons/location-globe.svg";
import {ReactComponent as GoogleLogo} from "../icons/google-icon.svg";

const StyledHeader = styled.div`
  color: #ffffff;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  min-height: 50vh;
  background-position: top left;
  background-image: linear-gradient(198deg, #2BC48A 8.96%, 
  rgba(43, 196, 138, 0.962165) 56.08%, 
  rgba(43, 196, 138, 0.61) 76.08%, #ffffff 56.08%);  
  position: absolute;
  top: 0;
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
const StyledGoogleLogo = styled(GoogleLogo)`
  position: absolute;
  top: 85%; left: 50%;
  transform: translate(-50%, -50%);
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  position: absolute;
  top: 85%; left: 50%;
  transform: translate(-50%, -50%);  
  animation: ${rotate} 2s linear 1s;
`;

const Header = ({children, isPrimary, isSign, onClick, isLang=false}) => {
  return <StyledHeader>
    {!isLang ?
      <StyledSettingsLogo onClick={onClick} />
      :
      ``}
    {isPrimary ?
      <Rotate>
        <StyledMainLogo />
      </Rotate>
      :
      ``


    }
    {isSign ?
      <Rotate>
      <StyledGoogleLogo />
      </Rotate>:
      ``
    }
    {children}
  </StyledHeader>
};

export default Header;
