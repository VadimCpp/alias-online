import styled from "styled-components";

const PlayingCard = ({wordObject, ...props}) => {
  if (wordObject) {
    return (
      <Container {...props}>
        {wordObject['emoji'] && <Icon>{wordObject['emoji']}</Icon>}
        <Word>{wordObject['no']}</Word>
      </Container>
    );
  }
  return null;
};

const Container = styled.div`
  width: 200px;
  height: 300px;
  border-radius: 10px;
  border: 1px solid lightgray;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  margin: ${props => props.margin || 0};
`;

const Icon = styled.p`
  font-size: 128px;
  text-align: center;
  line-height: 240px;
`;

const Word = styled.p`
  text-align: center;
  font-size: 18px;
  line-height: 50px;
  color: black;
  background-color: gold;
`;

export default PlayingCard;
