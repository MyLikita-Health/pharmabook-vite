const fs = require('fs');
const path = require('path');

const walkDir = (dir, callback) => {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkDir(filepath, callback);
    } else {
      callback(filepath);
    }
  });
};

const isReactComponent = filePath => {
  if (!filePath.endsWith('.js')) return false;

  const content = fs.readFileSync(filePath, 'utf8');
  return (
    content.includes('import React') ||
    content.includes('from "react"') ||
    content.includes("from 'react'")
  );
};

const renameToJsx = filePath => {
  const newPath = filePath.replace(/\.js$/, '.jsx');
  fs.renameSync(filePath, newPath);
  console.log(`Renamed: ${filePath} → ${newPath}`);
};

// Run the script starting from src/
const SRC_DIR = path.join(__dirname, 'src');

walkDir(SRC_DIR, filePath => {
  if (isReactComponent(filePath)) {
    renameToJsx(filePath);
  }
});
