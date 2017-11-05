// Imports the Google Cloud client library

const fs = require('fs');
const Speech = require('@google-cloud/speech');
//const async = require('async');

var client = Speech({
 keyFilename: 'keyfilespeech.json'
});

// Instantiates a client
const speech = Speech();

// The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
const filename = 'audio.mp3';

// The encoding of the audio file, e.g. 'LINEAR16'
const encoding = 'LINEAR16';

// The sample rate of the audio file in hertz, e.g. 16000
const sampleRateHertz = 16000;

// The BCP-47 language code to use, e.g. 'en-US'
const languageCode = 'en-US';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode
};
const audio = {
  content: fs.readFileSync(filename).toString('base64')
};

const request = {
  config: config,
  audio: audio
};

// Detects speech in the audio file
speech.recognize(request)
  .then((data) => {
    const response = data[0];
    const transcription = response.results.map(result =>
        result.alternatives[0].transcript).join('\n');
    console.log(`Transcription: `, transcription);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
