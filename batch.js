const { jsonWriiter, createImageDir } = require('./syncWorker');


const tasks = async () => {
    const batchs = await require('./batch.json');

    batchs.forEach((batch) => {
        createImageDir(batch.fileName);
        console.log(`Writing ${batch.location} to ${batch.fileName}.json ......................`);
        jsonWriiter(batch.location, batch.coordinates, batch.fileName);
    })

}

tasks();