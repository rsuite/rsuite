const LANGUAGES = ['en', 'zh'];

function pathnameToLanguage(pathname) {
  const userLanguage = pathname.substring(1, 3);

  if (LANGUAGES.indexOf(userLanguage) !== -1 && pathname.indexOf(`/${userLanguage}/`) === 0) {
    return {
      userLanguage,
      canonical: userLanguage === 'zh' ? pathname : pathname.substring(3)
    };
  }

  return {
    userLanguage: 'zh',
    canonical: pathname
  };
}
module.exports = {
  pathnameToLanguage
};
