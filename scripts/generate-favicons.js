import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// High-fidelity SVG of the Cinemood Logo with balanced dimensions and coordinates
const svgLogo = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient for the 3D button body -->
    <linearGradient id="redBase" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff1a25" />
      <stop offset="12%" stop-color="#df050d" />
      <stop offset="65%" stop-color="#b00207" />
      <stop offset="100%" stop-color="#690002" />
    </linearGradient>
    
    <!-- Outer rim bevel highlight -->
    <linearGradient id="outerBevel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff525b" />
      <stop offset="100%" stop-color="#2a0001" />
    </linearGradient>

    <!-- Glass gloss gradient -->
    <linearGradient id="glossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.38" />
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.0" />
    </linearGradient>

    <!-- Recessed theater screen gradient -->
    <linearGradient id="screenBase" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#b80006" />
      <stop offset="100%" stop-color="#4e0002" />
    </linearGradient>
  </defs>
  
  <!-- Outer Bevel Frame (creating a beautiful 3D border) -->
  <rect x="20" y="76" width="472" height="360" rx="98" fill="url(#outerBevel)" />
  
  <!-- Main Red Button Body -->
  <rect x="24" y="80" width="464" height="352" rx="94" fill="url(#redBase)" />
  
  <!-- Film Strip solid white background structure -->
  <rect x="86" y="136" width="340" height="240" rx="32" fill="#ffffff" />
  
  <!-- Dark cinematic screen overlay in the center -->
  <rect x="166" y="154" width="180" height="204" rx="16" fill="url(#screenBase)" />
  
  <!-- Left Sprocket Holes: 5 mathematically aligned vertical rounded rects -->
  <rect x="117" y="155" width="18" height="28" rx="4" fill="url(#redBase)" />
  <rect x="117" y="199" width="18" height="28" rx="4" fill="url(#redBase)" />
  <rect x="117" y="243" width="18" height="28" rx="4" fill="url(#redBase)" />
  <rect x="117" y="287" width="18" height="28" rx="4" fill="url(#redBase)" />
  <rect x="117" y="331" width="18" height="28" rx="4" fill="url(#redBase)" />
  
  <!-- Right Sprocket Holes: 5 mathematically aligned vertical rounded rects -->
  <rect x="377" y="155" width="18" height="28" rx="4" fill="url(#redBase)" />
  <rect x="377" y="199" width="18" height="28" rx="4" fill="url(#redBase)" />
  <rect x="377" y="243" width="18" height="28" rx="4" fill="url(#redBase)" />
  <rect x="377" y="287" width="18" height="28" rx="4" fill="url(#redBase)" />
  <rect x="377" y="331" width="18" height="28" rx="4" fill="url(#redBase)" />
  
  <!-- Centered Play Button (crisp triangle pointing right) -->
  <polygon points="228,212 298,256 228,300" fill="#ffffff" />

  <!-- Glass Gloss Overlay -->
  <path d="M 24,174 C 24,122 66,80 118,80 L 394,80 C 446,80 488,122 488,174 L 488,216 C 362,250 150,250 24,216 Z" fill="url(#glossGrad)" />
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
