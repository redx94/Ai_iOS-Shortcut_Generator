
const fs = require('fs');
const path = require('path');

// Configuration
const HEADER = `// --------------------------------------------------------------------------
// By Developer Reece Dixon <quantascriptor@gmail.com>
// Copyright 2025 Reece Dixon
//
// This source file is licensed under the custom license available in the
// LICENSE file. This software is protected under copyright laws.
// --------------------------------------------------------------------------

`;
const EXTENSIONS = ['.js', '.ts', '.tsx', '.css'];

// Recursively process files
function addHeaderToFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}:`, err);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(directory, file);

      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error(`Error reading file ${fullPath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          addHeaderToFiles(fullPath); // Recurse into subdirectories
        } else if (EXTENSIONS.includes(path.extname(file))) {
          fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) {
              console.error(`Error reading file ${fullPath}:`, err);
              return;
            }

            // Check if the file already contains the header
            if (!data.includes('Copyright 2025 Reece Dixon')) {
              const updatedContent = HEADER + data;

              fs.writeFile(fullPath, updatedContent, 'utf8', (err) => {
                if (err) {
                  console.error(`Error writing to file ${fullPath}:`, err);
                } else {
                  console.log(`Header added to ${fullPath}`);
                }
              });
            } else {
              console.log(`Header already exists in ${fullPath}`);
            }
          });
        }
      });
    });
  });
}

// Start the process
const ROOT_DIRECTORY = path.join(__dirname, '../src');
addHeaderToFiles(ROOT_DIRECTORY);
