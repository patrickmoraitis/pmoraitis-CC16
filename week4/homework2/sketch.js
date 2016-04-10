function setup() {
  createCanvas(480,640);
  background(173, 159, 150);
  noLoop();
  noStroke();
}

function draw() {
  
  var rectX = 40;
  var rectY = 50;
  var rectW = 400;
  
  fill(58, 115, 145);
  rect(rectX, rectY, rectW, 540);
  
  fill(47, 100, 168);
  rect(rectX, rectY+50, rectW, 90);
  rect(rectX, rectY+230, rectW, 35);
  rect(rectX, rectY+490, rectW, 70);
  
  fill(209, 151, 56);
  rect(rectX, rectY+160, rectW, 70);
  rect(rectX, rectY+295, rectW, 40);
  rect(rectX, rectY+475, rectW, 15);
  
  fill(52, 70, 83);
  rect(rectX, rectY+265, rectW, 5);
  rect(rectX, rectY+385, rectW, 35);
  
  fill(178, 63, 63);
  rect(rectX, rectY+270, rectW, 25);
  rect(rectX, rectY+420, rectW, 10);

}