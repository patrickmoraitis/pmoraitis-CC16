function setup() {
  createCanvas(480, 480);
  colorMode(HSB, 360, 100, 100);
  
  text("Based on the additive color wheel (RGB), not the subtractive color wheel (RYB)", 25, 25, 480, 100)

  textSize(24);
  text("Analogous", 75, 50, 100, 100)
  text("Triad", 75, 170, 100, 100)
  text("Complementary", 75, 290, 100, 100)
  
  rectMode(CENTER);

}

function draw() {
  
  for(var i=0; i<4; i++){
    
    //Analogous
    fill(i*15,100,100);
    rect(i*100+100,height*.25, 50, 50);

    //Triad
    fill((i*120)%360,100,100);
    rect(i*100+100,height*.5, 50, 50);

    //Complementary
    fill((i*180)%360,100,100);
    rect(i*100+100,height*.75, 50, 50);
    
  }
  
}