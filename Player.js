// PART Γ: PLAYER CLASS *START*
function Player() {
  this.img = character;
  this.x = displayWidth/2;
  this.y = displayHeight/2;
  this.speed = 3.5;
  this.orientation;
  this.angle;
  this.hit = false;
  this.createPlayer = function() {
    imageMode(CENTER);
    push();
    translate(this.x, this.y);
    this.orientation = createVector(mouseX - this.x, mouseY - this.y);
    this.angle = this.orientation.heading(); // calculated the angle between mouseX, mouseY and this.x, this.y
    rotate(this.angle); // rotate image by this angle in order for the barrel to follow the mouse
    image(this.img, 0, 0);
    pop();

  };
}
// PART Γ: *END*