//week 3 classwork assignment #2 (for loops) by Patrick Moraitis & Yu Shi

function setup() {
  createCanvas(500,500);
  noStroke();
}

function draw() {
  //first loop defines the columns
  for(var i=0; i<=10; i++){
    //inner loop defines the rows
    for(var j=0; j<=10; j++){

      //if the row is odd/even, make the colors white/black per cell, respectively
      if(j%2){
        if(i%2){
          fill(255);
          //50 refers to the size of the cell
          rect(50*i, 50*j, 50, 50);
        }else{
          fill(0);
          rect(50*i, 50*j, 50, 50);
        }
      }
      //otherwise, reverse the colors
      else{
      
        if(i%2){
          fill(0);
          rect(50*i, 50*j, 50, 50);
        }else{
          fill(255);
          rect(50*i, 50*j, 50, 50);
        }
      }
    }
  }
}

//class tutorial below

/*

var numCircles = 20;
var scalar = 1.0;

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background(255);
  scale(scalar);
  for(var i=1; i<= numCircles; i++){
    fill(random(255), random(255), random(255));
    ellipse(width/2, height/2, width/i, height/i)
  }
  scalar-=0.001;
}

*/