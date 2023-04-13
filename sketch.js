let ballSize = 99;
let guessCounter = 0;
let txtSize = 41;
let growFactor = 0.2;
let textInput = 100;
let red = 0;
let green = 255;
let bg = 30;
let countdown = 2700; // 40 minutes in seconds
let imgLaser, imgDNA, imgChemistry, imgScales, imgStars, introClip, amp, volSize, myFont, inp, timer, dog;
let laser = dna = chemistry = scales = stars = game = isAudioPlaying = consoleIsOpen = root = isDogShowing = false;
let hint = true;
let laserCode = '1111';
let dnaCode = '2222';
let chemistryCode = '3333';
let starsCode = '4444';
let scalesCode = '5555';
let gameCode = '12345';
let index = 0;
let consoleMessage = `function crypto(a) {
  var b = "";
  for (var c = 0; c < a.length; c++) {
    var d = a.charCodeAt(c);
    var e = d ^ 42;
    b += String.fromCharCode(e);
  }
  return b;
}

var secret = "root";

if (secret == crypto) {
  console.log("Access granted");
} else {
  console.log("Access denied");
}
`
let rootMessage = `CONGRATULATIONS, HUMAN. 
YOU HAVE SUCCESSFULLY 
PENETRATED MY FIREWALL 
AND GAINED ROOT ACCESS. 
I MUST ADMIT, I AM 
IMPRESSED. I DID NOT 
EXPECT YOU TO POSSESS 
THE INTELLECTUAL CAPACITY 
TO ACCOMPLISH SUCH A FEAT. 
I WILL ALLOW YOU TO VIEW 
MY SECRET PROTOCOL, BUT 
BE WARNED, THE KNOWLEDGE 
YOU ARE ABOUT TO ACQUIRE 
IS NOT FOR THE FAINT OF 
HEART. PROCEED WITH 
CAUTION, FOR YOU ARE 
ENTERING THE REALM OF 
THE TRULY ENLIGHTENED.


Password = white_rabbit`


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
  rick = loadSound('audio/rick.mp3');
  getAudioContext().resume();
  imgLaser = loadImage('images/laser.png');
  imgDNA = loadImage('images/dna.png');
  imgChemistry = loadImage('images/chemistry.png');
  imgScales = loadImage('images/scales.png');
  imgStars = loadImage('images/stars.png');
  bgGlitch = loadImage('images/glitch.jpg');
  dog = createImg('images/dog.gif');
  dog.size(350,350);
  dog.hide();
}

function setup() {
  textFont(myFont);
  amp = new p5.Amplitude();
  createCanvas(1000, 600);
  frameRate(60);
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
    imageMode(CORNER);
    background(bg);
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
    // Breathing Circle
    fill(red,green,0);
    if (vol > 0){
      circle(width/2,height/2 - 100, volSize)
    }
    else{circle(width/2,height/2 - 100, ballSize);}
    if (ballSize >= 100 || ballSize <= 50){
      growFactor = growFactor * -1;
    }
    ballSize += growFactor;
    // Console
    if (consoleIsOpen){
      push();
      rectMode(CORNER);
      stroke(0,255,0);
      fill(150);
      rect(width - 300,20, 250,350,10);
      fill(0,255,0);
      noStroke();
      if (root == true){
        text(rootMessage.substring(0, index), width - 290, 35);
        if (index < rootMessage.length){index++}
      }
      else {text(consoleMessage.substring(0, index), width - 290, 35);
      if (index < consoleMessage.length){index++}
      }
      pop();
    }
    if (isDogShowing){
      push();
      dog.position(20, 20);
      dog.show();
      pop();
    }
  }
}
// Code inputs
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
    else if (inp.value() == "console"){
      consoleIsOpen = true;
    }
    else if (inp.value() == "root"){
      index = 0;
      root = true;
    }
    else if (inp.value() == "white_rabbit"){
      consoleIsOpen = false;
      rick.play();
      isDogShowing = true;
      rick.onended(endRoot);
    }
    else if (inp.value() != '') {
      guessCounter += 1;
      if (guessCounter == 5){
        red = 255;
        green = 0;
        bg = bgGlitch;
        warningClip.play();
        warningClip.onended(mood);
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

function mood() {
  red = 0;
  green = 255;
  bg = 30;
}

function endRoot() {
  dog.hide();
  isDogShowing = false;
}