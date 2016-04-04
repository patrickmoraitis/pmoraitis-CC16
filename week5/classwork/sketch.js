var myFirstArr = [];

var myGeo = ["Fred", "rgb(255,0,0)", 200, 100];

function setup() {
  createCanvas(500,500);
  
  colorMode(RGB);
  
  fill(myGeo[1]);
  
  ellipse(width/2,height/2, myGeo[2], myGeo[3]);
  
  text("My oval name is " + myGeo[0],200,100,200,100);
  
  /*
  for(var i=0; i < 5; i++){
    myFirstArr[i] = random(2);
    myFirstArr.push(random(12));
  }
  */
  
  //print(myFirstArr);
}

function draw() {
 
 //background(255);
 
 /*
 
  for(var i=0; i < myFirstArr.length; i++){
    rect(width/2, height/2, myFirstArr[i]*10, myFirstArr[i]*10)
  }
  
  */
  
}