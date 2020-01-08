function getLocalePath(callback: (path: string) => void) {
  return locale => {
    const localePath = locale === 'en' ? '/en/' : '/';
    return callback(localePath);
  };
}

export default getLocalePath;
