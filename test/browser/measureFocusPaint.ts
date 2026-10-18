import assert from 'node:assert/strict';
import { inflateSync } from 'node:zlib';

// Playwright screenshots use non-interlaced, 8-bit RGB or RGBA PNGs.
function decodeScreenshot(buffer: Buffer) {
  assert.equal(buffer.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  let header: Buffer | undefined;
  const chunks: Buffer[] = [];
  for (let offset = 8; offset < buffer.length; ) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    if (type === 'IHDR') header = data;
    if (type === 'IDAT') chunks.push(data);
    offset += length + 12;
  }
  assert(header);
  const width = header.readUInt32BE(0);
  const height = header.readUInt32BE(4);
  assert.equal(header[8], 8);
  assert([2, 6].includes(header[9]));
  assert.equal(header[12], 0);
  const channels = header[9] === 6 ? 4 : 3;
  const stride = width * channels;
  const raw = inflateSync(Buffer.concat(chunks));
  assert.equal(raw.length, (stride + 1) * height);
  const pixels = Buffer.alloc(stride * height);
  const paeth = (left: number, above: number, diagonal: number) => {
    const prediction = left + above - diagonal;
    const distances = [left, above, diagonal].map(value => Math.abs(prediction - value));
    return distances[0] <= distances[1] && distances[0] <= distances[2]
      ? left
      : distances[1] <= distances[2]
        ? above
        : diagonal;
  };
  for (let row = 0; row < height; row++) {
    const filter = raw[row * (stride + 1)];
    assert(filter <= 4);
    for (let column = 0; column < stride; column++) {
      const index = row * stride + column;
      const left = column >= channels ? pixels[index - channels] : 0;
      const above = row ? pixels[index - stride] : 0;
      const diagonal = row && column >= channels ? pixels[index - stride - channels] : 0;
      const predictors = [
        0,
        left,
        above,
        Math.floor((left + above) / 2),
        paeth(left, above, diagonal)
      ];
      pixels[index] = (raw[row * (stride + 1) + 1 + column] + predictors[filter]) & 255;
    }
  }
  if (channels === 4) {
    for (let index = 3; index < pixels.length; index += 4) assert.equal(pixels[index], 255);
  }
  return { width, height, channels, pixels };
}

const luminance = (pixels: Buffer, offset: number) =>
  [pixels[offset], pixels[offset + 1], pixels[offset + 2]]
    .map(value => {
      const channel = value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    })
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);

export default function measureFocusPaint(before: Buffer, after: Buffer) {
  const previous = decodeScreenshot(before);
  const current = decodeScreenshot(after);
  assert.equal(previous.width, current.width);
  assert.equal(previous.height, current.height);
  let changedPixels = 0;
  for (let index = 0; index < previous.width * previous.height; index++) {
    const a = luminance(previous.pixels, index * previous.channels);
    const b = luminance(current.pixels, index * current.channels);
    if ((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 3) changedPixels++;
  }
  return { width: current.width, height: current.height, changedPixels };
}
