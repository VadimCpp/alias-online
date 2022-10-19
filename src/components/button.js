import styled from "styled-components";

const StyledButton = styled.button`
  width: 252px;
  height: 72px;
  background-color: #2BC48A;  
  color: #FFFFFF;
  font-weight: 400;
  font-size: 44px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  text-transform: ${({uppercase}) => uppercase || 'none' };
  margin-bottom: 110px;
  transition: all .5s;
  &:hover{
    transform: scale(1.15);
  }  
`
const Button = ({children, ...props}) => {
  return <StyledButton {...props}>
    {children}
  </StyledButton>
};

export default Button;