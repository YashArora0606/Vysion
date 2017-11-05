const download = require('image-downloader')
const fs = require('fs');
const imgurUploader = require('imgur-uploader');
const imgur = require('imgur');

const options = {
  url: 'http://192.168.8.210:8080/photoaf.jpg',
  dest: './'
}

async function downloadIMG() {
  try {
    const {filename, image} = await download.image(options)
    console.log(filename);
  } catch (e) {
    throw e
  }
}

downloadIMG().then(() => {
  const Vision = require('@google-cloud/vision');
  const vision = new Vision({keyFilename: 'keyfile.json'});

  const fileName = './photoaf.jpg';
  const request = {
    source: {
      filename: fileName
    }
  };
  //
  // vision.labelDetection(request).then((results) => {
  //   const labels = results[0].labelAnnotations;
  //
  //   // console.log('Labels:');
  //   console.log(labels[0].description);
  //   // labels.forEach((label) => console.log(label.description));
  // }).catch((err) => {
  //   console.error('ERROR:', err);
  // });

  vision.textDetection(request).then((results) => {
    const texts = results[0].textAnnotations;
    if (!(texts === undefined || texts.length == 0)) {
      console.log('Texts:');
      console.log(texts[0].description);
    }
  }).catch((err) => {
    console.error('ERROR:', err);
  });
  let imgurFile = '';
  imgur.uploadFile('./photoaf.jpg').then(function(json) {
    console.log(json.data.link);
    imgurFile = (json.data.link);
    console.log(json.data.link);
    const Clarifai = require('clarifai');
    const app = new Clarifai.App({apiKey: 'afd620b731974caebd9bd1bfec05a93a'});
    app.models.predict(Clarifai.GENERAL_MODEL, imgurFile).then(function(response) {
      console.log(response.outputs[0].data.concepts[0].name);
    });
    // console.log(response.outputs[0].data[0]);
  }).catch(function(err) {
    console.error(err.message);
  });

  // imgurUploader(fs.readFileSync('./photoaf.jpg')).then(data => {
  //   imgurFile = (data.link);
  //   console.log(data.link);
  //   const Clarifai = require('clarifai');
  //   const app = new Clarifai.App({apiKey: 'afd620b731974caebd9bd1bfec05a93a'});
  //   app.models.predict(Clarifai.GENERAL_MODEL, imgurFile).then(function(response) {
  //     console.log(response.outputs[0].data.concepts[0].name);
  //     // console.log(response.outputs[0].data[0]);
  //   }, function(err) {
  //     console.log(err)
  //   });
  // });
});
