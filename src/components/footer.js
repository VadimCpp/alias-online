import styled from "styled-components";
const StyledFooter = styled.footer`
  flex-shrink: 0;
  padding-bottom: 4em;
`

const Footer = ({children}) => {
  return <StyledFooter>
    {children}
  </StyledFooter>
}

export default Footer;