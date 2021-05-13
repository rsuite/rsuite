const { assert } = require('chai');
const lessc = require('less');
const calcFontColor = require('../src/styles/plugins/calcFontColor');
// calcFontColor(bg, preferred?, alternative?)

describe('calcFontColor', () => {
  it('should return readable color against given bg', () => {
    return lessc
      .render(
        `
.bg-yellow {
  color: calcFontColor(#ffeb3b)
}
`,
        {
          plugins: [calcFontColor]
        }
      )
      .then(output => {
        assert.match(output.css, /color: #575757/);
      });
  });

  it('should return darker option given a bright bg', () => {
    return lessc
      .render(
        `
.bg-yellow {
  color: calcFontColor(#ffeb3b, #585858, #fff)
}
`,
        {
          plugins: [calcFontColor]
        }
      )
      .then(output => {
        assert.match(output.css, /color: #585858/);
      });
  });

  it('should return lighter option given a dark bg', () => {
    return lessc
      .render(
        `
.bg-indigo {
  color: calcFontColor(#2575fc, #585858, #fff)
}
`,
        {
          plugins: [calcFontColor]
        }
      )
      .then(output => {
        assert.match(output.css, /color: #fff/);
      });
  });
});
