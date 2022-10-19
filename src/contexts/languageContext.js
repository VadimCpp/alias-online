import { createContext } from "react";

const LanguageContext = createContext({
  interfaceLang: "RU",
  learningLang: "NO",
  setInterfaceLang: () => {},
  setLearningLang: () => {},
});

export default LanguageContext;
