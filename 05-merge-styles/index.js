const path = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');

const bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

const buildBundle = async () => {
    try {
        const files = await fsPromises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
        for await (const file of files) {
            const filePath = path.join(__dirname, 'styles', file.name);
            if (file.isFile() && path.extname(file.name) === '.css') {
                fs.createReadStream(filePath).pipe(bundle);
            }
        }
    } catch (err) {
        console.log(err);
    }
};

buildBundle();