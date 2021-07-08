var player, playerAnime, playerG, playerStop;
var scene,sceneImg;
var inv,inv2;
var oG,oA;
var GameOverImg;
var restartImg;
var ON = 1, OFF = 0;
var gameState = ON;
let back;
let jump;

var GO;
var restart;

var score = 0;


function preload(){
  playerAnime = loadAnimation("1.png","3.png","4.png","5.png","6.png","7.png","8.png");

sceneImg = loadImage("grass2.jpg")
  
back = loadSound("back.mp3")
  
GameOverImg = loadImage("g_o.png")

jump = loadSound("jump.wav")  
  
playerStop = loadAnimation("playerS.png")
 
restartImg = loadImage("restart.png")
  
oA = loadImage("oggg.png")
  oG = new Group();
}

function setup() {
 createCanvas(windowWidth,windowHeight)

 
 GO = createSprite(windowWidth/2,windowHeight*1/4,40,400)
 GO.addImage("gameFinish", GameOverImg)
GO.visible = false
 
player = createSprite(windowWidth*1/6,windowHeight*9/10,20,50)
player.addAnimation("running", playerAnime);
player.addAnimation("stop", playerStop)
player.scale = 3

restart = createSprite(windowWidth/2,windowHeight*1/2,40,400)
restart.addImage("restart", restartImg)
restart.visible = false
restart.scale = 0.25
  
  scene = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
scene.addImage("sceneop", sceneImg)
scene.scale =7


inv = createSprite(windowWidth*1/6,windowHeight*19/20,windowWidth*1000,10)
inv.visible = false

inv2 = createSprite(windowWidth*1/6,windowHeight*18/20,windowWidth*1000,10)
inv2.visible = false

player.debug = false
player.setCollider("circle",-10,0,20)


back.play()
back.loop()
}

function draw() {
 background(0)
  
  
//scene.depth = player.depth
  player.depth += 1 
  GO.depth += 1  
  restart.depth += 1
  
  if(gameState === ON)
 
 {
   score = score + Math.round(getFrameRate()/60);
   scene.velocityX = - (13 + 3* score/100)
  
  if (scene.x <= 0){
      scene.x = scene.width/2;
    }
  
  if(keyDown("space")&&player.isTouching(inv2))
    {
     player.velocityY = -20
      jump.play()
    }
  
  if(mousePressedOver(scene)&&player.isTouching(inv2))
    {
     player.velocityY = -20
      jump.play()
    }
  player.velocityY += 0.8
  player.collide(inv)
  
  
   spawn0()
  
  if(oG.isTouching(player))
  {
    gameState = OFF;
  }
} if(gameState === OFF)
{
  oG.setVelocityEach(0,0)
  player.setVelocity(0,0)
  scene.setVelocity(0,0)
  player.changeAnimation("stop", playerStop)
  
  
  oG.setLifetimeEach(-1)
  GO.visible = true
  restart.visible = true

  if(mousePressedOver(restart))
    {
     reset()
    }
  
}
  

  drawSprites()
  
 fill("blue")
  
 textFont("impact")
 textSize(30)
 text("SCORE : "+ score,windowWidth/1.3,windowHeight*0.34/4)
}


function reset() {
  gameState = ON
  player.changeAnimation("running", playerAnime)
  oG.destroyEach()
  score = 0
  GO.visible = false
  restart.visible = false
}
function spawn0() {
  if (frameCount % 200 === 0){
   var obstacle = createSprite(width,height*8.5/10,30,10);
   obstacle.velocityX = scene.velocityX + 5
   obstacle.addImage("obs", oA)
   obstacle.scale = 4
   obstacle.debug = false
   obstacle.setCollider("circle",0,0,23)
    //assign sca le and lifetime to the obstacle
      
    obstacle.lifetime = width*2;
   oG.add(obstacle)
   obstacle.scale = 3

   
 }
}