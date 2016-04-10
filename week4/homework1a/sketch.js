//diameter of the circle (width & height)
var diam = 56;
//shims used to space the circles
var xShim = diam+.5;
var yShim = 49;

function setup() {
  createCanvas(480,640);
  noLoop();
  noStroke();
  //use corner mode to simplify circle placement
  ellipseMode(CORNER);
  background(240);
  
  colorMode(HSB, 360,100,100)
}

function draw() {
  //the 6 colors used in the original Albers example
  var albersHue = [212, 207, 205, 316, 271, 212];
  var albersSat = [38, 56, 25, 63, 20, 72];
  var albersBri = [66, 75, 75, 44, 62, 15];
  //random hue to make it more interesting
  var hueShift = floor(random(0,360));
  //rough odds based on the number of times a color appeared in the Albers example
  var colorChance;
  //map color picked to the index of colors
  var ci;
  
  //nested for loops creates 9 columns and 13 rows of evenly spaced circles
  for(var i=0; i<9; i++){
    for(var j=0; j<13; j++){

      //picks 1 of 6 colors based on estimated odds
      colorChance = random(0,100);
      if(colorChance >= 0 && colorChance <= 5){ci = 5;}
      else if(colorChance >= 6 && colorChance <= 9){ci = 4;}
      else if(colorChance >= 10 && colorChance <= 20){ci = 3;}
      else if(colorChance >= 21 && colorChance <= 46){ci = 2;}
      else if(colorChance >= 47 && colorChance <= 72){ci = 1;}
      else if(colorChance >= 73 && colorChance <= 100){ci = 0;}
      
      //fills with random hue shift applied
      //fill((albersHue[ci]+hueShift)%360, albersSat[ci], albersBri[ci])
      
      //fills with the colors from the original Albers example
      fill(albersHue[ci], albersSat[ci], albersBri[ci])

      //if statement shifts every other row to the left by half a circle
      if(j%2==0){
        ellipse((i*xShim)-(xShim/2), j*yShim, diam, diam)
      }else{
        ellipse(i*xShim, j*yShim, diam, diam)
      }
    }
  }
  
}//close draw