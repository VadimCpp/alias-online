import styled from "styled-components";
const StyledMain = styled.main`
  margin-top: ${ props => props.isPlayingRoom ? '25vh' : '35vh'};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`

const Main = ({isPlayingRoom, children}) => {
  return <StyledMain isPlayingRoom={isPlayingRoom}>
    {children}
  </StyledMain>
}
export default Main;
