import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 1. High-fidelity SVG of the Cinemood Logo
// Red Rounded App icon backdrop with linear gradient, containing the centered white film strip and play button triangle.
const svgLogo = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Soft Red-Gradient for Cinematic depth -->
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff1a24" />
      <stop offset="100%" stop-color="#b5050b" />
    </linearGradient>
  </defs>
  <!-- Main Rounded Rect -->
  <rect x="0" y="0" width="512" height="512" rx="110" ry="110" fill="url(#redGrad)" />
  
  <!-- Film Strip Outer Wireframe Container -->
  <rect x="80" y="100" width="352" height="312" rx="36" ry="36" fill="none" stroke="#ffffff" stroke-width="16" />
  
  <!-- Vertical Dividers to isolate Sprocket Hole columns -->
  <line x1="150" y1="100" x2="150" y2="412" stroke="#ffffff" stroke-width="16" />
  <line x1="362" y1="100" x2="362" y2="412" stroke="#ffffff" stroke-width="16" />
  
  <!-- Left Sprocket Holes (rounded rects for high fidelity) -->
  <rect x="104" y="128" width="22" height="32" rx="6" ry="6" fill="#ffffff" />
  <rect x="104" y="184" width="22" height="32" rx="6" ry="6" fill="#ffffff" />
  <rect x="104" y="240" width="22" height="32" rx="6" ry="6" fill="#ffffff" />
  <rect x="104" y="296" width="22" height="32" rx="6" ry="6" fill="#ffffff" />
  <rect x="104" y="352" width="22" height="32" rx="6" ry="6" fill="#ffffff" />
  
  <!-- Right Sprocket Holes -->
  <rect x="386" y="128" width="22" height="32" rx="6" ry="6" fill="#ffffff" />
  <rect x="386" y="184" width="22" height="32" rx="6" ry="6" fill="#ffffff" />
  <rect x="386" y="240" width="22" height="32" rx="6" ry="6" fill="#ffffff" />
  <rect x="386" y="296" width="22" height="32" rx="6" ry="6" fill="#ffffff" />
  <rect x="386" y="352" width="22" height="32" rx="6" ry="6" fill="#ffffff" />
  
  <!-- Crisp Centered Play Button Triangle -->
  <path d="M 216 186 L 320 256 L 216 326 Z" fill="#ffffff" />
</svg>
`;

// 2. Binary Packager to generate a valid .ico file containing compressed PNG records
function createIco(pngBuffers) {
  const HEADER_SIZE = 6;
  const ENTRY_SIZE = 16;
  const numImages = pngBuffers.length;
  const buf = Buffer.alloc(HEADER_SIZE + ENTRY_SIZE * numImages);
  
  // ICO Header
  buf.writeUInt16LE(0, 0); // Reserved
  buf.writeUInt16LE(1, 2); // Type = 1 (ICO)
  buf.writeUInt16LE(numImages, 4); // Number of images in total
  
  let currentOffset = HEADER_SIZE + ENTRY_SIZE * numImages;
  const dataBuffers = [];
  
  pngBuffers.forEach((img, index) => {
    const entryOffset = HEADER_SIZE + index * ENTRY_SIZE;
    const w = img.width === 256 ? 0 : img.width;
    const h = img.width === 256 ? 0 : img.width;
    
    buf.writeUInt8(w, entryOffset); // Width of image (0-255)
    buf.writeUInt8(h, entryOffset + 1); // Height of image (0-255)
    buf.writeUInt8(0, entryOffset + 2); // Color palette size
    buf.writeUInt8(0, entryOffset + 3); // Reserved
    buf.writeUInt16LE(1, entryOffset + 4); // Color planes
    buf.writeUInt16LE(32, entryOffset + 6); // Bits per pixel
    buf.writeUInt32LE(img.data.length, entryOffset + 8); // Size of visual data
    buf.writeUInt32LE(currentOffset, entryOffset + 12); // Data file offset
    
    currentOffset += img.data.length;
    dataBuffers.push(img.data);
  });
  
  return Buffer.concat([buf, ...dataBuffers]);
}

async function run() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
  }

  const svgBuffer = Buffer.from(svgLogo);

  // Output all necessary widths to meet user expectations
  console.log('Generating high-resolution PNG icon graphics...');
  
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  console.log('✔ favicon-16x16.png generated successfully.');

  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  console.log('✔ favicon-32x32.png generated successfully.');

  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  console.log('✔ apple-touch-icon.png generated successfully.');

  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), png192);
  console.log('✔ android-chrome-192x192.png generated successfully.');

  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), png512);
  console.log('✔ android-chrome-512x512.png generated successfully.');

  // Render multi-res ICO
  console.log('Generating packed favicon.ico containing 16px and 32px versions...');
  const icoData = createIco([
    { width: 16, data: png16 },
    { width: 32, data: png32 }
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoData);
  console.log('✔ favicon.ico completed successfully.');

  // Create/overwrite site.webmanifest
  const webManifest = {
    "name": "Cinemood",
    "short_name": "Cinemood",
    "icons": [
      {
        "src": "/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "theme_color": "#e50914",
    "background_color": "#050505",
    "display": "standalone",
    "start_url": "/"
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(webManifest, null, 2));
  console.log('✔ site.webmanifest written successfully.');
}

run().catch(err => {
  console.error('Fatal favicon generation error:', err);
  process.exit(1);
});
