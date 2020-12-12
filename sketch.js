const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var slingshot;

var score = 0;

function preload() {
    //getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(400,370,300,10);
    var polygon_options = {
        restitution: 1,
        density: 1,
        friction: 1
    }
    polygon = Bodies.circle(150,150,40,polygon_options)
    World.add(world, polygon)

    box1 = new Box(330,235,30,40)
    box2 = new Box(360,235,30,40)
    box3 = new Box(390,235,30,40)
    box4 = new Box(420,235,30,40)
    box5 = new Box(450,235,30,40)
    box6 = new Box(360,195,30,40)
    box7 = new Box(390,195,30,40)
    box8 = new Box(420,195,30,40)
    box9 = new Box(390,155,30,40)


    slingshot = new SlingShot(polygon,{x:150, y:170});
}

function draw(){
   // if(backgroundImg)
        background("black");
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display()
    box2.display()
    box3.display()
    box4.display()
    box5.display()
    box6.display()
    box7.display()
    box8.display()
    box9.display()

    ground.display()
    fill("purple")
    ellipseMode(CENTER)
    ellipse(polygon.position.x,polygon.position.y,40,40)
    slingshot.display();    
    
}

function mouseDragged(){
       Matter.Body.setPosition(polygon, {x: mouseX , y: mouseY});
}
function mouseReleased(){
    slingshot.fly();
}

function keyPressed(){
    if(keyCode === 32){
       Matter.Body.setPosition(polygon, {x: 200 , y: 50});
       slingshot.attach(polygon);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}