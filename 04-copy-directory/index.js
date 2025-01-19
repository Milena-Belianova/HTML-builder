const path = require('path');
const { mkdir, rm, readdir, copyFile } = require('node:fs/promises');

const copyFolderPath = path.join(__dirname, 'files-copy');
const folderPath = path.join(__dirname, 'files');

async function copyDir() {
  try {
    // create folder copy
    await mkdir(copyFolderPath, { recursive: true });

    // delete files from folder copy
    const copyFiles = await readdir(copyFolderPath, {
      withFileTypes: true,
    });
    for (const file of copyFiles) {
      const copyFilePath = path.join(copyFolderPath, file.name);
      await rm(copyFilePath, { recursive: true });
    }

    // copy files
    const files = await readdir(folderPath, {
      withFileTypes: true,
    });
    for (const file of files) {
      const filePath = path.join(folderPath, file.name);
      const copyFilePath = path.join(copyFolderPath, file.name);
      await copyFile(filePath, copyFilePath);
    }

    console.log('Files successfully copied!');
  } catch (err) {
    console.log(err);
  }
}

copyDir();
