var table;

var appleC = "#FFFFFF";
var bnsC = "#CF001C";
var conedC = "#2EA6DD";
var cokeC = "#F40000";
var attC = "#009FDB";

var colorArr = [appleC, attC, bnsC, cokeC, conedC];

var appleArr = [];
var attArr = [];
var bnsArr = [];
var cokeArr = [];
var conedArr = [];

var stockArr = [];

var company = [];
var symbol = [];
  
  
function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("data/PL_dailydata_April18-22.csv", "csv", "header");
}


function setup() {
  createCanvas(640,480);
  
  background(222);
  ellipseMode(CENTER);
  noLoop();
  
  appleArr = table.getRow(0).arr;
  attArr = table.getRow(1).arr;
  bnsArr = table.getRow(2).arr;
  cokeArr = table.getRow(3).arr;
  conedArr = table.getRow(4).arr;
  
  stockArr = [appleArr, attArr, bnsArr, cokeArr, conedArr];

  company = table.getColumn("Company");
  symbol = table.getColumn("Symbol");
  
  //print(symbol);
  
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER);



  for (var i=0;i<5;i++){
    noStroke();
    fill(colorArr[i]);
    rect((width/5)*i, 0, width/5, height);
  }
  
  fill(66);
  rect(0, height-80, width, height);
    
  for (var i=0;i<5;i++){
    
    noStroke();
    fill(colorArr[i]);
    text(company[i] + " (" + symbol[i] + ") ", (width/5)*i, 420, width/5, 50);
    
    for (var j=2;j<7;j++){
        fill(240);
        strokeWeight(3);
        
        var dia = map(stockArr[i][j], -3.3, 1.7, 10, 40);
        print(stockArr[i][j+2])
        
        if(dia <= 30){stroke(222,0,0)}else{stroke(0,222,0)}
        ellipse(((width/5)*i)+(width/10),((400/5)*j)-120, dia, dia);
    }
  }
}

function draw() {
  //print("C");
}