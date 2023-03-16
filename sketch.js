let ballSize = 99;
let txtSize = 41;
let growFactor = 0.2;
let textInput = 100;
let imgLaser, imgDNA, imgChemistry, imgScales, imgStars, audio, amp, volSize, myFont, inp;
let laser = dna = chemistry = scales = stars = game = false;
let laserCode = '1111';
let dnaCode = '2222';
let chemistryCode = '3333';
let starsCode = '4444';
let scalesCode = '5555';
let gameCode = 'FARTS';

function preload() {
  myFont = loadFont('Audiowide.ttf')
  audio = loadSound('glados.wav');
  getAudioContext().resume();
  imgLaser = loadImage('laser.png');
  imgDNA = loadImage('dna.png');
  imgChemistry = loadImage('chemistry.png');
  imgScales = loadImage('scales.png');
  imgStars = loadImage('stars.png');
}

function setup() {
  textFont(myFont);
  amp = new p5.Amplitude();
  createCanvas(1000, 600);
  frameRate(60);
  // inp.input(myInputEvent);
  background(30);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  if (!game){
    background(30);
    push();
    noFill();
    stroke(200);
    rect(width/2,height/2,400,100,20);
    fill(0,255,0);
    textSize(txtSize);
    textAlign(CENTER);
    text("Press to Begin",width/2,height/2+10);
    pop();
    if (txtSize >= 48 || txtSize <= 40){
      growFactor = growFactor * -1;
      }
      txtSize += growFactor;
  }
  if (game){
    let vol = amp.getLevel();
    volSize = map(vol,0,1,100,200);
    // Check if all puzzles are solved.
    if (laser && dna && chemistry && stars && scales){
      push();
      fill(0,255,0);
      textAlign(CENTER);
      textSize(50);
      text('Congratulations',width/2,100);
      pop();
    }
    // Draw puzzle boxes
    for (j = 0; j < 5; j++){
      fill(200);
      rect(width/2 - 300 + (150*j), height-100, 100, 100, 10);
      rect(width/2 - 300 + (150*j), height-180, 50, 50, 10);
    }
    imageMode(CENTER);
    push();
    fill(0);
    textSize(50);
    textAlign(CENTER);
    if (laser == true){
      image(imgLaser,width/2 - 300, height-100);
      text(gameCode[0],width/2 - 300, height-160);}
    if (dna == true){
      image(imgDNA,width/2 - 300 + 150, height-100);
      text(gameCode[1],width/2 - 150, height-160);}
    if (chemistry == true){
      image(imgChemistry,width/2, height-100);
      text(gameCode[2],width/2, height-160);}
    if (stars == true){
      image(imgStars,width/2 + 150, height-100);
      text(gameCode[3],width/2 + 150, height-160);}
    if (scales == true){
      image(imgScales,width/2 + 300, height-100);
      text(gameCode[4],width/2 + 300, height-160);}
    pop();
    fill(30);
    rect(width/2,height/2 - 100,150,150);
    fill(0,255,0);
    if (vol > 0){
      circle(width/2,height/2 - 100, volSize)
    }
    else{circle(width/2,height/2 - 100, ballSize);}
    if (ballSize >= 100 || ballSize <= 50){
      growFactor = growFactor * -1;
    }
    ballSize += growFactor;
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (inp.value() == laserCode){
      laser = true;
    }
    if (inp.value() == dnaCode){
      dna = true;
    }
    if (inp.value() == chemistryCode){
      chemistry = true;
    }
    if (inp.value() == starsCode){
      stars = true;
    }
    if (inp.value() == scalesCode){
      scales = true;
    }
    inp.value('');
  }
}

function mouseClicked() {
  if (!game){
    if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2 - 50 && mouseY < height/2 + 50){
      game = true;
      inp = createInput('');
      inp.size(textInput);
      inp.position(windowWidth/2-50,windowHeight/2);
      background(30);
      audio.play();
    }
  }
}

