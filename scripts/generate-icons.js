const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAllIcons() {
  console.log('Generating icons from public/logo/seren-lanka-travels.png or public/icon.png...');

  const sourceIcon = 'public/icon.png';
  if (!fs.existsSync(sourceIcon)) {
    throw new Error('Source icon not found: ' + sourceIcon);
  }

  // 1. Generate resized PNGs with safe circular padding (84% inner size)
  const sizes = [48, 96, 144, 192, 256, 512];
  const pngBuffers = {};

  for (const s of sizes) {
    const innerSize = Math.round(s * 0.84);
    const innerBuf = await sharp(sourceIcon)
      .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const canvas = await sharp({
      create: {
        width: s,
        height: s,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite([{ input: innerBuf, gravity: 'center' }])
    .png()
    .toBuffer();

    pngBuffers[s] = canvas;
    const dest = path.join('public', `icon-${s}x${s}.png`);
    fs.writeFileSync(dest, canvas);
    console.log(`Created ${dest} (${canvas.length} bytes)`);
  }

  // Also 16 and 32 for favicon.ico
  for (const s of [16, 32]) {
    const innerSize = Math.max(12, Math.round(s * 0.84));
    const innerBuf = await sharp(sourceIcon)
      .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const canvas = await sharp({
      create: {
        width: s,
        height: s,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite([{ input: innerBuf, gravity: 'center' }])
    .png()
    .toBuffer();

    pngBuffers[s] = canvas;
  }

  // 2. Apple Touch Icon (180x180) with clean solid white background & elegant padding
  const appleInner = await sharp(sourceIcon)
    .resize(130, 130, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();

  const appleCanvas = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([{ input: appleInner, gravity: 'center' }])
  .png()
  .toBuffer();

  fs.writeFileSync('public/apple-icon.png', appleCanvas);
  fs.writeFileSync('src/app/apple-icon.png', appleCanvas);
  console.log('Created apple-icon.png');

  // 3. Multi-resolution ICO: 16, 32, 48, 96, 192, 256
  const icoSizes = [16, 32, 48, 96, 192, 256];
  const numImages = icoSizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type ICO
  header.writeUInt16LE(numImages, 4); // count

  const dirSize = numImages * 16;
  let currentOffset = 6 + dirSize;
  const entries = [];

  for (const s of icoSizes) {
    const buf = pngBuffers[s];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(s === 256 ? 0 : s, 0);
    entry.writeUInt8(s === 256 ? 0 : s, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(currentOffset, 12);
    entries.push(entry);
    currentOffset += buf.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...entries,
    ...icoSizes.map(s => pngBuffers[s])
  ]);

  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  console.log(`Created multi-size favicon.ico in public/ and src/app/ (${icoBuffer.length} bytes)`);

  // 4. Update public/icon.png to 512x512 and src/app/icon.png to 192x192 (Google multiple of 48)
  fs.writeFileSync('public/icon.png', pngBuffers[512]);
  fs.writeFileSync('src/app/icon.png', pngBuffers[192]);
  console.log('Updated public/icon.png and src/app/icon.png');
}

generateAllIcons().catch(console.error);
