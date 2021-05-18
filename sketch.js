var dog, happydog;
var foodS, foodStock;
var database;
var dogImage1,dogImage2;

function preload()
{
	dogImage1 = loadImage("images/dogImg.png")
  dogImage2 = loadImage("images/dogImg1.png")
}

function setup() {
	database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250,50,50)
  dog.addImage(dogImage1);
  dog.scale = 0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87)
  if (keyWentDown(UP_ARROW)) {
    writestock(foodS);
    dog.addImage(dogImage2);
  }
  drawSprites();
  textSize(30);
  text("reamianing Food " + foodS,100,100)
}

function readStock(data){
  foodS=data.val();
}

function writestock(x){
  
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  }
      )
}