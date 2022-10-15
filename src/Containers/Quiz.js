import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LanguageContext from "../contexts/languageContext";
import getString from '../utils/getString';

const Quiz = () => {
  const navigate = useNavigate();
  const { interfaceLang, setInterfaceLang } = useContext(LanguageContext);

  return (
    <>
      <div style={{ width: "3em", marginLeft: "1em" }}>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
      <QuestionsContainer>
        <QuestionsHeader>Quiz</QuestionsHeader>
        <Table>
          <thead>
            <tr>
              <TableDataHead>{getString(interfaceLang, "QUESTION")}</TableDataHead>
              <TableDataHead>{getString(interfaceLang, "ANSWER")}</TableDataHead>
              <TableDataHead>{getString(interfaceLang, "MADE_BY")}</TableDataHead>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </QuestionsContainer>
    </>
  );
};

const Table = styled.table`
  margin-top: 1em;
`;
const TableDataHead = styled.td`
  padding: 5px;
  font-weight: bold;
`;
const QuestionsContainer = styled.div`
  margin: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const QuestionsHeader = styled.h1`
  font-size: 2em;
  margin-bottom: 1em;
`;

export default Quiz;
