const imgur = require('imgur');

imgur.uploadFile('./photoaf.jpg')
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });