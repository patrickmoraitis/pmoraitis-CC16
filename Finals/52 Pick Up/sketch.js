// GLOBAL VARIABLES

//will store width and height of the canvas
var w = 0;
var h = 0;

//will store the actual width and height card images loaded
var cardW = 0;
var cardH = 0;

//will hold the full screen background image, a green felt
var bg;

//holds the card back
var cardBack;

//holds the 52 loaded images of the deck ["1.png", "2.png", etc]
var cardImages = [];

//deck that holds the unshuffled pack of cards [1,2,3,etc] and then shuffled [4,25,2,etc]
var deck = [];

//final layout on the table
var spread = [];

//default scale is 1
var cardScale = 1;

//An array containing all the LiveCard objects
var liveCards = [];

var pickedCard = 0;

//short hand deck values, position in array matches with image filename, 1.png is "Ac" for example
var cardValues = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc", "Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "Th", "Jh", "Qh", "Kh", "As", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "Ts", "Js", "Qs", "Ks", "Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "Td", "Jd", "Qd", "Kd"];

var cardRanks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"]
var cardSuits = ["c", "h", "s", "d"]

var gameStarted = false;

function preload(){
  
  //preload background image, green felt
  bg = loadImage("felt.png");
  
  //preload card back image, red pattern
  cardBack = loadImage("deck/0.png");
  
  //loads all 52 playing cards and adds each image to the cardImages array
  for (var i=1; i<=52; i++){
    var card = loadImage("deck/" + i + ".png")
    cardImages.push(card);
  }
  
}

function LiveCard(di){
  
  this.id = di;
  this.x = (((w*.9)/13)*(floor(this.id % 13)))+(w*.05);
  this.y = (((h*.8)/4)*floor(this.id / 13))+(h*.1);
  this.w = cardW*cardScale;
  this.h = cardH*cardScale;
  this.rank = cardRanks[(this.id-1)%13];
  this.suit = cardSuits[floor(this.id/13)-1];
  this.face = cardImages[this.id-1];
  this.back = cardBack;
  this.open = true;
  this.img;
  
  this.clicked = function(){
    
    if(mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y+this.h){
      
      //print(this.id);
      this.flipCard();

    }
  }
  
  this.flipCard = function(){
    
    if (!this.open){
      this.open = true;
      this.displayCard();
      if(pickedCard == 0){
        pickedCard = this.id;
      }
      
      else if(liveCards[pickedCard-1].rank == this.rank){
        pickedCard = 0;
        print("Match!");
      }
      
      else if(liveCards[pickedCard-1].rank != this.rank){
        for (var k = 0; k <= 51; k++) {
          liveCards[k].open = false;
          liveCards[k].displayCard();
        }
        pickedCard = 0;
        print("no match :(");
      }
    }
    else{
      this.open = false;
      this.displayCard();
      pickedCard = 0;
    }
  }
  
  this.updateSize = function(){
    
    this.posi = deck[this.id-1];

    this.x = (((w*.9)/13)*(floor(this.posi % 13)))+(w*.05);
    this.y = (((h*.8)/4)*floor(this.posi / 13))+(h*.1);
    this.w = cardW*cardScale;
    this.h = cardH*cardScale;
    
  }
  
  this.displayCard = function(){
    
    if (this.open){
      this.img = image(this.face, this.x, this.y, this.w, this.h);
    }else{
      this.img = image(this.back, this.x, this.y, this.w, this.h);
    }
    
  }
  
}

function setup() {

  //slow frame rate to avoid memory crashes
  frameRate(12);
  //noLoop();
  //set w & h as reference to window size and create equally sized canvas
  w = windowWidth
  h = windowHeight
  createCanvas(w, h);
  
  //get default card size and store it for later, assumes all image assets have the same dimensions
  cardW = cardImages[1].width
  cardH = cardImages[1].height
  
  var cardScale = (h/6) / cardH;
  
  //push the integers 0 through 51 into the array
  for (var di = 0; di <= 51; di++) {
    deck.push(di);
    var liveCard = new LiveCard(di+1);
    liveCards.push(liveCard);
  }

  //print(cardW)//print(deck)//print(cardH)
  
  //add first view of BG & cards to screen
  newDeal();
  
}

function draw() {

 // print(mouseX);

}

//AUX FUNCTIONS

//Resizes sketch to always fill the browser window, even during resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // update w & h while we are at it
  w = windowWidth
  h = windowHeight
  
  dealDeck();
}

//Card shuffler
////Instead of relying only on randomly generated numbers, this function mimics the "scrambling" shuffle method used by casino card dealers. Cards are randomly passed from one pile to the another about a dozen times
////This implementation assumes the most basic premise that 2 piles of cards are used
function shuffleDeck() {

  //temp_deck used during card shuffling function, the "second pile"
  var temp_deck = [];

  //"scramble" the deck a dozen times
  for (var i = 0; i < 13; i++) {

    //deck starts with length of 52, repeat this function 52 times
    while (deck.length > 0) {
      
      //pick a random number between 0 and the length of the deck
      var rand = floor(Math.random() * deck.length);
      
      //push the randomly selected card to the temp deck and remove it from the real deck
      temp_deck.push(deck[rand]);
      deck.splice(rand, 1);
    }
  
    //after all cards are moved from the deck to temp deck, temp deck becomes the deck and empties itself, recycle
    deck = temp_deck;
    temp_deck = [];

  }
}//once the shuffleDeck function is completed, global deck var is now shuffled 


//this function run loops the cardImages array and displays cards in LtR rank order by suit, 4 rows & 13 columns
function dealDeck() {
  //add BG
  background(bg);
  
  //add label
  textSize(20);
  fill(255);
  text("Look at the cards and remember where the pairs are!", 20, 10, w, 100);
    text("Press Spacebar to start & press ESC for a new game", 20, h-40, w, 100);

  
  //calculate scale of cards by dividing the canvas height and comparing it to original card height
  cardScale = (h/6) / cardH;
  
  if(cardScale > 1){cardScale = 1}
  else if(cardScale < .1){cardScale = .1}
  
  //print(cardScale);// 1.32 , .56, etc
  
  //update display of all cards based on data changes
  for (var k = 0; k <= 51; k++) {
     // liveCards[k].open = true;
      liveCards[k].updateSize();
      liveCards[k].displayCard();
  }
  
  
}//close dealDeck()

//this function call the above two, shuffles and deals the deck
function newDeal() {
  for (var k = 0; k <= 51; k++) {
    liveCards[k].open = true;
  }
  shuffleDeck();
  dealDeck();
}


function mousePressed() {
  if(gameStarted){
    for (var k = 0; k <= 51; k++) {
      liveCards[k].clicked();
    }
  }

}

function keyPressed() {

 if(!gameStarted && keyCode === 32){
  for (var k = 0; k <= 51; k++) {
      liveCards[k].flipCard();
  }
  gameStarted = true;
 }
 else if(keyCode === ESCAPE){
   newDeal();
  gameStarted = false;

 }
  

}