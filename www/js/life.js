/ Create an array to store our particles
var particles = [];

// The amount of particles to render
var particleCount = 199;

// The maximum velocity in each direction
var maxVelocity = 4;

// The target frames per second (how often do we want to update / redraw the scene)
var targetFPS = 33;

// Set the dimensions of the canvas as variables so they can be used.
var canvasWidth;
var canvasHeight;
function updateBounds(){
    canvasHeight = $(window).height();
    canvasWidth = $(window).width();

    $('#myCanvas').attr("height", $(window).height());
    $('#myCanvas').attr("width", $(window).width());
    
}
$(window).resize(updateBounds);
updateBounds();

var arcOptim = 2 * Math.PI;

// A function to create a particle object.
function Particle(context) {

    // Set the initial x and y positions
    this.x = 0;
    this.y = 0;

    // Set the initial velocity
    this.xVelocity = 0;
    this.yVelocity = 0;

    // Set the radius
    this.radius = 20;

    // Store the context which will be used to draw the particle
    this.context = context;
    
    // The function to draw the particle on the canvas.
    this.draw = function() {
        if(!this.isAlive){
            return;
        }
        
        var multiplier = (this.lifeRemaining / 100);
        var size = this.radius * multiplier ;
                
        // Draw the circle as before, with the addition of using the position and the radius from this object.
        this.context.beginPath();
        this.context.arc(this.x, this.y, size, 0, arcOptim, false);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    };

    // Update the particle.
    this.update = function() {
        
        --this.lifeRemaining;
        if(this.lifeRemaining<=0){
            this.isAlive = false;
        }
        
        if(!this.isAlive){
            this.init();
            return;
        }
        
        // Update the position of the particle with the addition of the velocity.
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // Check if has crossed the right edge
        if (this.x >= canvasWidth) {
            this.xVelocity = -this.xVelocity;
            this.x = canvasWidth;
        }
        // Check if has crossed the left edge
        else if (this.x <= 0) {
            this.xVelocity = -this.xVelocity;
            this.x = 0;
        }

        // Check if has crossed the bottom edge
        if (this.y >= canvasHeight) {
            this.yVelocity = -this.yVelocity;
            this.y = canvasHeight;
        }
        
        // Check if has crossed the top edge
        else if (this.y <= 0) {
            this.yVelocity = -this.yVelocity;
            this.y = 0;
        }
    };

    // A function to set the position of the particle.
    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    // Function to set the velocity.
    this.setVelocity = function(x, y) {
        this.xVelocity = x;
        this.yVelocity = y;
    };
    
    this.init = function(){
        
        this.color = "rgba(" + Math.floor(generateRandom(0, 255))+ ", " + Math.floor(generateRandom(0, 255))+ ", " + Math.floor(generateRandom(0, 255)) + ", 0.6)"
        
        this.isAlive = true;
        
             // Set the position to be inside the canvas bounds
            this.setPosition(canvasWidth / 2, canvasHeight / 2);
            
            // Set the initial velocity to be either random and either negative or positive
            this.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));  

this.totalLife = generateRandom(20, 120);
        this.lifeRemaining = this.totalLife;
    }  
}

// A function to generate a random number between 2 values
function generateRandom(min, max){
    return Math.random() * (max - min) + min;
}

// The canvas context if it is defined.
var context;

// Initialise the scene and set the context if possible
function init() {
    var canvas = document.getElementById('myCanvas');
    if (canvas.getContext) {

        // Set the context variable so it can be re-used
        context = canvas.getContext('2d');

        // Create the particles and set their initial positions and velocities
        for(var i=0; i < particleCount; ++i){
            var particle = new Particle(context);
            
            particle.init();
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
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Go through all of the particles and draw them.
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

// If the context is set then we can draw the scene (if not then the browser does not support canvas)
if (context) {
    setInterval(function() {
        // Update the scene befoe drawing
        update();

        // Draw the scene
        draw();
    }, 1000 / targetFPS);
}