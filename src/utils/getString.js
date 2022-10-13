import translations from './translations.json';

const getString = (lang, value) => {
  if (!value || !lang) return "";

  let translation = null;
  for(let valueKey in translations) {
    if (valueKey === value) {
      translation = translations[value];
      break;
    }
  }

  let result = "";
  if (translation) {
    for(let langKey in translation) {
      if (langKey === lang) {
        result = translation[lang];
      }
    }
  }

  return result;
}

export default getString;
