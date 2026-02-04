const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'public', 'game-photos');

// Lire tous les fichiers du dossier
fs.readdirSync(photosDir)
  .filter(file => /\.(jpg|jpeg|png)$/i.test(file)) // Fichiers JPEG/PNG
  .sort((a, b) => {
    // Trier par numéro si possible (1.jpg, 2.jpg, etc.)
    const numA = parseInt(a.match(/\d+/)?.[0] || 0);
    const numB = parseInt(b.match(/\d+/)?.[0] || 0);
    return numA - numB;
  })
  .forEach((file, index) => {
    const inputPath = path.join(photosDir, file);
    const outputPath = path.join(photosDir, `${index + 1}.avif`);

    console.log(`Conversion: ${file} → ${index + 1}.avif`);

    sharp(inputPath)
      .avif({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        console.log(`✓ ${index + 1}.avif créé`);
        // Supprimer l'original JPEG/PNG
        fs.unlinkSync(inputPath);
        console.log(`  Fichier original supprimé: ${file}`);
      })
      .catch(err => console.error(`✗ Erreur pour ${file}:`, err.message));
  });

console.log('Conversion en cours...');
