import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// High-fidelity SVG of the Cinemood Logo with balanced dimensions and coordinates
const svgLogo = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Premium Cinemood Red gradient matching original brand styling -->
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E50914" />
      <stop offset="100%" stop-color="#9C050B" />
    </linearGradient>
  </defs>
  
  <!-- Main Rounded Rect (the glossy/vibrant base wrapper) with circular/squircle rounding -->
  <rect x="16" y="16" width="480" height="480" rx="120" fill="url(#redGrad)" />
  
  <!-- Film Strip solid white background structure -->
  <rect x="80" y="110" width="352" height="292" rx="40" fill="#ffffff" />
  
  <!-- Dark cinematic screen overlay in the center defining the theater display -->
  <rect x="160" y="130" width="192" height="252" rx="16" fill="url(#redGrad)" />
  
  <!-- Left Sprocket Holes: 5 mathematically aligned horizontally-oriented red holes -->
  <rect x="104" y="150" width="32" height="20" rx="6" fill="url(#redGrad)" />
  <rect x="104" y="198" width="32" height="20" rx="6" fill="url(#redGrad)" />
  <rect x="104" y="246" width="32" height="20" rx="6" fill="url(#redGrad)" />
  <rect x="104" y="294" width="32" height="20" rx="6" fill="url(#redGrad)" />
  <rect x="104" y="342" width="32" height="20" rx="6" fill="url(#redGrad)" />
  
  <!-- Right Sprocket Holes: 5 mathematically aligned horizontal red holes -->
  <rect x="376" y="150" width="32" height="20" rx="6" fill="url(#redGrad)" />
  <rect x="376" y="198" width="32" height="20" rx="6" fill="url(#redGrad)" />
  <rect x="376" y="246" width="32" height="20" rx="6" fill="url(#redGrad)" />
  <rect x="376" y="294" width="32" height="20" rx="6" fill="url(#redGrad)" />
  <rect x="376" y="342" width="32" height="20" rx="6" fill="url(#redGrad)" />
  
  <!-- Centered Play Button (crisp equilateral triangle pointing right) -->
  <polygon points="224,196 312,256 224,316" fill="#ffffff" />
</svg>
`;

// Helper: Binary Packager to generate a valid .ico file containing compressed PNG headers and data
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

  console.log('Generating high-resolution PNG icon graphics from the high-fidelity vector source...');
  
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

  console.log('Generating packed favicon.ico containing 16px and 32px versions...');
  const icoData = createIco([
    { width: 16, data: png16 },
    { width: 32, data: png32 }
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoData);
  console.log('✔ favicon.ico completed successfully.');

  // Create site.webmanifest
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
