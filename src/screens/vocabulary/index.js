import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../../components/constainer";
import Header from "../../components/header";
import UserContext from "../../contexts/userContext";
import vocabulary from "../../utils/vocabulary.json";
import PlayingCardMedium from "./components/playingCardMedium";

const Vocabulary = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "80px";
  const FOOTER_HEIGHT = "50px";

  const navigate = useNavigate();
  const { lang } = useContext(UserContext);

  const onClickWord = async (word) => {
    navigate(`/vokabular/${encodeURI(word)}`);
  }

  const filteredVocabulary = vocabulary.filter(w => !!w['emoji']);

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <Header
          title={lang("VOCABULARY")}
          backButton
          menuButton
        />
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
