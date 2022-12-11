import React, { useContext } from "react";
import styled from "styled-components";
import Button from "../../../components/button";
import UserContext from "../../../contexts/userContext";

const LangButtons = () => { 
  const { setInterfaceLang } = useContext(UserContext);

  return (
    <Container>
      { ["no", "ua", "ru", "en"].map((lang) => <Button key={lang} onClick={() => setInterfaceLang(lang)}>{lang}</Button>) }
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export default LangButtons;
