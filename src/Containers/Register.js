import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerWithEmailAndPassword, signInWithGoogle } from "../firebase";
import LanguageContext from "../contexts/languageContext";
import getString from '../utils/getString';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { interfaceLang, setInterfaceLang } = useContext(LanguageContext);

  /*

        // You can use the useEffect hook here to listen to changes to the
        // authentication state, in case you want to perform some action before
        // navigating back, for instance.

        useEffect(() =>{
            const auth = getAuth()
            const unsubscribe = onAuthStateChanged(auth, authUser => authUser ? setUser(authUser) : setUser(null));
            return () => unsubscribe();
        }, []);
        console.log(user)
    */

  const onRegisterUserWithEmailAndPassword = () => {
    registerWithEmailAndPassword(name, email, password);
    navigate("/");
  };

  const onGoogleSignIn = () => {
    signInWithGoogle();
    navigate("/");
  };

  return (
    <RegisterWrapper>
      <RegisterContainer>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button onClick={() => onRegisterUserWithEmailAndPassword()}>
          {getString(interfaceLang, "REGISTER")}
        </Button>
        <Button
          onClick={() => onGoogleSignIn()}
          style={{ backgroundColor: "#4285f4" }}
        >
          {getString(interfaceLang, "Register with Google")}
        </Button>

        <div>
          {getString(interfaceLang, "DO_YOU_HAVE_AN_ACCOUNT_ALREADY?")} <Link to="/login">{getString(interfaceLang, "LOG_IN_HERE")}</Link>.
        </div>
      </RegisterContainer>
    </RegisterWrapper>
  );
}

const RegisterWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RegisterContainer = styled.div`
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

export default Register;
