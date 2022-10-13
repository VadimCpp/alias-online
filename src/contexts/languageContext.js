import { createContext } from "react";

const LanguageContext = createContext({
  interfaceLang: "UA",
  learningLang: "NO",
  setInterfaceLang: () => {},
  setLearningLang: () => {},
});

export default LanguageContext;
