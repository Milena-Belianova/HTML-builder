const fs = require('fs');
const path = require('path');
const { readdir, writeFile, appendFile } = require('fs/promises');

const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function createBundle() {
  try {
    await writeFile(bundleFilePath, '');
    const files = await readdir(stylesFolderPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(stylesFolderPath, file.name);
      const filePathObj = path.parse(filePath);

      if (file.isFile() && filePathObj.ext === '.css') {
        let data = '';
        const readableStream = fs.createReadStream(filePath, 'utf-8');
        readableStream.on('data', (chunk) => (data += chunk));
        readableStream.on('end', () => {
          appendFile(bundleFilePath, data + '\n');
        });
      }
    }
    console.log('bundle.css successfully created!');
  } catch (err) {
    console.error(err);
  }
}

createBundle();
