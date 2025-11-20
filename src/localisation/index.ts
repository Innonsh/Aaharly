import LocalizedContent from 'react-localization';

const content = new LocalizedContent({
  en: require('./content/en.json'),
});

const setAppLanguage = (language: string) => {
  try {
    if (language) {
      content.setLanguage(language);
    }
  } catch (error) {
    console.log(error);
  }
};

export default content;

export { setAppLanguage };