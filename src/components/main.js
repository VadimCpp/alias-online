import styled from "styled-components";
const StyledMain = styled.main`
  flex: 1 1 auto;
`

const Main = ({children}) => {
  return <StyledMain>
    {children}
  </StyledMain>
}
export default Main;