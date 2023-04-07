let ballSize = 99;
let guessCounter = 0;
let txtSize = 41;
let growFactor = 0.2;
let textInput = 100;
let countdown = 2700; // 40 minutes in seconds
let imgLaser, imgDNA, imgChemistry, imgScales, imgStars, introClip, amp, volSize, myFont, inp, timer;
let laser = dna = chemistry = scales = stars = game = isAudioPlaying = false;
let hint = true;
let laserCode = '1111';
let dnaCode = '2222';
let chemistryCode = '3333';
let starsCode = '4444';
let scalesCode = '5555';
let gameCode = 'FARTS';

function preload() {
  myFont = loadFont('Audiowide.ttf')
  introClip = loadSound('audio/intro.mp3');
  laserClip = loadSound('audio/laser.mp3');
  dnaClip = loadSound('audio/dnaClip.mp3');
  chemistryClip = loadSound('audio/chemistryClip.mp3');
  scalesClip = loadSound('audio/massClip.mp3');
  starsClip = loadSound('audio/astronomyClip.mp3');
  hintClip = loadSound('audio/hintClip.mp3');
  clappingClip = loadSound('audio/clapping.wav');
  halfTimeClip = loadSound('audio/halfTimeClip.mp3');
  tenLeftClip = loadSound('audio/tenLeftClip.mp3');
  warningClip = loadSound('audio/warningClip.mp3');
  getAudioContext().resume();
  imgLaser = loadImage('images/laser.png');
  imgDNA = loadImage('images/dna.png');
  imgChemistry = loadImage('images/chemistry.png');
  imgScales = loadImage('images/scales.png');
  imgStars = loadImage('images/stars.png');
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
    background(30);
    push();
    textAlign(CENTER);
    textSize(30);
    text(convertSeconds(countdown), width/2, 50);
    pop();
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
    // Hint Button
    if (hint){
      push();
      noFill();
      stroke(0,255,0);
      rect(width-50,height-25,100,50, 10);
      textAlign(CENTER,CENTER);
      fill(0,255,0);
      textSize(30);
      text('HINT',width-50,height-25)
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
      laserClip.play();
    }
    else if (inp.value() == dnaCode){
      dna = true;
      dnaClip.play();
    }
    else if (inp.value() == chemistryCode){
      chemistry = true;
      chemistryClip.play();
    }
    else if (inp.value() == starsCode){
      stars = true;
      starsClip.play();
    }
    else if (inp.value() == scalesCode){
      scales = true;
      scalesClip.play();
      clappingClip.play();
    }
    else if (inp.value() != '') {
      guessCounter += 1;
      if (guessCounter == 5){
        warningClip.play();
      }
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
      // introClip.play();
      // introClip.onended(startTimer);
      startTimer();
    }
  }
  else {
    if (mouseX > width - 100 && mouseX < width && mouseY > height - 50 && mouseY < height && hint == true && isAudioPlaying == false){
      hint = false;
      isAudioPlaying = true;
      hintClip.play();
      hintClip.onended(audioSwitch);
    }
  }
}

function countdownTimer() {
  if (countdown > 0) {
    countdown--;
    if (countdown == 1350 && isAudioPlaying == false){
      halfTimeClip.play();
      isAudioPlaying = true;
      halfTimeClip.onended(audioSwitch);
    }
    if (countdown == 600 && isAudioPlaying == false){
      tenLeftClip.play();
      isAudioPlaying = true;
      tenLeftClip.onended(audioSwitch);
    } 
  } 
  else {
    clearInterval(timer);
  }
}

function convertSeconds(s) {
  let minutes = floor(s / 60);
  let seconds = s % 60;
  return nf(minutes, 2) + ":" + nf(seconds, 2);
}

function startTimer() {
  timer = setInterval(countdownTimer, 1000);
}

function audioSwitch() {
  isAudioPlaying = false;
}