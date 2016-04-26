//will hold all the data downloaded from the CSV file
var table;

//Hex values of company colors (approximates)
var appleC = "#FFFFFF";
var bnsC = "#CF001C";
var conedC = "#2EA6DD";
var cokeC = "#F40000";
var attC = "#009FDB";

//Array holds all company colors for easier access in loops
var colorArr = [appleC, attC, bnsC, cokeC, conedC];

//Array holds the data for each company. index 0 & 1 contain text, data begins on 2
var appleArr = [];
var attArr = [];
var bnsArr = [];
var cokeArr = [];
var conedArr = [];

//Array holds each company array for easier access in loops
var stockArr = [];

//Arrays hold the company name and stock symbol
var company = [];
var symbol = [];

//Holds days of the data
var dates = ["Mon 4.18", "Tue 4.19", "Wed 4.20", "Thu 4.21", "Fri 4.22"];

/*This data represents the daily percentage change of some stocks in my IRA for week of 4/18 - 4/22/2016

    Company,Symbol,Monday,Tuesday,Wednesday,Thursday,Friday
    Apple,AAPL,-1.29 ,-0.90 , 0.46 ,-0.90 , 0.64 
    AT&T,T, 0.21 , 0.31 ,-0.69 ,-1.74 , 0.58 
    Bank of Nova Scotia,BNS, 0.97 , 0.91 , 1.21 ,-0.21 , 0.21 
    Coca-Cola,KO, 0.20 , 0.63 ,-2.14 ,-1.36 , 1.71 
    Con Edison,ED, 0.56 , 0.40 ,-3.25 ,-2.96 , 0.21

*/

//Preloads CSV file from web and saves data into table variable. CSV pasted above for reference
function preload() {
  table = loadTable("data/PL_dailydata_April18-22.csv", "csv", "header");
}


function setup() {
  
  //print(table)
  
  var w = windowWidth;
  var h = windowHeight;
  
  createCanvas(w,h);
  background(222);
  noLoop();
  
  //assigns each companies data to it's array using getRow
  appleArr = table.getRow(0).arr;
  attArr = table.getRow(1).arr;
  bnsArr = table.getRow(2).arr;
  cokeArr = table.getRow(3).arr;
  conedArr = table.getRow(4).arr;
  
  //create 2D array with all companies info
  stockArr = [appleArr, attArr, bnsArr, cokeArr, conedArr];

  //Use getColumn instead of row for this data
  company = table.getColumn("Company");
  symbol = table.getColumn("Symbol");
  
  //create 5 vertical bands with each companies colors
  for (var i=0;i<5;i++){
    fill(colorArr[i]);
    rect((width/5)*i, 0, width/5, height);
  }
  
  //create a semi-transparent background to desaturate the background colors
  fill(255, 200);
  rect(0, 0, width, height);
  
  //create a dark grey footer and set text styles for x-axis labels
  fill(66);
  rect(0, height-80, width, height);
  textStyle(BOLD);
  textAlign(CENTER);  
  
  //nested for loop runs 5 x 5 = 25 times
  for (var i=0;i<5;i++){
    
    //This part between the 2 loops only runs 5 times
    //draws each companies name and symbol along the x-axis footer with company colored font
    noStroke();
    textSize(18);
    fill(colorArr[i]);
    text(company[i] + " (" + symbol[i] + ") ", (width/5)*i, height-60, width/5, 50);
    
    //Adds date along the y-axis in a smaller grey font


    
    //This inner loop runs 25 times, draws circles based on data
    //j starts at 2 to skip over the first 2 values in row array (company name and symbol)
    for (var j=2;j<7;j++){
        
      //Default circle white fill with 3pt stroke
      fill(255);
      strokeWeight(3);
      
      //circle diameter is absolute value ofpercentange change x 10
      //1.7% was the biggest gain, so should appear about half the size of the biggest loss (-3.3%)
      var dia = floor(stockArr[i][j] * 10);
      
      //negative numbers get tinted red to represent loss
      if(dia <= 0){stroke(222,0,0); fill(255,222,222);}
      //the other half is tinted green
      else{stroke(30,150,30); fill(222,255,222)}
      
      //lets also consider any change between -.3% and .3% as nuetral changes, set grey
      if(dia >= -3 && dia <= 3){stroke(50); fill(222)}
      
      //set diameters minimum size by adding 10 & use absolute value for proper circle size
      dia = abs(dia)+10;
      
      //size, position, and draw the circles based on canvas size and CSV data
      ellipse(((width/5)*i)+(width/10),(((height-80)/5)*(j-1))-50, dia, dia);
      
      noStroke();
      fill(22);
      textSize(12);
      text(dates[i], ((width/5)*(j-2)), (((height-80)/5)*(i+1))-30, width/5, 12);
      
    }
  }
  
  textSize(16);
  stroke(250);
  strokeWeight(4);
  //manually marks the weeks biggest loser
  fill(222,0,0);
  text(stockArr[4][4] + "%", ((width/5)*4)+(width/10),(((height-80)/5)*3)-60, 80, 50);
  //and winner
  fill(30,150,30);
  text("+" + stockArr[3][6] + "%", ((width/5)*3)+(width/10),(((height-80)/5)*5)-60, 80, 50);
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  setup();
}

//function draw() {}