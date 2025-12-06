const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

// Just copy the images to the correct basePath location
// Since Next.js already handles _next and HTML files with basePath,
// we only need to ensure images are accessible at /ImbariWeb/images

// The images are at out/images, but should also be at out/ImbariWeb/images
const srcImages = path.join(outDir, 'images');
const destImages = path.join(outDir, 'ImbariWeb', 'images');

if (fs.existsSync(srcImages)) {
  // Create ImbariWeb directory if it doesn't exist
  const imbariWebDir = path.join(outDir, 'ImbariWeb');
  if (!fs.existsSync(imbariWebDir)) {
    fs.mkdirSync(imbariWebDir, { recursive: true });
  }

  // Copy images directory
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

  copyDir(srcImages, destImages);
  console.log('✓ Images copied to /ImbariWeb/images');
}
