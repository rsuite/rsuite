import { describe, expect, it } from 'vitest';
import convertToFlex, {
  verticalAlignToAlignItems,
  alignToJustifyContent
} from '../utils/convertToFlex';

describe('convertToFlex', () => {
  it('Should return an empty object when no props', () => {
    expect(convertToFlex({})).to.deep.equal({});
  });

  it('Should return an empty object when both are undefined', () => {
    expect(convertToFlex({ verticalAlign: undefined, align: undefined })).to.deep.equal({});
  });

  it('Should map verticalAlign=top to alignItems=flex-start', () => {
    const styles = convertToFlex({ verticalAlign: 'top' });
    expect(styles.alignItems).to.equal('flex-start');
    expect(styles.display).to.equal('flex');
  });

  it('Should map verticalAlign=middle to alignItems=center', () => {
    const styles = convertToFlex({ verticalAlign: 'middle' });
    expect(styles.alignItems).to.equal('center');
  });

  it('Should map verticalAlign=bottom to alignItems=flex-end', () => {
    const styles = convertToFlex({ verticalAlign: 'bottom' });
    expect(styles.alignItems).to.equal('flex-end');
  });

  it('Should pass through unknown verticalAlign values', () => {
    const styles = convertToFlex({ verticalAlign: 'end' });
    expect(styles.alignItems).to.equal('end');
  });

  it('Should map align=left to justifyContent=flex-start', () => {
    const styles = convertToFlex({ align: 'left' });
    expect(styles.justifyContent).to.equal('flex-start');
    expect(styles.display).to.equal('flex');
  });

  it('Should map align=center to justifyContent=center', () => {
    const styles = convertToFlex({ align: 'center' });
    expect(styles.justifyContent).to.equal('center');
  });

  it('Should map align=right to justifyContent=flex-end', () => {
    const styles = convertToFlex({ align: 'right' });
    expect(styles.justifyContent).to.equal('flex-end');
  });

  it('Should pass through unknown align values', () => {
    const styles = convertToFlex({ align: 'start' });
    expect(styles.justifyContent).to.equal('start');
  });

  it('Should handle both verticalAlign and align', () => {
    const styles = convertToFlex({ verticalAlign: 'middle', align: 'center' });
    expect(styles.display).to.equal('flex');
    expect(styles.alignItems).to.equal('center');
    expect(styles.justifyContent).to.equal('center');
    expect(styles.flexWrap).to.equal('wrap');
  });
});

describe('verticalAlignToAlignItems', () => {
  it('Should return flex-start for top', () => {
    expect(verticalAlignToAlignItems('top')).to.equal('flex-start');
  });

  it('Should return center for middle', () => {
    expect(verticalAlignToAlignItems('middle')).to.equal('center');
  });

  it('Should return the original value for unknown input', () => {
    expect(verticalAlignToAlignItems('end')).to.equal('end');
  });
});

describe('alignToJustifyContent', () => {
  it('Should return flex-start for left', () => {
    expect(alignToJustifyContent('left')).to.equal('flex-start');
  });

  it('Should return flex-end for right', () => {
    expect(alignToJustifyContent('right')).to.equal('flex-end');
  });

  it('Should return the original value for unknown input', () => {
    expect(alignToJustifyContent('start')).to.equal('start');
  });
});
