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

//short hand deck values, position in array matches with image filename, 1.png is "Ac" for example
var cardValues = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc", "Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "Th", "Jh", "Qh", "Kh", "As", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "Ts", "Js", "Qs", "Ks", "Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "Td", "Jd", "Qd", "Kd"];


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


function setup() {

  //slow frame rate to avoid memory crashes
  //frameRate(12);
  noLoop();
  //set w & h as reference to window size and create equally sized canvas
  w = windowWidth
  h = windowHeight
  createCanvas(w, h);

  //push the integers 0 through 51 into the array
  for (var di = 0; di <= 51; di++) {
    deck.push(di);
  }
  
  //get default card size and store it for later, assumes all image assets have the same dimensions
  cardW = cardImages[1].width
  cardH = cardImages[1].height
  
  //print(cardW)//print(deck)//print(cardH)
  
  //add first view of BG & cards to screen
  dealDeck();

}

//every frame, clear some memory, redraw the felt background and respread the cards on top
function draw() {
 // clear();
//  background(bg);
//  dealDeck();
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
  textSize(24);
  fill(255);
  text("Click anywhere to shuffle the cards", 20, 20, w, 100);
  
  //calculate scale of cards by dividing the canvas height by the 4 rows and comparing it to original card height
  var cardScale = (h/6) / cardH;
  
  if(cardScale > 2){cardScale = 2}
  else if(cardScale < .1){cardScale = .1}
  
  //print(cardScale);// 1.32 , .56, etc
  
  //outer loop represents the 4 rows (suits)
  for (var k = 0; k < 4; k++) {
    //inner loop, the 13 columns (ranks)
    for (var j = 1; j <= 13; j++) {
      
      //store pick in thisCard var for easy access
      //j-1 picks the rank and 13*k refers to the suit. Add both rank & suit to get the exact card
      
      var thisI = deck[(j-1)+(13*k)];
      
      var thisCard = cardImages[thisI];
      
      //print(thisI)
      
      //print(thisCard.width)
      
      //add card to view, card size is based on window size and margins are made so all cards fit on screen
      image(thisCard, (((w*.8)/13)*(j-1))+(w*.1), (((h*.8)/4)*k)+(h*.1), cardW*cardScale, cardH*cardScale)
    
    }//close inner for loop
  }//close outer for loop
}//close dealDeck()

//this function call the above two, shuffles and deals the deck
function dealIt() {
  shuffleDeck();
  dealDeck();
}

//debugging for nnow
function mousePressed() {
  dealIt();
}