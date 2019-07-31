import previewFile from '../previewFile';

describe('[utils] previewFile', () => {
  it('Should return base64 string', () => {
    const file = new File(['First Line Text', 'Second Line Text'], 'test');
    previewFile(file, result => {
      assert.equal(result, 'data:;base64,Rmlyc3QgTGluZSBUZXh0U2Vjb25kIExpbmUgVGV4dA==');
    });
  });
});
