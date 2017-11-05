const express = require("express");
const app = express();
const async = require('async')
const bodyParser = require("body-parser");
const download = require('image-downloader')
const fs = require('fs');
const imgurUploader = require('imgur-uploader');
const imgur = require('imgur');
const methodOverride = require("method-override")
const Clarifai = require('clarifai');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const options = {
  url: 'http://192.168.8.210:8080/photoaf.jpg',
  dest: './'
}
const analyzeImage = () => {

  let data = [];

  async function downloadIMG() {
    const {filename, image} = await download.image(options)
    console.log(filename);
    return image;
  }

  return downloadIMG().then(() => {
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

    return vision.textDetection(request);
  }).then((results) => {
    const texts = results[0].textAnnotations;
    if (!(texts === undefined || texts.length == 0)) {
      console.log('Texts:');
      console.log(texts[0].description);
      data[0] = (texts[0].description.replace(/\n|\r/g, " "));
    }
    let imgurFile = '';
    // imgur.uploadFile('./photoaf.jpg').then(function(json) {
    //   imgurFile = (json.data.link);
    //   console.log(json.data.link);
    //   const Clarifai = require('clarifai');
    //   const clarapp = new Clarifai.App({apiKey: 'b5d3e6a849c0445e9bb7bfa0474a1eb9'});
    //   clarapp.models.predict(Clarifai.GENERAL_MODEL, imgurFile).then(function(response) {
    //     console.log(response.outputs[0].data.concepts[0].name);
    //     data.push(response.outputs[0].data.concepts[0].name);
    //   });
    //   // console.log(response.outputs[0].data[0]);
    // }).catch(function(err) {
    //   console.error(err.message);
    // });
    return imgurUploader(fs.readFileSync('./photoaf.jpg'));
  }).then(data => {
    imgurFile = (data.link);
    console.log(data.link);
    const clarapp = new Clarifai.App({apiKey: 'b5d3e6a849c0445e9bb7bfa0474a1eb9'});
    return clarapp.models.predict(Clarifai.GENERAL_MODEL, imgurFile);
  }).then(function(response) {
    console.log(response.outputs[0].data.concepts[0].name);
    data[1] = (response.outputs[0].data.concepts[0].name.replace(/\n|\r/g, " "));
    // console.log(response.outputs[0].data[0]);
    return data;
  });
}
app.get('/', (req, res) => res.render('index'));

app.get('/analyzeImage', function(req, res) {
  analyzeImage().then(results => {
    if (!results)
      res.send('ERROR');
    else
      res.render('analysis', {data: results});
    });
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});
