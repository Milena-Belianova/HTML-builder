const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

let textFile = path.join(__dirname, 'text.txt');

const output = fs.createWriteStream(textFile);

stdout.write('Hi buddy! Can you write me something? \n');

stdin.on('data', (data) => {
  const dataString = data.toString().trim();
  if (dataString === 'exit') {
    stdout.write('Good luck learning Node.js!');
    process.exit();
  }
  output.write(data);
});

process.on('SIGINT', () => {
  stdout.write('\nGood luck learning Node.js!');
  process.exit(0);
});
