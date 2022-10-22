import styled from "styled-components";
import FlexContainer from "./flexContainer";

const StyledWrapper = styled.div`
  width: 390px;  
  margin: 0 auto;
  min-height: 100vh;
`

const Wrapper = ({children}) => {
  return <StyledWrapper>
    <FlexContainer direction={'column'} height={'100vh'}>
      {children}
    </FlexContainer>
  </StyledWrapper>
};

export default Wrapper;