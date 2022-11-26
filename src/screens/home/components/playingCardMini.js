import styled from "styled-components";

const PlayingCardMini = ({wordObject, onClick, ...props}) => {
  if (wordObject) {
    return (
      <Container {...props} onClick={() => onClick(wordObject['no'])}>
        {wordObject['emoji'] && <Icon>{wordObject['emoji']}</Icon>}
        <Word>{wordObject['no']}</Word>
      </Container>
    );
  }
  return null;
};

const Container = styled.div`
  width: 50px;
  height: 75px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid lightgray;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  margin: ${props => props.margin || 0};
  transition: transform 200ms linear;
  &:hover {
    transform: scale(1.10);
  }
  cursor: pointer;
`;

const Icon = styled.p`
  font-size: 32px;
  text-align: center;
  line-height: 50px;
`;

const Word = styled.p`
  text-align: center;
  font-size: 6px;
  line-height: 18px;
  color: black;
  background-color: gold;
`;

export default PlayingCardMini;
