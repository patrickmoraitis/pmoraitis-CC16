var x=0;
var y=0;
var angle = 0;
var scalar = 5;
var speed = .4;
var hueH = 0;

function setup() {
  createCanvas(500, 500);
  background(0);
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  
  //add rainbow colors to spiral
  fill(hueH%360,100,100);
  
  //calculate position of next circle based on angle and distance from canvas center
  x = width/2 + (cos(angle) * scalar);
  y = height/2 + (sin(angle) * scalar);
  
  //draw circle
  ellipse(x, y, 5, 5);
  
  //increment values for angle, distance, and hue
  angle += speed;
  scalar += speed;
  hueH += 1;
  
  //clear the canvas and reset all variables once spiral grows outside the canvas
  if(x<0){
    clear();
    background(0);
    hueH=0;
    angle=0;
    scalar=5;
  }
  
}
