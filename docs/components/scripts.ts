export function installCarbon() {
  const subtitle = document.querySelector('h2');
  const carbonadsJs = document.getElementById('_carbonads_js');
  const adView = document.getElementById('ad-view');

  if (!carbonadsJs) {
    const adSpace = document.createElement('div');
    const carbon = document.createElement('script');

    carbon.src = 'https://cdn.carbonads.com/carbon.js?serve=CEAIL2JU&placement=rsuitejscom';
    carbon.id = '_carbonads_js';
    adSpace.appendChild(carbon);

    if (adView) {
      // Hide the ad space if the data-hide attribute is set to true
      if (adView.dataset.hide === 'true') {
        return;
      }

      adView.appendChild(adSpace);
    } else if (subtitle) {
      subtitle.parentNode.insertBefore(adSpace, subtitle);
    }
  }
}

function createStorybook(componentName: string) {
  const ignoreList = [
    'Affix',
    'Animation',
    'DOMHelper',
    'Whisper',
    'useMediaQuery',
    'CustomProvider',
    'All Components',
    'Icons',
    'CSS Reset',
    'Formik integration'
  ];

  if (ignoreList.includes(componentName) || !componentName) {
    return null;
  }

  const storybook = document.createElement('a');
  storybook.href = `https://storybook.rsuitejs.com/?path=/story/components-${componentName?.toLocaleLowerCase()}`;
  storybook.target = '_blank';
  storybook.rel = 'noopener noreferrer';
  storybook.id = 'storybook-link';
  storybook.className = 'rs-stack-item';

  const storybookIcon = document.createElement('img');
  storybookIcon.src = '/images/storybook.svg';
  storybookIcon.alt = 'Storybook';
  storybook.appendChild(storybookIcon);

  return storybook;
}

function createMinVersionBadge(minVersion: string) {
  const badge = document.createElement('a');
  badge.href = `https://github.com/rsuite/rsuite/releases/tag/v${minVersion}`;
  badge.target = '_blank';
  badge.rel = 'noopener noreferrer';
  badge.id = 'min-version-badge';
  badge.className = 'rs-stack-item';
  const img = document.createElement('img');
  img.src = `https://img.shields.io/badge/version->=${minVersion}-blue`;
  img.alt = `Supported from version ${minVersion}`;
  img.title = `Supported from version ${minVersion}`;

  badge.appendChild(img);

  return badge;
}

export function installBadges({
  minVersion,
  componentName
}: {
  minVersion?: string;
  componentName: string;
}) {
  if (document.getElementById('badge-container')) {
    return;
  }

  const pageHeader = document.querySelector('.page-heading');
  const badgeContainer = document.createElement('div');
  badgeContainer.className = 'rs-stack';
  badgeContainer.id = 'badge-container';
  badgeContainer.style.gap = '10px';
  badgeContainer.style.marginBottom = '10px';

  const storybook = createStorybook(componentName);

  if (storybook) {
    badgeContainer.appendChild(storybook);
  }

  if (minVersion) {
    badgeContainer.appendChild(createMinVersionBadge(minVersion));
  }

  if (badgeContainer.children.length > 0) {
    pageHeader.parentNode?.insertBefore(badgeContainer, pageHeader?.nextSibling);
  }
}
