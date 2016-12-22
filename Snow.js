var snow = function(position) {
  this.acceleration = createVector(0, 0.01);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  //this.time = 0;
};

snow.prototype.run = function() {
  this.update();
  this.display();
};

snow.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  //this.time += 1;
};

snow.prototype.display = function() {
  stroke(255);
  strokeWeight(2);
  fill(255);
  ellipse(this.position.x, this.position.y, 2, 2);
};

snow.prototype.snowkilled = function(){
  if (this.position.y > height + 20) {
    return true;
  } else {
    return false;
  }
};

var createsnow = function(position) {
  this.origin = position.copy();
  this.snowflakes = [];
};

createsnow.prototype.addsnow = function() {
  if (random(1) < 0.1) {
    this.snowflakes.push(new snow(this.origin));
  }
};

createsnow.prototype.run = function() {
  for (var x = this.snowflakes.length-1; x > 0; x--) {
    var y = this.snowflakes[x];
    y.run();
    if (y.snowkilled()) {
      this.snowflakes.splice(x,1);
    }
  }
};