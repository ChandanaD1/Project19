var bananaImage,obstacleImage,backImage,monkeyImage;
var scene,invisibleGround,monkey,banana,obstacle,obstacleGroup,bananaGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  backImage = loadImage("jungle.jpg");
  
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png")

}

function setup() {
  createCanvas(400, 400);
  
  scene = createSprite(200,200,400,400);
  scene.addImage("ground", backImage);
  scene.scale = 0.8;
  scene.velocityX = -10;
  scene.visibility = false;
  
  monkey = createSprite(50,340,20,20);
  monkey.addAnimation ("running", monkeyImage);
  monkey.scale = 0.2;
  
  invisibleGround = createSprite(200,390,400,5);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(255);
  fill("black");
  textSize(15);
  
  if (scene.x < 0 && gameState == PLAY) {
    scene.x = 385;
  }
  
  if(keyDown("space") && monkey.y >= 300 && gameState == PLAY){
    monkey.velocityY = -13;
    //playSound("jump.mp3", false);
  }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.7;

  //stop trex from falling down
  monkey.collide(invisibleGround);
  
  if(monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 1;
  }

  if(monkey.isTouching(obstacleGroup)) {
    gameState = END;
  }
  
  if(gameState == END) {
    STOP();
    text("press r to restart", 150,200);
  }
  
  if(keyDown("r")) {
    scene.velocityX = -10;
    score = 0;
    gameState = PLAY;
  }
  
  BANANA();
  OBSTACLE();
  
  drawSprites();
  
  text("Score: " + score,300,50);
  
  if(gameState == END) {
    STOP();
    text("press r to restart", 150,200);
  }
}

function BANANA() {
  if (World.frameCount % 80 == 0) {
    var rand = Math.round(random (150,250));
    var banana = createSprite(420,rand,10,10);
    banana.velocityX = -10;
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.lifetime = 45;
    bananaGroup.add(banana);
  }
}

function OBSTACLE() {
  if (World.frameCount % 100 == 0) {
    var obstacle = createSprite(420,370,10,10);
    obstacle.addImage("stone", obstacleImage);
    obstacle.scale = 0.3;
    obstacle.setCollider("rectangle",0,0,50,50);
    obstacle.velocityX = -10;
    obstacle.lifetime = 45;
    obstacleGroup.add(obstacle);
  }
}

function STOP() {
  scene.velocityX = 0;
  scene.visibility = false;
  bananaGroup.velocityX = 0;
  obstacleGroup.velocityX = 0;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
}
