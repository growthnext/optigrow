const fs = require('fs');
const path = require('path');

console.log('🚀 Building OptiGROW Website...');

// Create directory structure
const dirs = [
  'assets',
  'assets/css',
  'assets/js',
  'assets/images',
  'assets/images/team',
  'assets/images/services',
  'assets/images/icons'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Verify HTML files exist
const htmlFiles = [
  'index.html',
  'about.html',
  'services.html',
  'how-it-works.html',
  'why-outsource.html',
  'contact.html'
];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ Found: ${file}`);
  } else {
    console.log(`⚠️ Missing: ${file}`);
  }
});

// Verify asset files
const assetFiles = [
  'assets/css/styles.css',
  'assets/js/main.js',
  'assets/js/config.js'
];

assetFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ Found: ${file}`);
  } else {
    console.log(`⚠️ Missing: ${file}`);
  }
});

console.log('\n✨ Build check complete!');
console.log('📦 To deploy:');
console.log('   - Upload all files to your hosting');
console.log('   - Ensure all images are in assets/images/');
console.log('   - Update phone numbers in assets/js/config.js');
