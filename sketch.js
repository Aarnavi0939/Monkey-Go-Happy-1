var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground, InvisibleGround;
var GAMESTATE=0;
var PLAY=0;
var END=1;
var lives=0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600)
  monkey = createSprite(100, 200, 0, 0);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.125;
  
    


  InvisibleGround = createSprite(300, 310, 600, 10)
  InvisibleGround.visible = false;


  ground = createSprite(300, 310, 600, 10);
  
     FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  score=0;
}


function draw() {

background("light blue");
 
if(obstacleGroup.isTouching(monkey)){
  text("GAME OVER",300,300);
}
 if(ground.x<0) {
    ground.x=ground.width/2;
  }

   if(keyDown("space")&&monkey.y>100) {
        monkey.velocityY = -10;    
   }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
 
  monkey.collide(InvisibleGround);
 
if(FoodGroup.isTouching(monkey)){
  score=score+2;
  FoodGroup.destroyEach();
}
  
   spawnObstacle();
  spawnFood();
   
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 400,50);  
}

function spawnObstacle (){
  if(frameCount%300==0){
    
    obstacle = createSprite(300,290, 0,0);
  obstacle.addImage(obstaceImage);
  obstacle.scale = 0.15;
    
    obstacle.velocityX=-6;
    
    obstacle.lifetime=90;
    
    obstacleGroup.add(obstacle);
    
  } 
}

function spawnFood(){
  if (frameCount % 80 == 0) {
      var r=Math.round(random(120,200));
    banana = createSprite(300, r, 0, 0);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX=-6;
    banana.lifetime=90
    
    FoodGroup.add(banana);
  }
}