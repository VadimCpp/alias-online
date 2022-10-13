import React from "react";
import { Route, Routes } from "react-router-dom";
import "./firebase";

import LanguageContext from "./contexts/languageContext";
import useLang from "./hooks/useLang";

import Home from "./Containers/Home";
import Login from "./Containers/Login";
import Question from "./Containers/Question";
import Questions from "./Containers/Questions";
import Quiz from "./Containers/Quiz";
import Register from "./Containers/Register";
import Reset from "./Containers/Reset";
import Signin from "./Containers/Signin";

const App = () => {
  return (
    <LanguageContext.Provider value={useLang()}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/question" element={<Question />} />
          <Route path="/question/:id" element={<Question />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </LanguageContext.Provider>
  );
};
export default App;
