import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Container from "../../components/constainer";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import UserContext from "../../contexts/userContext";
import vocabulary from "../../utils/vocabulary.json";
import PlayingCardMedium from "./components/playingCardMedium";

const Vocabulary = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "120px";
  const FOOTER_HEIGHT = "50px";

  const navigate = useNavigate();
  const { lang, showModal } = useContext(UserContext);

  const onClickWord = async (word) => {
    navigate(`/vokabular/${encodeURI(word)}`);
  }

  const filteredVocabulary = vocabulary.filter(w => !!w['emoji']);

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <VocabularyHeader>
          <EmptyBlock />
          <Title onClick={() => navigate("/")}>{lang("VOCABULARY")}</Title>
          <MenuButton onClick={() => showModal()} />
        </VocabularyHeader>
      </Container.Header>
      <Container.Content>
        <VocabularyContent>
          { filteredVocabulary.map((word) => {
            return <PlayingCardMedium key={word['no']} wordObject={word} margin={"0 10px 15px"} onClick={onClickWord} />
          })}
        </VocabularyContent>
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <VocabularyFooter>
          { lang("THERE_ARE_X_WORDS_IN_VOCABULAR", filteredVocabulary.length) }
        </VocabularyFooter>
      </Container.Footer>
    </Container>
  );
};

const EmptyBlock = styled.div`
  width: 36px;
  height: 36px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #ffffff;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
`;

const MenuButton = styled(MenuIcon)`
  transition: all .5s;
  width: 36px;
  height: 36px;
  &:hover {
    transform: scale(1.25);
  }
  cursor: pointer;
`;

const VocabularyHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #2BC48A;
  padding: 0 20px;
`;

const VocabularyContent = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;

const VocabularyFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #222;
  padding: 0 20px;
  color: white;
`;

export default Vocabulary;
