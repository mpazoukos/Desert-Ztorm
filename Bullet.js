function Bullet(x, y, direction) {
  this.x = int(x);
  this.y = int(y);
  this.img = loadImage("bullet.png");
  this.direction = direction;
  this.position = createVector(this.x, this.y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.force = createVector(this.direction.x - this.position.x, this.direction.y - this.position.y);
  this.force.setMag(b_speed);
  this.acceleration.add(this.force);
  this.hit = false;

  this.updateBullet = function() {
    if (this.hit == false) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  };
  this.displayBullet = function() { // Bullet creation
    if (this.hit == false) {
      imageMode(CENTER);
      image(this.img, this.position.x, this.position.y);
    }
    if (this.hit == true) {
      imageMode(CENTER);
      image(blood, this.position.x, this.position.y);
    }
  };
}