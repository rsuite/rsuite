import React from 'react';
import { Text } from 'rsuite';

/**
 * Inspired by https://github.com/mui/material-ui/blob/7c7fd30ffc6eec4ead1ca06a780cf35c06683ac3/docs/src/modules/components/AdCarbon.js#L57
 */
function AdCarbonInline(props: React.HTMLAttributes<HTMLAnchorElement>) {
  const [ad, setAd] = React.useState(null);

  React.useEffect(() => {
    let active = true;
    let attempt = 0;

    (async () => {
      async function tryFetch() {
        if (attempt >= 10 || !active) {
          return null;
        }

        attempt += 1;
        let response;
        try {
          response = await fetch('https://srv.buysellads.com/ads/CW7DTK3W.json');
        } catch (err) {
          // Ad blocker crashes this request
          return null;
        }

        const data = await response.json();

        const sanitizedAd = data.ads
          .filter(item => Object.keys(item).length > 0)
          .filter(item => item.statlink)
          .filter(Boolean)[0];

        if (!sanitizedAd) {
          return tryFetch();
        }

        return sanitizedAd;
      }
      const sanitizedAd = await tryFetch();
      if (active) {
        setAd(sanitizedAd);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return ad ? (
    <a
      {...props}
      className="carbon-ad-inline"
      id={`carbon-native-${ad.timestamp}`}
      href={ad.statlink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={ad.image} style={{ backgroundColor: ad.backgroundColor }} />
      <span>{ad.company}</span>
      {' — '}
      <span>{ad.description}</span>
      <Text className="carbon-ad-badge">Ad</Text>
      {/* Impression */}
      <img src={ad.statimp} alt="" style={{ display: 'none' }} />
      {/* Pixel */}
      {ad.pixel &&
        ad.pixel
          .split('||')
          .map((pixel, i) => (
            <img
              key={i}
              src={`${pixel.replace('[timestamp]', ad.timestamp)}`}
              style={{ display: 'none' }}
              alt=""
            />
          ))}
    </a>
  ) : null;
}

export default AdCarbonInline;
