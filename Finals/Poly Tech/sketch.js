// GLOBAL VARIABLES

//will store width and height of the canvas
var w = 0;
var h = 0;

var rotateSpeed = 0;
var ix = 3;

function setup() {
  //set w & h as reference to window size and create equally sized canvas
  w = windowWidth
  h = windowHeight
  createCanvas(w, h);
  
  frameRate(12);

}

function draw() {
  //background(222);
 
  //var ix = floor(frameCount%60);
 
  push();
  translate(width/2, height/2);
  rotate(frameCount / rotateSpeed);
  polygon(0, 0, h/4, ix);
  pop();
 
  textSize(72);

  text(floor(ix), w/2, h/2, 80,80);
 
  if(ix<20){ix+=.1;}
  else{ix = 3;}
 
}

//AUX FUNCTIONS

//Resizes sketch to always fill the browser window, even during resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // update w & h while we are at it
  w = windowWidth
  h = windowHeight
  
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

