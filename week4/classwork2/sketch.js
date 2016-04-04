function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  
  for(var i=0; i<4; i++){
    
    //Analogous
    //fill(i*15,100,100);
   
    //Triad
    fill((i*120)%360,100,100);
    
    //Complementary
    //fill((i*180)%360,100,100);

    rect(i*100+50,height/2, 50, 50);
  }
  
}