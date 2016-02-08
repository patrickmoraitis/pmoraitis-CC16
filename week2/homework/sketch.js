function setup() {
  createCanvas(450, 600);
  background(250);
  frameRate(12);
  noStroke();
  textSize(72);
}

function draw() {
  background(random(50));

  fill(random(50))
  quad(width/2, 0, width, height/2, width/2, height, 0, height/2);

  function makeQuad(x1, y1) {
    fill(random(255),0,0)
    quad(x1, y1, x1+25, y1+40, x1, y1+80, x1-25, y1+40)
  }
  
  makeQuad(100,100);
  makeQuad(100,200);
  makeQuad(100,300);
  makeQuad(100,400);
  makeQuad(width/2,150);
  makeQuad(width/2,350);
  makeQuad(width-100,100);
  makeQuad(width-100,200);
  makeQuad(width-100,300);
  makeQuad(width-100,400);
  
  text("IO", 15, 15, 200, 200);
  text("OI", width-100, height-100, 200, 200);

}