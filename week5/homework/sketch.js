function setup() {
  createCanvas(600,600);
  
  //draw 2 cats per second  
  frameRate(2);
}

function draw() {
  
  //using random to draw many different cats
  makeCat(random(100,500),random(100,500), random(.3,2), color(floor(random(20,220))), color(floor(random(0,255)),floor(random(0,255)),floor(random(0,255))));
  
}

//function takes x & y position, scale, fur color, & eye color
function makeCat(x, y, s, fur, eye) {
  push();
  
  translate(x,y);
  scale(s);
  
  //left ear, right ear
  fill(fur);
  stroke(50);
  strokeWeight(2);
  triangle(-45,-70,-40,-30, 0,-40);
  triangle(45,-70, 40,-30, 0,-40);

  //head
  ellipse(0,0,100,100);

  //left eye, right eye
  fill(eye);
  ellipse(-20,-10,30,20);
  ellipse(20,-10,30,20);
  noStroke();
  
  //pupils
  fill(25);
  ellipse(-20,-10,5,15);
  ellipse(20,-10,5,15);
  
  //nose
  triangle(0,20,-10,5,10,5);
  
  //smile
  noFill();
  stroke(50);
  strokeWeight(4);
  arc(0, 20, 60, 40, 0, PI, OPEN);
  noStroke();
  
  pop();
}