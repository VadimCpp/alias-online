import styled from "styled-components";
import FlexContainer from "./flexContainer";

const StyledWrapper = styled.div`
  position: relative;
  width: 390px;  
  margin: 0 auto;
  height: 100vh;
`
// Wrapper -> FlexContainer -> StyledFlexContainer

const Wrapper = ({children}) => {
  return <StyledWrapper>
    <FlexContainer direction={'column'} height={'100vh'}>
      {children}
    </FlexContainer>
  </StyledWrapper>
};

export default Wrapper;
