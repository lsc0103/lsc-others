// Minimal WeChat Mini Game entry point
const ctx = canvas.getContext('2d')

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#0a74da'
  ctx.fillRect(50, 50, 100, 100)
  requestAnimationFrame(loop)
}

loop()
