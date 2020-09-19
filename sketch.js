var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running
var banana ,bananaImage, stone, stoneImage
var FoodGroup, stoneGroup
var score
var ground
function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,500);

  monkey = createSprite(40,400,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(250,435,700,10)
  ground.velocityX=-4;
  ground.x=ground.width /2;
  ground.visible = false;
  
  //console.log(ground.x);

  FoodGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
  
  
}


function draw() {
background("255");
  
    text("Score: "+ score, 500,50);
  score = score + Math.round(getFrameRate()/60);
  
  if(gameState === PLAY){
   
  if(keyDown("space")&& monkey.y > 390.6) {
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  console.log(monkey.y);
  }
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
  monkey.collide(ground);
  
  if(monkey.isTouching(FoodGroup)){
     
    FoodGroup.destroyEach();
    score = score +1;
     }
  
  if (monkey.isTouching(stoneGroup)){
  
    gameState = END;
  
  }
  
  
  else if(gameState === END){
    
    ground.velocityX = 0;
    monkey.velocityY=0;
    monkey.collide(stoneGroup);
  }
  drawSprites();
  
  food();
  
  obstacle();
}

function food(){
if (frameCount % 80 === 0 ){
  banana = createSprite(160,420,15,40);  
  banana.addImage(bananaImage);
  banana.velocityX=-2;
  banana.scale = 0.1;
  banana.y = Math.round(random(320,400)); 
  banana.lifetime = 250;
  FoodGroup.add(banana);
} 
}

function obstacle(){
if(frameCount % 200 === 0 ){
stone = createSprite(300,415,15,40);
stone.addImage(stoneImage);
stone.velocityX=-4;
stone.scale = 0.1;  
stoneGroup.add(stone);

}
}



