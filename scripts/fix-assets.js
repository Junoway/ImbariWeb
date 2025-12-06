const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const basePath = 'ImbariWeb';

// Create the ImbariWeb directory structure
const imbariWebDir = path.join(outDir, basePath);
if (!fs.existsSync(imbariWebDir)) {
  fs.mkdirSync(imbariWebDir, { recursive: true });
}

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Move all contents from out/ to out/ImbariWeb/
const items = fs.readdirSync(outDir);
for (const item of items) {
  if (item === basePath) continue; // Skip the ImbariWeb directory itself
  
  const srcPath = path.join(outDir, item);
  const destPath = path.join(imbariWebDir, item);
  
  const stat = fs.statSync(srcPath);
  if (stat.isDirectory()) {
    copyDir(srcPath, destPath);
    fs.rmSync(srcPath, { recursive: true, force: true });
  } else {
    fs.copyFileSync(srcPath, destPath);
    fs.unlinkSync(srcPath);
  }
}

console.log('✓ Assets moved to', basePath, 'directory');
