/*
Patrick Moraitis - CCS16 Assignment #1B
Sol LeWitt Wall Drawing #16 (1969)
Bands of lines 12 inches (30 cm) wide, in three directions (vertical, horizontal, diagonal right) intersecting.
*/

function setup() {
  createCanvas(640, 640);
  rect(0,0,200,40);
  text("Sol LeWitt Wall Drawing #16 (1969) by Patrick Moraitis (p5.js, 2016)", 5, 5, 200, 40);
  background(250);
  
  for(i=0; i<200; i+=4){

    line(220+i, 0, 220+i, 640);
    line(0, 220+i, 640, 220+i);
    line(490+(i*1.5), 0, 0, 490+(i*1.5));
  
  }

}

function draw() {

}