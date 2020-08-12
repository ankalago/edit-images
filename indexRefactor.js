const sharp = require('sharp');
const fs = require('fs');
const {config} = require('./config')

const images = fs.readdirSync('./images');
const promises = [];
const startDate = new Date();

const getTimeResultConvert = (start, end) => {
    const diff = end.getTime() - start.getTime();
    console.log(`Done! ${Math.abs(diff / 1000)} seg.`)
}

const buildPath = (image, base = true) => base ? `./${config.baseFolderImage}/${image}` : `./${config.editFolderImage}/${image}`

const promisesFunctional = images.map(image => promises.push(sharp(buildPath(image)).resize(config.width, config.height).jpeg({quality: config.quality}).toFile(buildPath(image, false))))

Promise.all(promisesFunctional).then(res => {
    getTimeResultConvert(startDate, new Date)
})
    .catch(err => {
        console.error("Error processing files, let's clean it up", err);
        try {
            images.forEach(image => {
                fs.unlinkSync(`./edit-images/${image}`);
            })
        } catch (e) {
            console.error(e);
        }
    });
