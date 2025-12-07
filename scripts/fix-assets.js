const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'out', 'images');
const targetDir = path.join(__dirname, '..', 'out', 'ImbariWeb', 'images');

// Copy images to basePath location
if (fs.existsSync(sourceDir)) {
  fs.mkdirSync(path.dirname(targetDir), { recursive: true });
  fs.cpSync(sourceDir, targetDir, { recursive: true });
  console.log('✓ Images copied to /ImbariWeb/images');
} else {
  console.log('⚠ Source images directory not found:', sourceDir);
}
