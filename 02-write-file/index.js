const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Введите текст\n');

stdin.on('data', (text) => {
    if (text.toString().trim() === 'exit') {
        stdout.write('Пока');
        process.exit();
    }
    output.write(text);
});

process.on('SIGINT', () => {
    stdout.write('Пока');
    process.exit();
});