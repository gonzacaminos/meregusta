

// CAPTURA DE AUDIO 

var audioContext = null;
var meter = null;

var rafID = null;


$(window).load(function(){

 
    
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = 
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia({audio:true}, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }



});

function didntGetStream() {
    alert('No se pudo obtener el audio');
}

function gotStream(stream) {
    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // kick off the visual updating
   micInput();



}

function micInput( time ) {

    // check if we're currently clipping
    if (meter.checkClipping()) {

       if(meter.volume > 0.1 ) {   // Significa que hay un input directo, no es ruido

        open = true;

        tiempo+=1;

        fuerza +=80;


        fuerza = fuerza + tiempo;



        }

        else {

            tiempo = 0; 

           if (tiempo>80) {

                open= false;
                
            } 

        }


        }

    else {
        
        open = false;

        fuerza=0;
        tiempo=0;


        }

   


    // set up the next visual callback
     rafID = window.requestAnimationFrame( micInput );
}


// FIN CAPTURA DE AUDIO 




