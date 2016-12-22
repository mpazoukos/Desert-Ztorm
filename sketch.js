// PRELOAD *START*
function preload() {
  soundOn = true;
  zombieImage = loadImage("zombie.png");
  blood = loadImage("blood.png");
  bg = loadImage("desert.jpg");
  character = loadImage("player.png");
  firegun = loadSound("gun.mp3");
  startimg = loadImage("starting.jpg");
  goresound = loadSound("splatter.mp3");
  themesound = loadSound("themesong.mp3");
  soundtrack = loadSound("doom.mp3");
}
// PRELOAD *END*

// SETUP *START*
function setup() {
  //weatherData = loadJSON('http://api.openweathermap.org/data/2.5/forecast/city?id=292968&APPID=1f0f3c23d64913fec6d78ef4bd7ebe15', gotData);
  createCanvas(displayWidth, displayHeight);
  damage = 3;
  collision = 30;
  b_speed = 12;
  zombieHealth = 6;
  p = new Player();
  //snowfall = new createsnow(createVector(displayWidth/3, -30));
  //snowfall1 = new createsnow(createVector(displayWidth/2, -30));
  //snowfall2 = new createsnow(createVector(3*displayWidth/4, -30));
  if (soundOn == true) {
    themesound.play();
  }
}

// SETUP *END*

// DRAW *START*
function draw() {
  if (start == false) {
    imageMode(CORNER);
    image(startimg, 0, 0);
    fill(255, 255, 255);
    textSize(40);
    text("CONTROLS:", 0.375*displayWidth, 1/3*displayHeight);
    textSize(20);
    text('MOVE WITH W A S D OR THE ARROWS', 0.3125*displayWidth, 0.5*displayHeight);
    text('SHOOT AND AIM WITH THE MOUSE', 0.3125*displayWidth, 0.66*displayHeight);
    textSize(40);
    text('PRESS ENTER TO START', 0.25*displayWidth, 0.725*displayHeight);
    textSize(15);
    text('Made by Christos Zoukos, credits to Shantanu Bhatia for media editing and Tarmo Korela for snow animation',0.2*displayWidth, 0.91667*displayHeight);
    text('New York University', 0.4375*displayWidth, 0.95833*displayHeight);
    if (keyIsDown(ENTER)) {
      start = true;
      if (soundOn == true) {
        themesound.stop();
        soundtrack.setVolume(0.3);
        soundtrack.play();
      }
    }
  } else {
    if (!soundtrack.isPlaying()) {
      soundtrack.setVolume(0.3);
      soundtrack.play();
    }
    if (lose == false) {
      // snowfall.addsnow();
      // snowfall.run();
      imageMode(CORNER);
      image(bg, 0, 0);
      p.createPlayer();
      var direction = createVector(mouseX, mouseY);
      //laser = (new Laser(p.x, p.y, direction));
      //laser.Laser();
      textSize(30);
      fill(0, 255, 0);
      stroke(0);
      text("Score: " + score, 6/7*displayWidth, 0.9*displayHeight);
      //text(temperature, 50,  0.9*displayHeight);
      // CREATING IN-GAME CONTROLS *START*
      if ((keyIsDown(UP_ARROW) || key == 'w') && p.y >= 0) {
        p.y = p.y - p.speed;
      }
      if (((keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW)) || (key == 'w' && key == 'd')) && p.y >= 0) {
        p.y = p.y - p.speed;
        p.x = p.x + p.speed;
      }
      if ((keyIsDown(RIGHT_ARROW) || key == 'd') && p.x <= displayWidth) {
        p.x = p.x + p.speed;
      }
      if ((keyIsDown(DOWN_ARROW) || key == 's') && p.y <= displayHeight) {
        p.y = p.y + p.speed;
      }
      if ((keyIsDown(LEFT_ARROW) || key == 'a') && p.x >= 0) {
        p.x = p.x - p.speed;
      }
      // CREATING IN-GAME CONTROLS *END*
      for (var i = 0; i < b.length; i++) {
        p.createPlayer();
        b[i].displayBullet();
        b[i].updateBullet();
        if (b[i].position.x > displayWidth || b[i].position.x < 0 || b[i].position.y > displayHeight || b[i].position.y < 0) {
          b.splice(i, 1);
        }
        p.createPlayer();
      }
      for (var i = z.length-1; i >=0; i--) {
        z[i].updateZombie();
        z[i].displayZombie();
        p.createPlayer();
        if (int(dist(p.x, p.y, z[i].position.x, z[i].position.y)) <= 45) {
          lose = true;
        }
        for (var j = 0; j < b.length; j++) {
          if (!b[j].hit && int(dist(b[j].position.x, b[j].position.y, z[i].position.x, z[i].position.y)) <= collision) {
            var bpos = createVector(z[i].position.x, z[i].position.y);
            z[i].hp = z[i].hp - damage; //DAMAGE*DAMAGE*DAMAGE*DAMAGE*
            println(z[i].hp);
            if (soundOn == true) {
              goresound.play();
            }
            if (z[i].hp <= 0) {
              z.splice(i, 1);
              score = score + 1;
            }
            b[j].hit = true;
            break;
          }
        }
      }
      var spawnChance = int(random(0, 100));
      if (spawnChance <= spawn) {
        var randomize = (1, 5);
        z.push(new Zombie(randomize));
        spawn = spawn + 0.02;
      }
      // snowfall.addsnow();
      // snowfall.run();
      // snowfall1.addsnow();
      // snowfall1.run();
      // snowfall2.addsnow();
      // snowfall2.run();
    } else {
      background(0);
      textSize(50);
      fill(200, 0, 0);
      stroke(0);
      text("YOU HAVE BEEN INFECTED", 0.09375*displayWidth, 1/3*displayHeight);
      text("GAME OVER", 0.3125*displayWidth, 0.5*displayHeight);
      text("FINAL SCORE: " + score, 0.275*displayWidth, 3/4*displayHeight);
      textSize(32);
      text("PRESS ENTER TO GO BACK TO THE MAIN MENU", 0.0375*displayWidth, 0.625*displayHeight);
      if (keyIsDown(ENTER)) {
        start = false;
        lose = false;
        score = 0;
        spawn = 0.01;
        if (soundOn == true) {
          soundtrack.stop();
        }
        p = new Player();
        //snowfall = new createsnow(createVector(displayWidth/3, -30));
        //snowfall1 = new createsnow(createVector(displayWidth/2, -30));
        //snowfall2 = new createsnow(createVector(3*displayWidth/4, -30));
        if (soundOn == true) {
          themesound.play();
        }
        b = [];
        z = [];
      }
    }
      
  }  
}
// DRAW *END*