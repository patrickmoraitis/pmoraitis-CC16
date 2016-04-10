//variables that increment per frame to power the spiral effect

  //angle is passed to sin & cos functions to calculate the proper point around the circle to get drawn
  var angle=0;
  //scalar amplifies the sin & cos results to increase the particles distance from the canvas center.
  var scalar = 3;
  //x & y variables store results from calculations and ultimately positions each particle (atom) in rect() function
  var x=0;
  var y=0;
  //stores incrementing hue data to use with HSB colorMode
  var hueH=0;
  //increments to add growing atoms effect (atoms farther from center are larger)
  var atomSize = 1;

//Increases the spiral creation speed. Set to anywhere from 0.01 - 10 for drastically different results
var speed = .4;

function setup() {
  //square canvas works best
  createCanvas(500, 500);
  //black background makes the colors more vibrant
  background(0);
  //set colorMode to HSB to easier increment hue. Saturation and brightness remain as defined throughout
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  
//first part calculates current info and draws the atom accordingly

  //add color to atom; hueH loops over the full color spectrum 
  fill(hueH%360,100,100);
  
  //calculate position of each atom based on angle and distance (scalar) from canvas center
  //EDIT: reversed the spiral direction by passing cos() & sin() negative angles "angle" -> "-angle"
  x = width/2 + (cos(-angle) * scalar);
  y = height/2 + (sin(-angle) * scalar);
  
  //console.log(angle);
  //console.log(cos(angle));
  //console.log(scalar)
  
  //EDIT: draw rectangle with incrementing size instead of uniform circle
  rect(x, y, atomSize, atomSize);

//second part increments variables that will be used in next frame

  //increment angle by speed
  angle += speed;
  //EDIT: scalar now incremented by speed/2 ; increases atom density of spiral & doubles spiral creation time
  scalar += speed/2;
  //EDIT: increment the scalar exponentially instead of linearly, but not used for now
  //scalar = scalar * 1.01;
  //hue increments 1 per frame, out of 360 hues total
  hueH += 1;
  //EDIT: increment atomSize from 1-10 by mapping it to scalar
  atomSize = map(scalar, 0, 355, 1, 10);
  
  
//clear the canvas, reset all variables, and start new spiral

  //reset once any atom enters a negative quadrant
  //if(x<0 || y<0){resetSpiral();}
  
  //EDIT: reset once the whole canvas has been filled (scalar exceeds 355) full screen looks better
  if(scalar>355){resetSpiral();}

}//end draw function

function resetSpiral(){
  clear();
  background(0);
  angle=0;
  scalar = 3;
  x=0;
  y=0;
  hueH=0;
  atomSize = 1;
}
