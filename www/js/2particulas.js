//$(window).load(function(){

// Create an array to store our particles
var particles = [];



// The maximum velocity in each direction
var maxVelocity = 10;

// The target frames per second (how often do we want to update / redraw the scene)
var targetFPS = 33;

var canvasWidth = 0;
var canvasHeight = 0;



function updateBounds(){
    canvasHeight = $(window).height();
    canvasWidth = $(window).width();

    $('#canvas').attr("height", $(window).height());
    $('#canvas').attr("width", $(window).width());
   
}
$(window).resize(updateBounds);
updateBounds();



// The amount of particles to render
 var particleCount = canvasWidth/13;
//var particleCount = 50; 
// Create an image object (only need one instance)
var imageObj = new Image();




//console.log("Particulas :" + particleCount);

var contador = 0;

var promedio = particleCount*0.9;


// Once the image has been downloaded then set the image on all of the particles
imageObj.onload = function() {
    particles.forEach(function(particle) {
            particle.setImage(imageObj);
    });
};

// Once the callback is arranged then set the source of the image
imageObj.src = "img/sprite2.png";

// A function to create a particle object.
function Particle(context) {

    // Set the initial x and y positions
    this.x = 0;
    this.y = 0;



    // Set the initial velocity
    //this.xVelocity = 0;
    this.yVelocity = -1;

    // Set the radius
    this.radius = 5;

    // Store the context which will be used to draw the particle
    this.context = context;

    // The function to draw the particle on the canvas.
    this.draw = function() {
        
       if(!this.vive) {

            return;

        }
        
        
        if(this.image){
            this.context.drawImage(this.image, this.x-128, this.y-128);         
            // If the image is being rendered do not draw the circle so break out of the draw function                
            return;
        
        // Draw the circle as before, with the addition of using the position and the radius from this object.
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = "rgba(0, 255, 255, 1)";
        this.context.fill();
        this.context.closePath();

        }

        
    };

    // Update the particle.
    this.update = function() {
       
    /* if (this.x >= canvasWidth) {
            this.xVelocity = -this.xVelocity;
            this.yVelocity = this.yVelocity+8;
        }
        // Check if has crossed the left edge
        else if (this.x <= 0) {
            this.xVelocity = -this.xVelocity;
           this.yVelocity = this.yVelocity+8;

          }

        // Check if has crossed the bottom edge
        if (this.y >= canvasHeight) {
            this.yVelocity = -this.yVelocity;
        }
        
        // Check if has crossed the top edge
        else if (this.y <= 0 & !open) {
            //this.yVelocity = -this.yVelocity;
            this.y = canvasHeight;
        }*/
 
         if (this.y <= 0) {
            this.y = canvasHeight+2;
        }

    if(open) {  // Si el micrófono esta abierto
        
        if (this.vive) { 

               if (this.y >= canvasHeight ) {  // Si la particula vive y pasa el borde superior

                        contador= contador+ 1;   // Cuenta la partícula que salió


                  

                        this.vive = false;

                        return;

                }

                else if (fuerza > 2) {

                this.y += 15;
                console.log("si");

                 }


        }  

      
    }



          this.y -= 2;




    if( contador >= promedio ) { // Si mas del 90% de las partículas salieron de pantalla se da un punto y ejecuta la función

        contador = 0;
       // ganaste = true; 
        ganar();
        return;

        


       
    } 

   /* console.log("Reboot " + reboot);

    console.log("Contador " + contador);

    console.log("Ganaste " + ganaste);*/









   };

 

     

       

    // A function to set the position of the particle.
    this.setPosition = function(x, y) {


       this.x = x;
        this.y = y;



      
    };

    
    // Function to set the velocity.
  /*  this.setVelocity = function(x, y) {
        this.xVelocity = x;
        this.yVelocity = y;
    };
    */
    this.setImage = function(image){
        this.image = image;
    };
}

  


function generateRandom(min, max){
    return Math.random() * (max - min) + min;
}

// The canvas context if it is defined.
var context;

// Initialise the scene and set the context if possible
function init() {

    var canvas = document.getElementById('canvas');


    if (canvas.getContext) {

        context = canvas.getContext('2d');

   
        // Create the particles and set their initial positions and velocities
        for(var i=0; i < particleCount; ++i){
            var particle = new Particle(context);

             particle.vive = true;
            // Set the position to be inside the canvas bounds
            particle.setPosition(generateRandom(0, canvasWidth),  generateRandom(canvasHeight, canvasHeight+400));
            
            // Set the initial velocity to be either random and either negative or positive
           // particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));

            particles.push(particle);            
        }
    }
    else {
        alert("Please use a modern browser");
    }
}

// The function to draw the scene
function draw() {
    // Clear the drawing surface and fill it with a black background
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);


    particles.forEach(function(particle) {

        particle.draw();
    });
     



}

// Update the scene
function update() {



    particles.forEach(function(particle) {

        particle.update();

    });




}







// Initialize the scene
init();

//reInit();

function reInit() {

if(reboot) {
reboot = false;

console.log("reiniciando");

particles.forEach(function(particle) {

        particle.vive=true;
         particle.setPosition(generateRandom(0, canvasWidth),  generateRandom(canvasHeight, canvasHeight+400));
    });

contador = 0;

}

return;


}




// If the context is set then we can draw the scene (if not then the browser does not support canvas)
if (context) {
    setInterval(function() {
        // Update the scene befoe drawing
        update();

        // Draw the scene
        draw();
    }, 1000 / targetFPS);
}




//});



