var bird,birdImage;
var topPipe,bottomPipe,topPipeGroup,bottomPipeGroup;
var food,foodGroup;
var gameOver,restart;
var bg,back;

var PLAY = 1;
var START = 0;
var END = 2;
var gameState = START;
var pipeSpeed = -4;
var score = 0;

function preload(){
    bg = loadImage("images/back.gif");
    birdImage = loadImage("images/bird.png");
    pipeUp = loadImage("images/pipeNorth.png");
    pipeDown = loadImage("images/pipeSouth.png");
    restartImage = loadImage("images/restart.png");
    gameOverImage = loadImage("images/gameOver.png");
    startBg = loadImage("images/back2.png");
    foodImage = loadImage("images/food.png");

    wingSound = loadSound("images/wing.mp3");
    endSound = loadSound("images/hit.mp3");
    //foodSound = loadSound("iamges/checkPoint.mp3");
}

function setup(){
    createCanvas(windowWidth,windowHeight);

    back = createSprite(0,0,width*5,height);
    back.addImage(bg);
    back.scale = 7;

    bird = createSprite(width/2-100,height/2);
    bird.addImage(birdImage);

    ground=createSprite(displayWidth/2,displayHeight-100,10000,10);
    ground.visible=false;

    topPipeGroup=new Group();
    bottomPipeGroup=new Group();
    foodGroup=new Group();


    textSize(30);
    textFont("Algerian");
    fill("red");
    stroke("black");
}

function draw(){

    if(gameState===START){
        background(startBg);
        back.visible=false;
        bird.visible=false;
        var heading=createElement("h1");
        heading.html("Flappy Bird");
        heading.position(width/2-100,100);
        var msg=createElement("h2");
        msg.html("Welcome to FLAPPY BIRD game ! Tap the 'Play' button given below to start . Press space key to make the bird fly. The faster you press the space key , the higher you go . Each time you press space key , it represents a wing flap and higher flight . Once you stop , you drop towards the ground . Your task is to fly from in between the pipes and score more.Each time you cross from between the pipes , you get 1 score . (BONUS score if you eat the food also.) If you fall on ground or touch any of the pipes , you lose.....You can restart the game by pressing the restart button. ENJOOYYY!!!!");
        msg.position(width/2-635,height/2-200);
        var tell=createElement("h2");
        tell.html("Click on play nowww!!!");
        tell.position(width/2-100,height/2+20);

        var button = createButton("Play");
        button.position(width/2,height/2);
        button.mousePressed(()=>{
            removeElements();
            gameState = PLAY;
        })
    }

    if(gameState===PLAY){
        back.visible=true;
        bird.visible=true;

        back.velocityX=-2;

        if(keyDown("space")){
            bird.velocityY=-10;

        }

        bird.velocityY=bird.velocityY+1;

        if(back.x<0){
            back.x=back.width/2
        }
        spawnObstacles();
        
        if(foodGroup.isTouching(bird)){
            for(var k = 0; k < foodGroup.length; k++){
                if(foodGroup[k].isTouching(bird)){
                    score=score+1;
                    foodGroup[k].destroy();
                }
            }
        }
        if(topPipeGroup.isTouching(bird)||bottomPipeGroup.isTouching(bird)){
            gameState=END;
            endSound.play();
        }
        drawSprites();
    }


}

function spawnObstacles(){

    if(topPipeGroup.length===0 || topPipe.x<displayWidth-420){
        var randomHeight=random(80,350);

        topPipe=createSprite(displayWidth-100,randomHeight-190);
        topPipe.addImage(pipeUp);

        topPipe.velocityX=pipeSpeed;

        bottomPipe=createSprite(topPipe.x,displayHeight-180+(randomHeight-190));
        bottomPipe.addImage(pipeDown);

        bottomPipe.velocityX=topPipe.velocityX;

        topPipe.lifetime=displayWidth/2;
        bottomPipe.lifetime=displayWidth/2;

        if(Math.round(random(1,6))%2===0){
            var food=createSprite(topPipe.x,randomHeight+random(20,170));
            food.addImage(foodImage);
            food.scale=0.2;
            food.velocityX=topPipe.velocityX;

            foodGroup.add(food);
        }
        topPipeGroup.add(topPipe);
        bottomPipeGroup.add(bottomPipe);
    }
        
}