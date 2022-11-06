import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #2BC48A;  
  color: #FFFFFF;
  font-size: ${({uppercase}) => (uppercase === 'uppercase' ? '44px' : '22px') }; 
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  text-transform: ${({uppercase}) => uppercase || 'none' };  
  padding: ${({uppercase}) => (uppercase === 'uppercase' ? '0.5em' : '15px') };
  margin: 5px;
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
