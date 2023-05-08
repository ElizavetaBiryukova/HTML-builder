const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

const { stdout } = process;

const directory = path.join(__dirname, 'secret-folder');

fsPromises
    .readdir(directory, { withFileTypes: true })
    .then(res => res.forEach((el) => {
        if (el.isFile()) {
            const file = path.join(__dirname, 'secret-folder', el['name']);
            const fileName = (path.parse(file))['name'];
            const fileExtname = (path.parse(file))['ext'].slice(1);
            fs.stat(file, (err, stats) => {
                if (!err) {
                    string = fileName + ' - ' + fileExtname + ' - ' + (stats.size / 1024).toString() + 'kB\n';
                }
                stdout.write(string);
            });
        }
    })
    )
    .catch((err) => console.error(err));


