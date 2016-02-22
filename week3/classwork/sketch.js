//week 3 classwork assignment #1 (random numbers and if statements) by Patrick Moraitis & Yu Shi

function setup() {
  createCanvas(300,300);
  fill(0,255,0);
  
  frameRate(5);
  
}

function draw() {
  
clear();

  if(random(100)<50){
    fill(random(255),0,0)
    rect(50,50,random(255),random(255));
  }
  
  else{
    fill(random(255),random(255),random(255))
    ellipse(50,50,100,100);
  }
  
}