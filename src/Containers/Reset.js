import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sendPasswordReset } from "../firebase";
import LanguageContext from "../contexts/languageContext";
import getString from '../utils/getString';

function Reset() {
  const [email, setEmail] = useState("");
  const { interfaceLang, setInterfaceLang } = useContext(LanguageContext);

  const onSendResetPassword = () => {
    sendPasswordReset(email);
  };

  return (
    <ResetWrapper>
      <ResetContainer>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Button onClick={() => onSendResetPassword()}>
          {getString(interfaceLang, "SEND_RESET_PASSWORD_EMAIL")}
        </Button>

        <div>
          <Link to="/register">{getString(interfaceLang, "REGISTER")}</Link>
        </div>
      </ResetContainer>
    </ResetWrapper>
  );
}

const ResetWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ResetContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #dcdcdc;
  padding: 30px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  color: white;
  background-color: black;
`;

export default Reset;
