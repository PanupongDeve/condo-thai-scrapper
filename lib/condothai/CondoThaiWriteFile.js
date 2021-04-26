

class CondoThaiWriteFile {

    createImageDir() {

    }

    jsonWriiter(batch) {
        console.log(`Writing ${batch.location} to ${batch.fileName}.json ......................`);
    }
}

module.exports = {
    CondoThaiWriteFile
}