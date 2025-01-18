const path = require('path');
const { readdir, stat } = require('fs/promises');

const folderPath = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    const files = await readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        // dirent.isFile()
        const filePath = path.join(folderPath, file.name);
        const filePathObj = path.parse(filePath);
        const fileExt = filePathObj.ext.slice(1);
        const fileSizeKb = (await stat(filePath)).size / 1024; // bytes->KB
        const resStr = `${filePathObj.name} - ${fileExt} - ${fileSizeKb}kb`;
        console.log(resStr);
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
