var fm1 = 125.0;
var fm2 = 190.0;
//initial value makes no difference, 0 is fine
var angle = 0.0;
var ampX;
var ampY;
var s = 2;

function setup(){
  createCanvas(600,600);
  colorMode(HSB, 36, 100, 100)
  background(11);
  strokeWeight(1);
  //stroke(255,255,0);
  noFill();

  ampX = width/2;
  ampY = height/2;

}

function draw(){

  if(s<.01){
    noLoop();
  }else{
    makeLissa(fm1, fm2, ampX, ampY, s, 0, color((frameCount%36), 100, 100));
    s*=.99;
  }
  
}// end draw

function makeLissa(fm1, fm2, ampX, ampY, s, shift, colorr){
  
  push();
  translate(width/2+shift, height/2);
  scale(s);
  rotate(frameCount%360);
  stroke(colorr);
  
  beginShape();
  
    //draw full image instantly
    for(var i=0; i < 10000; i++){
    //draw with animation
    //for(var i=0; i < frameCount; i++){
   
      angle = i / fm1 * TWO_PI;
      var y = sin(angle)* ampY;
      
      angle = i / fm2 * TWO_PI;
      var x = sin(angle)* ampX;
    
      vertex(x,y); 
    }
  endShape();
  pop();
  
}