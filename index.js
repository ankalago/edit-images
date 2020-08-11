const sharp = require('sharp');
const fs = require('fs');

const images = fs.readdirSync('./images');
const promises = [];
const startDate = new Date();

const detailImages = () => {
    console.log('*****************');
    images.forEach(image => {
        console.log(image);
    })
    console.log('*****************');
}

const getTimeConvert = (start, end) => {
    const diff = end.getTime() - start.getTime();
    return `${Math.abs(diff / 1000)} seg.`
}

detailImages()

images.forEach(image => {
    const imageBase = `./images/${image}`
    const imageResult = `./edit-images/${image}`

    promises.push(
        sharp(imageBase)
            .resize(800, 600)
            .jpeg({quality: 80})
            .toFile(imageResult)
    );
})

Promise.all(promises)
    .then(res => {
        console.log('**************');
        console.log(res);
        console.log('**************');
        console.log(`Done! ${getTimeConvert(startDate, new Date)}`);
        console.log('**************');
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
