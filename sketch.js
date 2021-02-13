var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstaceImage;
var FoodGroup, obstacleGroup;
var score,SurvivalTime;
var ground;
var PLAY = 1;
var END = 0;
var gameState = END;

function preload(){ 
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  FoodGroup=new Group()
  obstacleGroup=new Group()
  
}

function setup() {
  createCanvas(670,400);
   score=0;
   survivalTime=0;
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.2;
  
  ground=createSprite(0,400,1000,10);
  ground.velocityX=-7;
  ground.x=ground.width/2;
}


function draw() {
background("green");
    if(ground.x<0){
      ground.x=ground.width/2;
    }
  
   if(keyDown("space")&& monkey.y>=300){
    monkey.velocityY=-10;  
    }
  
    monkey.velocityY=monkey.velocityY+0.3;
    monkey.collide(ground);
    
  if(frameCount%200===0){
    fruits()
  }
  
  if(frameCount%300===0){
    obstacles()
  }
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+1;                          
  }
      if(monkey.isTouching(obstacleGroup)){   
        gameState = END;
        monkey.velocityX=0;
    }
  
 
  
  drawSprites();
 textSize(20);
 stroke("white");
 fill("blue");
 text("Score: "+ score, 500,50)
 
//survivalTime
textSize(20);
stroke("black");
fill("violet");
var SurvivalTime=Math.ceil(frameCount/frameRate());
text("SurvivalTime: "+survivalTime,100,50);
}

  
function fruits(){
    banana = createSprite(670,Math.round(random(170,230)),10,10); 
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.y = Math.round(random(125,215));
    banana.scale=0.1;
    FoodGroup.add(banana);
}
function obstacles(){ 
    obstacle = createSprite(670,380,10,10);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX =-4;    
    obstacle.lifetime=160;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
}


