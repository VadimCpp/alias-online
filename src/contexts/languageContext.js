import { createContext } from "react";

const LanguageContext = createContext({
  interfaceLang: "EN",
  learningLang: "NO",
  setInterfaceLang: () => {},
  setLearningLang: () => {},
});

export default LanguageContext;
