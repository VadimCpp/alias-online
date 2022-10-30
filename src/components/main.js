import styled from "styled-components";
const StyledMain = styled.main`
  margin-top: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`

const Main = ({children}) => {
  return <StyledMain>
    {children}
  </StyledMain>
}
export default Main;
