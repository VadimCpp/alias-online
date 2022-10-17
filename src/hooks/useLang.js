import { useState } from 'react';

const useLang = () => {
  const [interfaceLang, setInterfaceLang] = useState("RU");
  const [learningLang, setLearningLang] = useState("EN");
  return {
    interfaceLang,
    learningLang,
    setInterfaceLang,
    setLearningLang
  };
};

export default useLang;
