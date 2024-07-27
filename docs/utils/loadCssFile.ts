export default function loadCssFile(url: string, id = 'default') {
  return new Promise<Event>(resolve => {
    const container = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    const version = `v${process.env.VERSION}`;
    const buildId = process.env.VERCEL_DEPLOYMENT_ID || process.env.BUILD_ID;

    link.id = id;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `${url}?${version ?? ''}${buildId ? `-${buildId}` : ''}`;
    link.onload = event => {
      resolve(event);
    };
    container.appendChild(link);
  });
}
