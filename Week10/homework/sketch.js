// GLOBAL VARIABLES

//width and height of the canvas
var w=550;
var h=400;

//arrays that hold the Star and Phos objects (phota is plural of phos)
var starfield=[];
var phota=[];

//holds the 3 pairs of points (x,y) of the triangle
var triVector = [];

//DOM based parameters

//size of the triangle "prism" 10 through h/2
var t = 50;

//1-10
var speed = 7;

//1-100
var dustsize = 5;

//color or grey mode
var greyscale = false;

//50 - 1000
var numStars = 200;

//fixed particle flow or free flowing
var conform = false;

//clear canvas on enter frame
clearCanvas = true;



// CLASSES

//Star class used to create the star field background
function Star() {
  //randomly size and place the star in the canvas
  this.x = random(0,w);
  this.y = random(0,h);
  this.size = random(.3,2);
  
  //called every frame, gives the star a flickering effect
  this.flicker = function(){
    fill(255);
    ellipse(this.x,this.y,this.size+random(0,.7),this.size+random(0,.7));
  }
}

//Light class used to create the particle system
//Fun fact: Phos (φῶς) is the Greek word for light, root word of photography
function Phos() {
  //x,y coordinates where particle is born
  //fixed to center of left canvas edge
    //this.x = 0;this.y = h/2 + 60;
    
  //follows the mouse vertically along the left edge if mouse is inside canvas
  this.mousey;
  if(mouseY>=0 && mouseY<=h){
    mousey = mouseY;
  }
  else if(mouseY>=h){
    mousey = h;
  }
  else if(mouseY<=0){
    mousey = 0;
  }
  this.x = 0;
  //this.y = mousey;
  this.y = phosSlider.value();

  
  //width & height of particle are the same resulting in a circle
  this.size = dustsize;
  
  //all particles starts as white light with the same angle
  this.colour = 255;
  
  //directs all particles to the center of the screen, where the wall stands
  this.angle = atan2(this.y-height/2, 0-width/2) + 180;
  
  //UPDATED: random float defines particle color and spread after refraction instead of paired arrays
    //color rangge is 300 out of 360 to stop at violet instead of having red twice
    this.destiny = random(0,300);
  
  //particle speed
  this.speed = speed;
  
  if(conform){
    //default particle x & y velocity calculated from angle and speed
    this.xv = cos(this.angle)*this.speed;
    this.yv = sin(this.angle)*this.speed;
  }else{
    //add random jiggle to x & y velocity for less uniform animation
    this.xv = cos(this.angle)*this.speed + random(-(this.speed/100),this.speed/100);
    this.yv = sin(this.angle)*this.speed + random(-(this.speed/100),this.speed/100);
  }
  
//console.log(this.yv);

  //refraction, shifts the angular velocity of the particle to match the color
  //particle color and angle use the same scale (0-300) that destiny variable randomly selects
  //the spread factors in speed and distributes particles 50% on each side of previous angle
  this.yv2 = this.yv + (this.speed/5 - (this.destiny/300)*((this.speed/5)*2));
  
  //canvas has 3 regions along the x-axis, the stages of particle life
  this.region = 0;
  
}

//life method is called every frame. calculates and animates particle 
Phos.prototype = {
  constructor : Phos,
  life : function(){
    
    //check which region of canvas particle is in
      //default is 0, from particle birth until first collision with triangle
      //1 while particle is inside the prism
      //2 from particle exiting the prism until death
    if(this.region == 0 && collidePointPoly(this.x,this.y,triVector)){
      this.region = 1;
    }
    else if(this.region == 1 && !collidePointPoly(this.x,this.y,triVector)){
      this.region = 2;
    }
    
    //update particle based on life stage
    //add color to particle & position it with color-specific y velocity
    if(this.region == 2){
      //check greyscale mode 
      if(!greyscale){
        fill(this.destiny, 100,100,1);
      }else{
        fill(32+(64*(this.destiny/300))); 
      }
      
      this.y -= this.yv2;
      //this.y += this.yv
      this.x += this.xv;
    }
    //add color to particle & slightly position it with 10% of color-specific y velocity
    else if(this.region == 1){
      //check greyscale mode 
      if(!greyscale){
        fill(this.destiny, 100,100,1);
      }else{
        fill(32+(64*(this.destiny/300))); 
      }
      this.y -= this.yv2/10;
      //this.y += this.yv;
      this.x += this.xv;
    }
    else{
      //position particle with default color and velocity
      fill(this.colour);
      this.y += this.yv;
      this.x += this.xv;
    }

    //draw light particle to the canvas
    ellipse(this.x,this.y,this.size,this.size);

  }
};



// SETUP ONCE ON INIT & DRAW EVERY FRAME

function setup() {
  
  //Draw triangle in the center of the canvas, t refers to triangle size
  //triangle(w/2, h/2-t, w/2+t, h/2+t, w/2-t, h/2+t);
  //console.log((w/2) + ", " + (h/2-t) + ", " + (w/2+t) + ", " + (h/2+t) + ", " + (w/2-t) + ", " + (h/2+t));
  triVector[0] = createVector(w/2, h/2-t);
  triVector[1] = createVector(w/2+t, h/2+t);
  triVector[2] = createVector(w/2-t, h/2+t);
  
  //canvas configurations
  createCanvas(w,h);
  frameRate(60);
  angleMode(DEGREES);
  noStroke();
  background(1);
  
  //UPDATE: enable HSB color mode with 360 degrees of color
  colorMode(HSB, 360, 100, 100, 1)

  //creates and draws starfield array
  newStarfield();
  
  //dust = new Phos();phota.push(dust);
  
  addDom();
}

