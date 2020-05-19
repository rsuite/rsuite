/*
 * todo will remove in RSuite v5
 * Upgrading from v1 to v2: https://github.com/date-fns/date-fns/blob/master/CHANGELOG.md#200---2019-08-20
 * date-fns-upgrade: https://github.com/date-fns/date-fns-upgrade/blob/master/src/v2/convertTokens/index.ts
 * */

declare const useDateFnsPolyfill: boolean;

type TokensMap = {
  [v1token: string]: string;
};

const tokensMapV1ToV2: TokensMap = {
  // 'D MMMM': '',
  // 'Do MMMM': '',
  // 'DD MMMM': '',
  M: 'L',
  Mo: 'Mo',
  MM: 'LL',
  MMM: 'LLL',
  MMMM: 'LLLL',
  Q: 'q',
  Qo: 'qo',
  D: 'd',
  Do: 'do',
  DD: 'dd',
  DDD: 'D',
  DDDo: 'Do',
  DDDD: 'DDD',
  d: 'i',
  do: 'io',
  dd: 'iiiiii',
  ddd: 'iii',
  dddd: 'iiii',
  A: 'a',
  aa: 'aaaa',
  E: 'i',
  W: 'I',
  Wo: 'Io',
  WW: 'II',
  YY: 'yy',
  YYYY: 'yyyy',
  GG: 'RR',
  GGGG: 'RRRR',
  Z: 'xxx',
  ZZ: 'xx',
  X: 't',
  x: 'T'
};
const tokensMapV2ToV1: TokensMap = Object.entries(tokensMapV1ToV2).reduce(
  (acc, [k, v]) => ({ ...acc, [v]: k }),
  {}
);

const v1tokens = Object.keys(tokensMapV1ToV2)
  .sort()
  .reverse();
const v2tokens = Object.keys(tokensMapV2ToV1)
  .sort()
  .reverse();

const v1TokensRegExp = new RegExp(`(\\[[^\\[]*\\])|(\\\\)?(${v1tokens.join('|')}|.)`, 'g');
const v2TokensRegExp = new RegExp(`(\\[[^\\[]*\\])|(\\\\)?(${v2tokens.join('|')}|.)`, 'g');

type TokensBuffer = {
  formatBuffer: string[];
  textBuffer: string[];
};

function convertTokens(format: string, reverse = false): string {
  const tokensCaptures = format.match(reverse ? v2TokensRegExp : v1TokensRegExp);
  const tokensMap = reverse ? tokensMapV2ToV1 : tokensMapV1ToV2;
  if (tokensCaptures) {
    return tokensCaptures
      .reduce(
        (acc, tokenString, index) => {
          const v2token = tokensMap[tokenString];

          if (!v2token) {
            const escapedCaptures = tokenString.match(/^\[(.+)\]$/);
            if (escapedCaptures) {
              acc.textBuffer.push(escapedCaptures[1]);
            } else {
              acc.textBuffer.push(tokenString);
            }
          }

          const endOfString = index === tokensCaptures.length - 1;
          if (acc.textBuffer.length && (v2token || endOfString)) {
            acc.formatBuffer.push(`${acc.textBuffer.join('')}`);
            acc.textBuffer = [];
          }

          if (v2token) acc.formatBuffer.push(v2token);

          return acc;
        },
        { formatBuffer: [], textBuffer: [] } as TokensBuffer
      )
      .formatBuffer.join('');
  } else {
    return format;
  }
}

/**
 * convert v1 token to v2 token
 * @params {rawToken} source token
 * @params {force} force to convert, for test
 */
export function convertTokenV2(rawToken: string, force = false) {
  if (force) {
    return convertTokens(rawToken);
  }
  try {
    return useDateFnsPolyfill ? convertTokens(rawToken) : rawToken;
  } catch (e) {
    // no injection
    return rawToken;
  }
}

/**
 * convert v2 token to v1 token
 * @params {rawToken} source token
 * @params {force} force to convert, for test
 */
export function convertTokenV1(rawToken: string, force = false) {
  if (force) {
    return convertTokens(rawToken, true);
  }
  try {
    return useDateFnsPolyfill ? convertTokens(rawToken, true) : rawToken;
  } catch (e) {
    // no injection
    return rawToken;
  }
}
