/*
Patrick Moraitis - CCS16 Assignment #1A
Sol LeWitt Wall Drawing #65 (1971)
Lines not short, not straight, crossing and touching, drawn at random, using four colors, uniformly dispersed with maximum density, covering the entire surface of the wall.
*/

function setup() {
  createCanvas(640, 640);
  frameRate(24);
  background(55);
  
  rect(0,0,200,40);
  text("Sol LeWitt Wall Drawing #65 (1971) by Patrick Moraitis (p5.js, 2016)", 5, 5, 200, 40);

  noFill();
}

function draw() {
  
var COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF'];
stroke(COLORS[floor(random(4))]);
bezier(random(640), random(640), random(640), random(640), random(640), random(640), random(640), random(640));
  
}