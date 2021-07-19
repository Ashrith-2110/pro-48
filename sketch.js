//create all the global variables needed
var gameState;//"start,play,end"
var ninja
var ninjaJump , ninjaWalk , ninjaDie
var fruit,fruit1img,fruit2img;
var weapon1,weapon2,weapon3,weapon4,weapon1img,weapon2img
var enemy,enemyimg
var score =0;
var backgroundimg;
var edges
// load all your images
function preload(){
backgroundimg=loadImage("images/background_1.png")
ninjaWalk=loadImage("images/w1.png");
ninjaDie= loadImage("images/die.png")
ninjaJump =loadImage("images/jump3.png")
weapon1img= loadImage("images/weapon1.png")
weapon2img= loadImage("images/weapon4.png")
enemyimg =loadImage("images/enemy1.jpg")
fruit1img=loadImage("images/fruit2.png");
fruit2img=loadImage("images/fruit3.png");
}


//ninjaWalk= loadAnimation("images/w1.png","images/w8.png")
//ninjaDie= loadAnimation("images/die.png")

//test = loadImage("images/w8.gif")


//w1,w8,walk are ninja walk
//die is ninj die
//jump,jump2,jump3,jump4 are ninja jump
//weapons weapon1,spcial weapon
//fruit1,fruit2 is fruits image


//declare all your sprite objects 
function setup() {

  createCanvas(1200,800);

    bg= createSprite(600,400,1200,800)
    bg.addImage(backgroundimg)
    bg.scale=3

    ninja=  createSprite(400, 200, 50, 50);
    ninja.addImage(ninjaWalk);

    gameState="play";

//ninja.addAnimation("walk",ninjaWalk);
//ninja.addAnimation("Die",ninjaDie);
//ninja.addAnimation("Jump",ninjaJump);

// create sprites for weapon1,2,3,4,
    weapon1=createSprite(50,100,10,10)
    weapon1.addImage(weapon1img);
    weapon1.scale =0.3;

    weapon2=createSprite(400,100,10,10)
    weapon2.addImage(weapon2img);

    weapon1.visible =false;
    weapon2.visible =false;

    //create a weapon group and add all the 1,2,3,4 in them
    weaponGroup=new Group()
    weaponGroup.add(weapon1)
    weaponGroup.add(weapon2)

    //create a sprite for enenmy,add image
    enemy = createSprite(200,100,20,30)
    enemy.addImage(enemyimg);
    enemy.scale=0.2;

    FruitGroup=new Group();
    edges=createEdgeSprites();

}

function spawnFruits(){
    if(World.frameCount % 120 === 0){
    fruit = createSprite(500,500,20,20);
    fruit.x = Math.round(random(0,1200));
    fruit.y = Math.round(random(0,800));
    fruit.addImage(fruit1img);
    FruitGroup.add(fruit);
    fruit.lifetime = 400;

  }
}

//add the functionality of objects
function draw() {

  if (gameState==="start"){
  } else if(gameState==="play"){
    spawnFruits();

    enemy.velocityX= random(0,2)
    enemy.velocityY= random(0,2)
    console.log(enemy.velocityX)
    // movement of ninja
    if(keyDown("U") || (keyDown("UP_ARROW")))
      {
      /*console.log("Ashrith")*/
      ninja.y=ninja.y-20
      }
      
      if(keyDown("DOWN_ARROW") || (keyDown("D"))){
        ninja.y=ninja.y+20
      }

      if(keyDown("RIGHT_ARROW") || (keyDown("R"))){
        ninja.x=ninja.x+20
      }

      if(keyDown("LEFT_ARROW") || (keyDown("L"))){
        ninja.x=ninja.x-20
      }

      ninja.bounceOff(edges) 
      // condition for ninja touching fruits
      if(FruitGroup.isTouching(ninja)){
        score =score+10;
        FruitGroup.destroyEach();
      }
      if(enemy.isTouching(ninja)){
        // ninja is dead one life is lost
        //ninja.changeAnimation("Die",ninjaDie);
        ninja.addImage(ninjaDie);
        score=0
        gameState="end"
      }
       // to display weapons randomly 
      var r = Math.round(random(1,2))
       if(r === 1){
        weapon1.visible=true
      }                                                                                                                                                                                                                                                                              
      if(r === 2){
        weapon2.visible=true
        }

      if(weaponGroup.isTouching(ninja)){
         if(weapon1.visible=true){
            score =score+10;
            ninja.x= weapon1.x-30
            ninja.y= weapon1.y-40
            weapon1.destroy()
            }
          if(weapon2.visible=true){
            weapon2.visible=false;
            score =score+20;
            ninja.x= weapon1.x-30
            ninja.y= weapon1.y-40
            weapon2.destroy()
              }
    
        }
      } else if(gameState==="end"){

       ninja.velocityX=0
       ninja.velocityY=0
       enemy.velocityX=0
       enemy.velocityY=0
       
      }
      
      drawSprites();
      textSize(25)
      if (gameState==="end"){
        text("game_over",600,400)}
      text("Score : " +score, 1000,100)
}