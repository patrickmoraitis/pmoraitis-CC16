//week 3 homework #3 by Patrick Moraitis

function setup() {
  createCanvas(600,600);

  noFill();
  strokeWeight(1);
  stroke(0,255,0);
  
  for(var i = 0; i<600; i+=4){
    beginShape(TRIANGLES);
    vertex((width/2)-i, (height/2)-i);
    vertex((width/2), (height/2)+(i*2));
    vertex((width/2)+i, (height/2)-i);
    endShape(CLOSE);
  }
  
  stroke(0,0,255);
  
  for(var i = 0; i<600; i+=5){
    beginShape(TRIANGLES);
    vertex((width/2)-i, (height/2)-i);
    vertex((width/2), (height/2)+(i*2));
    vertex((width/2)+i, (height/2)-i);
    endShape(CLOSE);
  }
}

function draw() {
 
}