const { assert } = require('chai');
const lessc = require('less');
const palette = require('../src/styles/plugins/palette');

describe('palette', () => {
  describe('should generate primary palette light mode correctly', () => {
    const primaryPalette = {
      [50]: '#f2faff',
      [100]: '#cce9ff',
      [200]: '#a6d7ff',
      [300]: '#80c4ff',
      [400]: '#59afff',
      [500]: '#3498ff',
      [600]: '#2589f5',
      [700]: '#1675e0',
      [800]: '#0a5dc2',
      [900]: '#004299'
    };
    const primaryColor = primaryPalette[500];

    Object.entries(primaryPalette).forEach(([level, color]) => {
      it(`@H${level} should equal ${color}`, () => {
        return lessc
          .render(
            `
.bg-yellow {
  color: palette(@primary-color, ${level})
}
`,
            {
              globalVars: {
                'primary-color': primaryColor
              },
              plugins: [palette]
            }
          )
          .then(output => {
            assert.match(output.css, new RegExp(`color: ${color}`));
          });
      });
    });
  });

  describe('should generate primary palette dark mode correctly', () => {
    const primaryPalette = {
      [50]: '#f2fcff',
      [100]: '#ccf3ff',
      [200]: '#a6e9ff',
      [300]: '#80ddff',
      [400]: '#59d0ff',
      [500]: '#34c3ff',
      [600]: '#25b3f5',
      [700]: '#169de0',
      [800]: '#0a81c2',
      [900]: '#006199'
    };
    const primaryColor = primaryPalette[500];

    Object.entries(primaryPalette).forEach(([level, color]) => {
      it(`@H${level} should equal ${color}`, () => {
        return lessc
          .render(
            `
.bg-yellow {
  color: palette(@primary-color, ${level})
}
`,
            {
              globalVars: {
                'primary-color': primaryColor
              },
              plugins: [palette]
            }
          )
          .then(output => {
            assert.match(output.css, new RegExp(`color: ${color}`));
          });
      });
    });
  });

  describe('Should work with rgb() colors', () => {
    const primaryPalette = {
      [50]: '#f2faff',
      [100]: '#cce9ff',
      [200]: '#a6d7ff',
      [300]: '#80c4ff',
      [400]: '#59afff',
      [500]: '#3498ff',
      [600]: '#2589f5',
      [700]: '#1675e0',
      [800]: '#0a5dc2',
      [900]: '#004299'
    };
    const primaryColor = 'rgb(52, 152, 255)';

    Object.entries(primaryPalette).forEach(([level, color]) => {
      it(`@H${level} should equal ${color}`, () => {
        return lessc
          .render(
            `
.bg-yellow {
  color: palette(@primary-color, ${level})
}
`,
            {
              globalVars: {
                'primary-color': primaryColor
              },
              plugins: [palette]
            }
          )
          .then(output => {
            assert.match(output.css, new RegExp(`color: ${color}`));
          });
      });
    });
  });
});
