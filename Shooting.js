// PART Z: CREATING THE TRIGGER *START*
function mouseReleased() {
  var direction = createVector(mouseX, mouseY);
  if (soundOn == true) {
  firegun.play();
  }
  b.push(new Bullet(p.x, p.y, direction));
}
// PART Z: CREATING THE TRIGGER *END*