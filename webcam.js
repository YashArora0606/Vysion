//Available in nodejs 
 
var NodeWebcam = require( "node-webcam" );
 
 
//Default options 
 
var opts = {
 
    //Picture related 
 
    width: 1280,
 
    height: 720,
 
    quality: 100,
 
 
    //Delay to take shot 
 
    delay: 0,
 
 
    //Save shots in memory 
 
    saveShots: true,
 
 
    // [jpeg, png] support varies 
    // Webcam.OutputTypes 
 
    output: "jpeg",
 
 
    //Which camera to use 
    //Use Webcam.list() for results 
    //false for default device 
 
    device: false,
 
 
    // [location, buffer, base64] 
    // Webcam.CallbackReturnTypes 
 
    callbackReturn: "location",
 
 
    //Logging 
 
    verbose: false
 
};
 
 
//Creates webcam instance 
 
var Webcam = NodeWebcam.create( opts );
 
 
//Will automatically append location output type 
 
Webcam.capture( "photo", function( err, data ) {} );
 
 
//Also available for quick use 
 
NodeWebcam.capture( "photo", opts, function( err, data ) {
 
});
 
 
//Get list of cameras 
 
Webcam.list( function( list ) {
 
    //Use another device 
 
    var anotherCam = NodeWebcam.create( { device: list[ 0 ] } );
 
});
 
//Return type with base 64 image 
 
var opts = {
    callbackReturn: "base64"
};
 
NodeWebcam.capture( "photo", opts, function( err, data ) {
 
    var image = "<img src='" + data + "'>";
 
});