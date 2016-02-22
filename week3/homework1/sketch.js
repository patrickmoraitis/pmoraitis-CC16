//week 3 homework #1 by Patrick Moraitis, based off of classwork

function setup() {
  createCanvas(500,500);
  noStroke();
  
  frameRate(2);
  
   var cellSize = 2;

  
  //first loop defines the columns
  for(var i=0; i<=width/cellSize; i++){
    //inner loop defines the rows
    for(var j=0; j<=height/cellSize; j++){

      
      //if the row is odd/even, make the colors white/black per cell, respectively
      if(j%2){
        if(i%2){
          fill(255);
          //50 refers to the size of the cell
          rect(cellSize*i, cellSize*j, cellSize, cellSize);
        }else{
          fill(0);
          rect(cellSize*i, cellSize*j, cellSize, cellSize);
        }
      }
      //otherwise, reverse the colors
      else{
      
        if(i%2){
          fill(0);
          rect(cellSize*i, cellSize*j, cellSize, cellSize);
        }else{
          fill(255);
          rect(cellSize*i, cellSize*j, cellSize, cellSize);
        }
      }
    }
  }
  
  noFill();
  strokeWeight(1);
  stroke(255);
  
  for(var i = 0; i<500; i+=3){
    beginShape();
    vertex((width/2)-i, (height/2)+i);
    vertex((width/2)+i, (height/2)+i);
    vertex((width/2)+i, (height/2)-i);
    vertex((width/2)-i, (height/2)-i);
    endShape(CLOSE);
  }
}

function draw() {
 
}