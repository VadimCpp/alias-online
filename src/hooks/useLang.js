import { useState } from 'react';

const useLang = () => {
  const [interfaceLang, setInterfaceLang] = useState("EN");
  const [learningLang, setLearningLang] = useState("NO");
  return {
    interfaceLang,
    learningLang,
    setInterfaceLang,
    setLearningLang
  };
};

export default useLang;
