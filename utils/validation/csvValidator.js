const csv = require('csv-parser');
const fs = require('fs');

function validateCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // Basic validation
        const valid = results.every(row => 
          row['Serial Number'] && row['Product Name'] && row['Input Image Urls']
        );
        if (valid) {
          resolve(results);
        } else {
          reject('CSV is not formatted correctly.');
        }
      });
  });
}

module.exports = validateCsv;
