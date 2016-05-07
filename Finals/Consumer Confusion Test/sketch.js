// GLOBAL VARIABLES

//will store width and height of the canvas
var w = 0;
var h = 0;

//holds the generic BG image
var img;

//default number of solid steps across the color wheel, for example 7 hue steps is AKA a rainbow
var hueSteps = 12;

//hue is defined by the 360 degrees of a circle
var hMax = 360;

function preload(){
  img = loadImage("rainbowmobile_draft.png");
}

function setup() {
  
  //set w & h as reference to window size and create equally sized canvas
  w = windowWidth
  h = windowHeight
  createCanvas(w, h);
  
  //HSB color mode
  colorMode(HSB, hMax, 100, 100, 1);
  
  //depending on the # of hueSteps, create evenly sized and distributed rects with equidistant colors too
  for (var i=0; i<hueSteps; i++){
    fill((hMax/hueSteps)*i, 100, 100, 1);
    rect((w/hueSteps)*i, h-80, w/hueSteps, 80);
  }
  
  //print(hueSteps);
  
}

function draw() {

  image(img, 0, 0, w, h-80);
  
  textSize(24);
  fill(0);
  text("Use UP/DOWN arrows to change # of hue steps", 20, h-120, w, 80)
  blendMode(OVERLAY);
  
  if(mouseY > h-80){
    var colour = ((hMax/hueSteps) * int(map(mouseX, 0, w, 0, hueSteps))) % 360;
    print(colour);
    fill(colour, 100, 100, 1);
    rect(0,0,w,h-80);
  }
  
}

function mousePressed() {

}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    hueSteps++;
    setup();
  }
  else if (keyCode === DOWN_ARROW) {
    hueSteps--;
    setup();
  }
}

//AUX FUNCTIONS

//Resizes sketch to always fill the browser window, even during resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // update w & h while we are at it
  w = windowWidth
  h = windowHeight
  
}
