const fsPromises = require('fs/promises');
const path = require('path');

const copyDir = async () => {
    try {
        await fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
        const filesCopy = await fsPromises.readdir(path.join(__dirname, 'files-copy'));
        const files = await fsPromises.readdir(path.join(__dirname, 'files'));

        if (filesCopy) {
            for (let el of filesCopy) {
                await fsPromises.rm(path.join(__dirname, 'files-copy', el));
            }
        }
        for (let el of files) {
            await fsPromises.copyFile(path.join(__dirname, 'files', el), path.join(__dirname, 'files-copy', el))
        }
    } catch (err) {
        console.log(err);
    }
}

copyDir();

