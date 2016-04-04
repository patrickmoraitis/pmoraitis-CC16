//To the Moon by Giacomo Leopardi, translated by Frederick Townsend
//https://en.wikisource.org/wiki/Poems_of_Giacomo_Leopardi/Poem_14

var lexicon;

//Array that stores the loaded text
var lines=[];

//Array that stores each word of the poem
var wordsOfPoem=[];

//Preload function loads .txt file in Array
function preload(){
  lines = loadStrings('toTheMoon.txt');
}

function setup() {
  createCanvas(400,600);
  
  lexicon = new RiLexicon();
  
  //Empty string which will store the poem for output
  poem = "";
  
  for(var i=0; i<lines.length; i++){
    poem += lines[i];
    poem += " FYC ";
  }
  
  wordsOfPoem = RiTa.tokenize(poem);
  
  //console.log(wordsOfPoem);
  
  for(var i=0; i<wordsOfPoem.length; i++){
    
    // console.log(RiTa.getPosTags(wordsOfPoem[i]));

    
    if(RiTa.getPosTags(wordsOfPoem[i]) == "nn"){
      wordsOfPoem[i] = lexicon.randomWord("nn");
      //wordsOfPoem[i] = lexicon.similarBySound(wordsOfPoem[i])[0];
    }
    else if(RiTa.getPosTags(wordsOfPoem[i]) == "jj"){
      wordsOfPoem[i] = lexicon.randomWord("jj");
    }
  }
  
  poem = "";

  //For loop turns lines array into a single poem string
  //each array element (line) gets seperated by a line break
  for(var i=0; i<wordsOfPoem.length; i++){
    
    if(wordsOfPoem[i] == "FYC"){
      poem += "\n";
    }else{
      poem += wordsOfPoem[i] + " ";
    }
  }
 
  text(poem, 0,0,width,height);
}