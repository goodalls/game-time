function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);