function setup() {
  
  createCanvas(windowWidth, windowHeight);
  background(250);
  noFill();
  
}

function draw() {
  
  background(250);
  
  //Breaks the screen into 4 equal quadrants and display a different shape per quadrant
  
  if(mouseX <= width/2 && mouseY <= height/2){
    rect(mouseX, mouseY, 50,50)
  }
  else if(mouseX <= width/2 && mouseY >= height/2){
    rect(mouseX, mouseY, 100,50)
  }
  else if(mouseX >= width/2 && mouseY <= height/2){
    ellipse(mouseX, mouseY, 50,50)
  }
  else{
    ellipse(mouseX, mouseY, 100,50)
  }
  
}