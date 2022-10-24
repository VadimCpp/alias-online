import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import UserContext from "../contexts/userContext";
import getString from '../utils/getString';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { interfaceLang } = useContext(UserContext);


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

  const onLoginWithEmailAndPassword = () => {
    logInWithEmailAndPassword(email, password);
    navigate("/");
  };

  const onGoogleSignIn = () => {
    signInWithGoogle();
    navigate("/");
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Epost"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passord"
        />
        <Button onClick={() => onLoginWithEmailAndPassword()}>Log in</Button>
        <Button
          onClick={() => onGoogleSignIn()}
          style={{ backgroundColor: "#4285f4" }}
        >
          {getString(interfaceLang, "LOG_IN_WITH_GOOGLE")}
        </Button>
        <div>
          <Link to="/reset">{getString(interfaceLang, "FORGOT_YOUR_PASSWORD?")}</Link>
        </div>
        <br />
        <div>
          <Link to="/register">{getString(interfaceLang, "REGISTER")}</Link>
        </div>
      </LoginContainer>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginContainer = styled.div`
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

export default Login;
