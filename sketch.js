//declaring variables
var monkey, ground, banana, rock, invisible, gameOver, restart, healthImg, health1, health2;
var rockGroup, bananaGroup;
var monkeyAnimation, bananaImg, rockImg, groundImg, gameOverImg, restartImg;
var score = 0, health = 2, play = 0, end = 1, gameState = 0;

function preload(){
 //loading animations and images 
  monkeyAnimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImg = loadImage("banana.png");
  
  rockImg = loadImage("stone.png");
  
  groundImg = loadImage("jungle.jpg");

  healthImg = loadImage("pixel-heart-2779422_960_720.webp");
  
  gameOverImg = loadImage("game over.png");
  
  restartImg = loadImage("restart.png");
}
function setup() {
  createCanvas(600, 280);
  //creating sprites
  invisible = createSprite(200,265,400,5);
  
  ground = createSprite(200,40,400,400);
  ground.addImage("ground",groundImg);
  ground.setVelocity(-3,0);
  ground.x = ground.width/2;          
  
  monkey = createSprite(70,140,10,10);
  monkey.addAnimation("monkey",monkeyAnimation);
  monkey.scale = 0.09;
  monkey.setVelocity(0,6);
  
  rockGroup = createGroup();
  bananaGroup = createGroup();
  
  health1 = createSprite(20,20);
  health1.addImage("heart1",healthImg);
  health1.scale = 0.06;
  
  health2 = createSprite(59,20);
  health2.addAnimation("heart2",healthImg);
  health2.scale = 0.06;
  
  gameOver = createSprite(300,130,10,10); 
  gameOver.addImage("GameOver",gameOverImg);
  gameOver.scale = 0.7;
  gameOver.visible = false;

  restart = createSprite(300,250,10,10);
  restart.addImage("restartButton",restartImg);
  restart.scale = 0.2;
  restart.visible = false;
}

function draw() {
  //clearing background
  background(220);
  //making edges
  edges = createEdgeSprites();
  //makes the monkey to run logically
  monkey.collide(invisible);
  
  if(gameState===play) {
  //setting ground velocity
     ground.setVelocity(-3,0);
     
    if(ground.x<100) {
     
      ground.x=ground.width/2;
     }
    //jump for the monkey
    if(keyDown("space") && monkey.y >= 220) {
      
      monkey.velocityY=-10;
     }
    //gravity
  monkey.velocityY = monkey.velocityY + 0.5;
    
    if(monkey.isTouching(bananaGroup)) {
     
      bananaGroup.destroyEach();
      score = score +2;
     }
  //calling the functions  
  spawnObstacles();
  spawnBanana();
    
  monkeyLife();
  
    if(health===0){
     //changing the gamestate to end
      gameState="end";
     }
    }
  else if(gameState==="end") {
     monkey.visible = false;
     gameOver.visible = true;
     restart.visible = true;
     rockGroup.destroyEach();
     bananaGroup.destroyEach();
     ground.setVelocity(0,0);
  
  if(mousePressedOver(restart)){
   reset();
   }
  }
  
  drawSprites();
  fill("white");
  textSize(18);
  text("Your Score: "+score,450,20);
}
  
function spawnObstacles() {
  
  if (frameCount%200===0) {
    rock = createSprite(610, 247,10,10);
    rock.x = 610 ;
    rock.addImage("stone",rockImg);
    rock.velocityX=-5;
    rock.lifetime=122;
    rock.scale=0.18;
    rock.setCollider("rectangle",0,0,350,350);
    rockGroup.add(rock);
  }
}

function spawnBanana() {
  if (frameCount%120===0) {
    banana = createSprite(610, 347,10,10);
    banana.x = 610;
    banana.y = random(100,150);
    banana.addAnimation("banana",bananaImg);
    banana.velocityX = -5;
    banana.lifetime = 122;
    banana.scale = 0.08;
    bananaGroup.add(banana);
  }
}

function monkeyLife() {
  if(monkey.isTouching(rockGroup)) {
  health = health -1;
  rockGroup.destroyEach();
}
  if(health === 2) {
    health1.visible = true;
    health2.visible = true;
     }
  if(health === 1) {
    monkey.scale = 0.05;
    health2.visible = false;
     }
  
  if(health === 0){
     health1.visible = false;
     } 
  
  switch(score){
    case 10: monkey.scale = +0.02;
       break;
    case 20: monkey.scale = +0.03;
       break;
    case 30: monkey.scale = +0.04;
       break;
    case 40:monkey.scale = +0.05;
       break; 
    case 50:monkey.scale = +0.06;
       break;
    case 60:monkey.scale = +0.07;  
       break;
    case 70:monkey.scale = +0.1;
       break;
    case 80:monkey.scale = +0.1;
       break;
         }
}


function reset(){
  gameState = play;
  monkey.visible = true;
  monkey.scale = 0.09;
  gameOver.visible = false;
  restart.visible = false;
  ground.setVelocity(-5,0);
  score = 0;
  health = 2;
  
}