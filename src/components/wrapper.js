import styled from "styled-components";
import FlexContainer from "./flexContainer";
const StyledWrapper = styled.div`
  width: 390px;
  margin: 0 auto;
`
const Wrapper = ({children}) => {
  return <StyledWrapper>
    <FlexContainer direction={'column'}>
      {children}
    </FlexContainer>
  </StyledWrapper>
};

export default Wrapper;