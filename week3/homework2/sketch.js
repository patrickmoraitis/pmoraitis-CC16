//week 3 homework #2 by Patrick Moraitis

function setup() {
  createCanvas(800,400);

  noFill();
  strokeWeight(1);
  stroke(55);
  
  for(var i = 0; i<width; i+=2){
    beginShape();
    vertex((width/2)-(i*2), (height/2)+i);
    vertex((width/2)+(i*2), (height/2)+i);
    vertex((width/2)+(i*2), (height/2)-i);
    vertex((width/2)-(i*2), (height/2)-i);
    endShape(CLOSE);
  }
}

function draw() {
 
}