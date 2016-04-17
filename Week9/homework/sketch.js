// GLOBAL VARIABLES

//width and height of the canvas
var w=550;
var h=400;

//arrays that hold the Star and Phos objects (phota is plural of phos)
var starfield=[];
var phota=[];

//size of the triangle "prism"
var t=110;

//6 colors (red, orange, yellow, green, cyan, violet) and angle of each color
//used by Phos class destiny variable
var colors = ['#ff0000',  '#ffCC00', '#ffff00',  '#00ff00', '#00ffff', '#663399'];
var angles = [0.7, 1.2, 1.7, 2.2, 2.7, 3.2];



// CLASSES

//Star class used to create the star field background
function Star() {
  //randomly size and place the star in the canvas
  this.x = random(0,w);
  this.y = random(0,h);
  this.size = random(.3,2);
  
  //called every frame, gives the star a flickering effect
  this.flicker = function(){
    fill(255);
    ellipse(this.x,this.y,this.size+random(0,.7),this.size+random(0,.7));
  }
}

//Light class used to create the particle system
//Fun fact: Phos (φῶς) is the Greek word for light, root word of photography
function Phos() {
  //x,y coordinates where every particle is born
  this.x = 0;
  this.y = h/2 + 60;
  //width & height of particle are the same resulting in a circle
  this.size = 5;
  //all particles starts as white light with the same angle
  this.colour = 255;
  this.angle = -15;
  //random integer 0-5 defines particle color and spread after refraction (maps to colors and angles arrays)
  this.destiny = floor(random(0,6));
  //particle speed
  this.speed = 6;
  //default particle x & y velocity calculated from angle and speed
  this.xv = cos(this.angle)*this.speed;
  //add random jiggle to y velocity for less uniform animation
  this.yv = sin(this.angle)*this.speed+random(-(this.speed/50),this.speed/50);
  
//console.log(this.yv);
}

//life method is called every frame. calculates and animates particle 
Phos.prototype = {
  constructor : Phos,
  life : function(){
    
    //change particle color and angle when it's in the right half of canvas (refraction)
    if(this.x > w/2+w/20){
      fill(colors[this.destiny]);
      this.y += angles[this.destiny];
    }
    //otherwise use default values
    else{
      fill(this.colour);
      this.y += this.yv;
    }
    this.x += this.xv;
    
    //draw updated light particle
    ellipse(this.x,this.y,this.size,this.size);

  }
};



// SETUP ONCE ON INIT & DRAW EVERY FRAME

function setup() {
  
  //canvas configurations
  createCanvas(w,h);
  frameRate(60);
  angleMode(DEGREES);
  noStroke();

  //creates 100 Star objects and adds to starfield array
  for(var i=0;i<100;i++){
    star = new Star();
    starfield.push(star);
  }

}

function draw() {
  
  //console.log(frameRate());
  //console.log(mouseX);
  
  //canvas background color needs to be updated every frame
  background(1);
  
  //animate each star in starfield background
  for(var i=0;i<100;i++){
    starfield[i].flicker();
  }
  
  //create new Phos particle and add to phota array
  dust = new Phos();
  phota.push(dust);

  //console.log(phota.length);
  
  //cycle through the light particle array
  for(var i=0;i<phota.length;i++){
   
    //animate each light particle if it's in the canvas
    if(phota[i].x < width){
      phota[i].life();
    }
    //remove light particle once it leaves the canvas
    else{
      phota.splice(i,1);
    }
    
  }
  
  //START triangle "prism" setup and draw
  //add white outline
  stroke(255);
  strokeWeight(2);
  //black fill with 80% opacity for a see-through effect
  fill('rgba(0,0,0, .8)');
  //Draw triangle in the center of the canvas, t refers to triangle size
  triangle(w/2, h/2-t, w/2+t, h/2+t, w/2-t, h/2+t);
  noStroke();
  //END of triangle
  
}