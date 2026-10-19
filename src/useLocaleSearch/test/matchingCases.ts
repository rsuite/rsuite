// Expected locale and grapheme behavior; shared by all browser runtimes.
export const matchingCases = [
  {
    name: 'ASCII case',
    text: 'Alpha',
    query: 'alpha',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'ASCII miss',
    text: 'Alpha',
    query: 'beta',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'empty query',
    text: 'Alpha',
    query: '',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'empty both',
    text: '',
    query: '',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'empty text',
    text: '',
    query: 'a',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'space is literal',
    text: 'ab',
    query: ' ',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'space occurrence',
    text: 'a b',
    query: ' ',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'space against empty',
    text: '',
    query: ' ',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'canonical accents',
    text: 'Caf\u00e9',
    query: 'Cafe\u0301',
    expected: true,
    locale: 'en-GB',
    options: {
      sensitivity: 'variant'
    },
    method: 'contains'
  },
  {
    name: 'decomposed text',
    text: 'Cafe\u0301',
    query: 'Caf\u00e9',
    expected: true,
    locale: 'en-GB',
    options: {
      sensitivity: 'variant'
    },
    method: 'contains'
  },
  {
    name: 'base accents',
    text: 'Caf\u00e9',
    query: 'cafe',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'accent retained',
    text: 'Caf\u00e9',
    query: 'Cafe',
    expected: false,
    locale: 'en-GB',
    options: {
      sensitivity: 'accent'
    },
    method: 'contains'
  },
  {
    name: 'variant case retained',
    text: 'CAF\u00c9',
    query: 'caf\u00e9',
    expected: false,
    locale: 'en-GB',
    options: {
      sensitivity: 'variant'
    },
    method: 'contains'
  },
  {
    name: 'uncomposed mark base',
    text: 'q\u0301',
    query: 'q',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'uncomposed mark variant',
    text: 'q\u0301',
    query: 'q',
    expected: false,
    locale: 'en-GB',
    options: {
      sensitivity: 'variant'
    },
    method: 'contains'
  },
  {
    name: 'German expansion',
    text: 'Stra\u00dfe',
    query: 'strasse',
    expected: true,
    locale: 'de-DE',
    options: {},
    method: 'contains'
  },
  {
    name: 'German expansion inside',
    text: 'Stra\u00dfe',
    query: 'ss',
    expected: true,
    locale: 'de-DE',
    options: {},
    method: 'contains'
  },
  {
    name: 'German prefix expansion',
    text: 'Stra\u00dfe',
    query: 'strass',
    expected: true,
    locale: 'de-DE',
    options: {},
    method: 'startsWith'
  },
  {
    name: 'English ligature',
    text: 'arch\u00e6ology',
    query: 'ae',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'French ligature prefix',
    text: '\u0152uvre',
    query: 'oe',
    expected: true,
    locale: 'fr-FR',
    options: {},
    method: 'startsWith'
  },
  {
    name: 'presentation ligature',
    text: 'o\ufb03ce',
    query: 'ffi',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'Turkish dotless I',
    text: 'ISPARTA',
    query: '\u0131spa',
    expected: true,
    locale: 'tr-TR',
    options: {},
    method: 'contains'
  },
  {
    name: 'Turkish dotted mismatch',
    text: 'ISPARTA',
    query: 'ispa',
    expected: false,
    locale: 'tr-TR',
    options: {},
    method: 'contains'
  },
  {
    name: 'Turkish dotted I',
    text: '\u0130stanbul',
    query: 'istanbul',
    expected: true,
    locale: 'tr-TR',
    options: {},
    method: 'contains'
  },
  {
    name: 'Turkish dotless mismatch',
    text: '\u0130stanbul',
    query: '\u0131stanbul',
    expected: false,
    locale: 'tr-TR',
    options: {},
    method: 'contains'
  },
  {
    name: 'Swedish distinct letter',
    text: '\u00d6rebro',
    query: 'ore',
    expected: false,
    locale: 'sv-SE',
    options: {},
    method: 'contains'
  },
  {
    name: 'punctuation retained',
    text: 'co-operate',
    query: 'cooperate',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'punctuation ignored',
    text: 'co-operate',
    query: 'cooperate',
    expected: true,
    locale: 'en-GB',
    options: {
      ignorePunctuation: true
    },
    method: 'contains'
  },
  {
    name: 'ignored prefix punctuation',
    text: '---Caf\u00e9',
    query: 'cafe',
    expected: true,
    locale: 'en-GB',
    options: {
      ignorePunctuation: true
    },
    method: 'startsWith'
  },
  {
    name: 'punctuation query collates empty',
    text: 'abc',
    query: '---',
    expected: true,
    locale: 'en-GB',
    options: {
      ignorePunctuation: true
    },
    method: 'contains'
  },
  {
    name: 'punctuation query empty text',
    text: '',
    query: '---',
    expected: true,
    locale: 'en-GB',
    options: {
      ignorePunctuation: true
    },
    method: 'contains'
  },
  {
    name: 'punctuation query retained',
    text: 'abc',
    query: '---',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'supplementary character',
    text: 'a\ud83d\ude00b',
    query: '\ud83d\ude00',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'no isolated surrogate',
    text: '\ud83d\ude00',
    query: '\ud83d',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'whole family cluster',
    text: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    query: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'no partial family cluster',
    text: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    query: '\ud83d\udc69',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'contains'
  },
  {
    name: 'Chinese literal',
    text: '\u5317\u4eac\u5927\u5b66',
    query: '\u5317\u4eac',
    expected: true,
    locale: 'zh-CN',
    options: {},
    method: 'contains'
  },
  {
    name: 'Chinese miss',
    text: '\u5317\u4eac\u5927\u5b66',
    query: '\u4e0a\u6d77',
    expected: false,
    locale: 'zh-CN',
    options: {},
    method: 'contains'
  },
  {
    name: 'not an arbitrary prefix',
    text: 'Alpha beta',
    query: 'beta',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'startsWith'
  },
  {
    name: 'ASCII suffix',
    text: 'Alpha beta',
    query: 'BETA',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'prefix is not suffix',
    text: 'Alpha beta',
    query: 'Alpha',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'German expansion',
    text: 'Stra\u00dfe',
    query: 'sse',
    expected: true,
    locale: 'de-DE',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'German final expansion',
    text: 'Stra\u00df',
    query: 'ss',
    expected: true,
    locale: 'de-DE',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'German internal expansion',
    text: 'Stra\u00dfe',
    query: 'ss',
    expected: false,
    locale: 'de-DE',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'reverse expansion',
    text: 'gross',
    query: '\u00df',
    expected: true,
    locale: 'de-DE',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'ae ligature',
    text: 'arch\u00e6',
    query: 'ae',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'oe ligature',
    text: 'H\u0153',
    query: 'oe',
    expected: true,
    locale: 'fr-FR',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'presentation ligature',
    text: 'x\ufb03',
    query: 'ffi',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'Turkish dotless',
    text: 'ANKARA I',
    query: '\u0131',
    expected: true,
    locale: 'tr-TR',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'Turkish dotted mismatch',
    text: 'ANKARA I',
    query: 'i',
    expected: false,
    locale: 'tr-TR',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'Turkish dotted',
    text: 'x\u0130',
    query: 'i',
    expected: true,
    locale: 'tr-TR',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'Swedish distinct',
    text: 'x\u00f6',
    query: 'o',
    expected: false,
    locale: 'sv-SE',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'canonical accent',
    text: 'Cafe\u0301',
    query: 'f\u00e9',
    expected: true,
    locale: 'en-GB',
    options: {
      sensitivity: 'variant'
    },
    method: 'endsWith'
  },
  {
    name: 'combining base',
    text: 'xq\u0301',
    query: 'q',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'combining variant',
    text: 'xq\u0301',
    query: 'q',
    expected: false,
    locale: 'en-GB',
    options: {
      sensitivity: 'variant'
    },
    method: 'endsWith'
  },
  {
    name: 'whole family',
    text: 'x\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    query: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'partial family',
    text: 'x\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    query: '\ud83d\udc66',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'high surrogate',
    text: 'x\ud83d\ude00',
    query: '\ud83d',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'low surrogate',
    text: 'x\ud83d\ude00',
    query: '\ude00',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'whole emoji',
    text: 'x\ud83d\ude00',
    query: '\ud83d\ude00',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'Chinese suffix',
    text: '\u5317\u4eac\u5927\u5b66',
    query: '\u5927\u5b66',
    expected: true,
    locale: 'zh-CN',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'Chinese prefix',
    text: '\u5317\u4eac\u5927\u5b66',
    query: '\u5317\u4eac',
    expected: false,
    locale: 'zh-CN',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'ignored trailing punctuation',
    text: 'Caf\u00e9---',
    query: 'cafe',
    expected: true,
    locale: 'en-GB',
    options: {
      ignorePunctuation: true
    },
    method: 'endsWith'
  },
  {
    name: 'retained trailing punctuation',
    text: 'Caf\u00e9---',
    query: 'cafe',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'empty collation',
    text: 'abc',
    query: '---',
    expected: true,
    locale: 'en-GB',
    options: {
      ignorePunctuation: true
    },
    method: 'endsWith'
  },
  {
    name: 'empty collation and haystack',
    text: '',
    query: '---',
    expected: true,
    locale: 'en-GB',
    options: {
      ignorePunctuation: true
    },
    method: 'endsWith'
  },
  {
    name: 'empty both',
    text: '',
    query: '',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'empty query',
    text: 'abc',
    query: '',
    expected: true,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'empty haystack',
    text: '',
    query: 'a',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  },
  {
    name: 'long query',
    text: 'abc',
    query: 'abcd',
    expected: false,
    locale: 'en-GB',
    options: {},
    method: 'endsWith'
  }
] as const;
