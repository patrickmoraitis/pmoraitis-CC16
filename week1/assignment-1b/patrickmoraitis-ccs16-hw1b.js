/*
Patrick Moraitis - CCS16 Assignment #1B
Sol LeWitt Wall Drawing #16 (1969)
Bands of lines 12 inches (30 cm) wide, in three directions (vertical, horizontal, diagonal right) intersecting.
*/

function setup() {
  
  var square = 640;
  
  createCanvas(square, square);
  rect(0,0,200,40);
  text("Sol LeWitt Wall Drawing #16 (1969) by Patrick Moraitis (p5.js, 2016)", 5, 5, 200, 40);
  background(250);
  
  for(i=0; i<200; i+=4){
    
    //Vertical center of window offset by 100 from the center
    var windowVCenter = (square/2)-100;
    
    //Horizontal center of window offset by 100 from the center
    var windowHCenter = (square/2)-100;
    
    //Diagonal center of window offset by 150 from the center
    var windowDCenter = square-150;

    
    //Vertical lines
    line(windowVCenter+i, 0, windowVCenter+i, square);
    //Horizontal lines
    line(0, windowHCenter+i, square, windowHCenter+i);
    //Diagonal lines
    line(windowDCenter+(i*1.5), 0, 0, windowDCenter+(i*1.5));
  
  }

}

function draw() {

}