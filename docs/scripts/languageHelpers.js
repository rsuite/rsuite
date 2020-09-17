const LANGUAGES = ['en', 'zh'];

function pathnameToLanguage(pathname) {
  const results = pathname.match(new RegExp('/(' + LANGUAGES.join('|') + ')/', 'i'));
  const userLanguage = results ? results[1] : 'en';

  return {
    userLanguage,
    canonical: userLanguage === 'en' ? pathname : pathname.substring(3)
  };
}
module.exports = {
  pathnameToLanguage
};