function draw() {

//console.log(frameRate());
//console.log(mouseX);
  
  //canvas is cleared with background color every frame, unless clearCanvas is enabled
  if(clearCanvas){
    clear();
    background(1);
  }
  
  //animate each star in starfield background
  for(var i=0;i<numStars;i++){
    starfield[i].flicker();
  }

  //create new Phos particle and add to phota array
  dust = new Phos();
  phota.push(dust);
    
  //create an additional Phos particle to compensate for particle thinning at higher speeds
  if(speed>=5){
    dust = new Phos();phota.push(dust);
  }

//console.log(phota.length);
  
  //cycle through the light particle array
  for(var i=0;i<phota.length;i++){
   
    //animate each light particle if it's in the canvas
    if(phota[i].x < width){
      phota[i].life();
    }
    //remove light particle once it leaves the canvas
    else{
      phota.splice(i,1);
    }
    
  }
  
  //START triangle "prism" setup and draw
  //add white outline
  stroke(255);
  strokeWeight(2);
  //black fill with 80% opacity for a see-through effect
  fill(0,0,0,.8);
  //Draw triangle in the center of the canvas, t refers to triangle size
  beginShape();
    vertex(triVector[0].x,triVector[0].y);
    vertex(triVector[1].x,triVector[1].y);
    vertex(triVector[2].x,triVector[2].y);
  endShape(CLOSE);
  noStroke();
  //END of triangle
  
  //DOM related
  starsInput.value("Stars = " + starsSlider.value());
  
  dustsizeInput.value("Light size = " + dustsizeSlider.value());
  dustsize = dustsizeSlider.value();
  
  speedInput.value("Speed = " + speedSlider.value());
  speed = speedSlider.value();
  
  triInput.value("Triangle = " + triSlider.value());
  t = triSlider.value();
  triVector[0] = createVector(w/2, h/2-t);
  triVector[1] = createVector(w/2+t, h/2+t);
  triVector[2] = createVector(w/2-t, h/2+t);

}



//AUX FUNCTIONS



//clear starfield and draw a new one
function newStarfield(){
  starfield = [];
  for(var i=0;i<numStars;i++){
    star = new Star();
    starfield.push(star);
  }
}

  var phosSlider;

  var starsSlider;
  var starsInput;
  var resetStars_btn;

  var starsSlider;
  var starsInput;
  
  var speedSlider;
  var speedSlider;
  
  var triSlider;
  var triInput;
  
  var greyscaleRadio;
  var clearRadio;
  var conformRadio;
  

function addDom(){
  
  var credits = createDiv("Project by Patrick Moraitis using p5.js");
  credits.style("position", w-250, h-20);
  credits.style("color", "#ffffff");
  
  clearCheckbox = createCheckbox("New Canvas", clearCanvas);
  clearCheckbox.position(w-105, 10);
  clearCheckbox.style("color", "#ffffff");
  clearCheckbox.changed(
    function(){
      clearCanvas = this.checked();
    }
  );
  
  
  greyscaleCheckbox = createCheckbox("Greyscale", greyscale);
  greyscaleCheckbox.position(w-105, 30);
  greyscaleCheckbox.style("color", "#ffffff");
  greyscaleCheckbox.changed(
    function(){
      greyscale = this.checked();
    }
  );
  
  conformCheckbox = createCheckbox("Conform", conform);
  conformCheckbox.position(w-105, 50);
  conformCheckbox.style("color", "#ffffff");
  conformCheckbox.changed(
    function(){
      conform = this.checked();
    }
  );
  
  
  //controls particle origin
  phosSlider = createSlider(0, h, h/2+50);
  phosSlider.position(-(h/2)+5, h/2-10);
  phosSlider.style('width', (h)+'px');
  phosSlider.style('transform', 'rotate(90deg)')
  
  //controls number of stars
  starsInput = createInput("Stars = " + numStars);
  starsInput.position(51,30);
  starsInput.attribute('disabled', 'true');
  starsInput.style('width', '80px');
  
  starsSlider = createSlider(50, 1000, 200);
  starsSlider.position(50, 10);
  starsSlider.style('width', '85px');
  starsSlider.changed(
    function(){
      numStars = starsSlider.value();
      newStarfield();
    }
  );
  
  //button to create new stars
  resetStars_btn = createButton("Refresh Stars");
  resetStars_btn.position(50, 55);
  resetStars_btn.mousePressed(
    function(){
      newStarfield();
    }
  );
  
  
  //controls size of light
  dustsizeInput = createInput("Light size = " + dustsize);
  dustsizeInput.position(151,30);
  dustsizeInput.attribute('disabled', 'true');
  dustsizeInput.style('width', '80px');
  
  dustsizeSlider = createSlider(1, 100, dustsize);
  dustsizeSlider.position(150, 10);
  dustsizeSlider.style('width', '85px');
 

  //controls speed
  speedInput = createInput("Light speed = " + speed);
  speedInput.position(251,30);
  speedInput.attribute('disabled', 'true');
  speedInput.style('width', '80px');
  
  speedSlider = createSlider(1, 10, speed);
  speedSlider.position(250, 10);
  speedSlider.style('width', '85px');

  //controls size of triangle
  triInput = createInput("Star size = " + dustsize);
  triInput.position(351,30);
  triInput.attribute('disabled', 'true');
  triInput.style('width', '80px');
  
  triSlider = createSlider(10, h/2, t);
  triSlider.position(350, 10);
  triSlider.style('width', '85px');
  
  /*
  greyscaleRadio = createRadio("greyRadio");
  greyscaleRadio.option("Rainbow");
  greyscaleRadio.option("Greyscale");
  greyscaleRadio.changed(
    function(){
      if(greyscaleRadio.value() == "Greyscale"){
        greyscale = true;
      }else{
        greyscale = false;
      }
    }
  );
  */
  
}






