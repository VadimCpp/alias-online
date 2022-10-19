import styled from "styled-components";

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row' };
  align-items: ${props => props.align || 'center' };
  justify-content: ${props => props.justify || 'center' };
  padding-right: 1em;
  padding-left: 1em;
  margin: ${props => props.margin || '0' };  
  background: #ffffff;  
`

const FlexContainer = (props) => {
  return <StyledFlexContainer {...props} />
};

export default FlexContainer;