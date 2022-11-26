import styled from "styled-components";

const PlayingCardMedium = ({wordObject, onClick, ...props}) => {
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
  width: 80px;
  height: 120px;
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
  font-size: 50px;
  text-align: center;
  line-height: 95px;
`;

const Word = styled.p`
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: black;
  background-color: gold;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default PlayingCardMedium;
