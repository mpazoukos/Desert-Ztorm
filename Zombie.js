function Zombie(randomize) {
  this.randomize = randomize;
  this.randomize = floor(random(1, 5));
  if (this.randomize == 1) {
    this.x = 0;
    this.y = floor(random(0, displayHeight));
  } else if (this.randomize == 2) {
    this.x = floor(random(0, displayWidth));
    this.y = 0;
  } else if (this.randomize == 3) {
    this.x = displayWidth;
    this.y = floor(random(0, displayHeight));
  } else {
    this.x = floor(random(0, displayWidth));
    this.y = displayHeight;
  }
  this.hp = zombieHealth;
  this.img = zombieImage;
  this.position = createVector(this.x, this.y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  this.updateZombie = function() {

    var desired = createVector(p.x - this.position.x, p.y - this.position.y);
    desired.setMag(1);
    var force = createVector(desired.x - this.velocity.x, desired.y - this.velocity.y);
    force.limit(0.1);
    this.acceleration.add(force);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };
  this.displayZombie = function() { // Zombie creation
  
    imageMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    this.orientation = createVector(p.x - this.position.x, p.y - this.position.y);
    this.angle = this.orientation.heading(); 
    rotate(this.angle); 
    image(this.img, 0, 0);
    pop();
  };
}