const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const MAX_WIDTH = 800;
const WEBP_QUALITY = 80;

async function optimizeImages() {
  const files = fs.readdirSync(IMAGES_DIR);
  const eligible = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  for (const file of eligible) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputName = path.parse(file).name + '.webp';
    const outputPath = path.join(IMAGES_DIR, outputName);

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = Math.round((1 - outputSize / inputSize) * 100);
    console.log(
      `${file} → ${outputName}: ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB (${savings}% smaller)`
    );
  }

  console.log(`\nDone. ${eligible.length} images converted.`);
}

optimizeImages().catch(console.error);
