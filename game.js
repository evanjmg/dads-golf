var music = new Audio('./game-music.mp3');
var highScore = localStorage.getItem('highscore')
var storedTime = localStorage.getItem('time')
var time =  !isNaN(storedTime) ? storedTime : 0
console.log(time, 'YOO')
music.currentTime = !isNaN(time) ? parseInt(time, 10) : 0
setInterval(function () { 
  time++
  console.log(time)
  if (time > 70) {
    localStorage.setItem('time', String(1))
    music.currentTime = 1
  }
}, 1000)
$('document').ready(function(){
if (window.location.hash === '#reload') {
  
    $('#on-button').css('display', 'none')
    setTimeout(initializeGame, 0)
    if (highScore) {
      $('#high-amount').text(highScore)
    }
} else {
  $('#on-button').css('display', 'block')
}
})
function turnOn() {
  music.play()
  $('#on-button').css('display', 'none')
  $('#start-menu').css('display', 'block')
  $('#start-menu')[0].scrollIntoView()
}
function restartGame() {
  localStorage.setItem('time', time)
  window.location.hash = 'reload'
  window.location.reload()
}
function initializeGame() {
  music.play()
  $('.game-container').css('display', 'block')
  var menu = document.getElementById('start-menu')
  if (menu) menu.style.display = 'none'
  var canvasElem = document.getElementById("game");
var world = boxbox.createWorld(canvasElem);
var gif = new SuperGif({
  gif: document.getElementById('golfer'),
  loop_mode: false,
  auto_play: false,
  draw_while_loading: false,
  show_progress_bar: true,
  progressbar_height: 10,
  progressbar_foreground_color: 'rgba(0, 255, 4, 0.1)',
  progressbar_background_color: 'rgba(255,255,255,0.8)'
});

gif.load();
gif.pause();
var count = 0; 
var capturedCount = 0;
var isPressing = false
var isMoving = false

var hitsandtrap = 0
document.onkeyup = function (evt) {
  if (evt.keyCode == 32 && !isMoving) {
    gif.pause()
    var swing = new Audio('./golf-swing.mp3')
    swing.play();
    hitsandtrap = 0
    capturedCount = count
    isPressing = false
    var impulse = 500 - ((15 - capturedCount) * 10)
    player.applyImpulse(impulse, impulse / 200 * 20)
    isMoving = true
  }
}
document.onkeydown = function (evt) {
  if (evt.keyCode == 32 && !isMoving) {
    gif.play()
    isPressing = true
    count += 1
  } else if (evt.keyCode === 32) {
    world.camera({ x: 0, y: 0 })
    player.position({ x: 1, y: 0 })
    gif.move_to(0)
    isMoving = false
    restartGame()
  }
}
var i = 0
for(i; i < 10; i++) {
  world.createEntity({
    name: "background",
    shape: 'square',
    type: 'static',
    image: 'course-pixel.png',
    imageStretchToFit: true,
    width: 100,
    height: 20,
    x: i * 100,
    active: false,
    y: 4
  })
}

var player = world.createEntity({
  name: "player",
  shape: "circle",
  radius: 1,
  image: "golfball.png",
  imageStretchToFit: true,
  density: 5,
  x: 1,
});
world.onRender(function(ctx) {
        
  // update camera position every draw
  var p = player.position();
  var c = this.camera();
  var yards = Math.round(p.x)
  $('#amount').text(yards)
  if (highScore < yards) { 
    highScore = yards
    localStorage.setItem('highscore', highScore)
    $('#high-amount').text(highScore)
  }
  if (p.x - 8 < c.x) { 
      this.camera({x: player.position().x - 8});
  }
  else if (p.x - 12 > c.x) { 
      this.camera({x: player.position().x - 12});
  }
})
world.createEntity({
  name: "ground",
  shape: "square",
  type: "static",
  color: "rgb(0,100,0)",
  width: 10000,
  friction: 0.3,
  height: 2,
  y: 12
});

var block = {
  name: "block",
  name: 'poly',
  shape: 'polygon',
  color: "#f2dfc5",
  width: 4,
  friction: 3,
  height: 2,
  onImpact: function(entity, force) {
    if (entity.name() === "player" && !this.hasHit) {
      this.color("#d8bf9c");
      hitsandtrap++
      this.hasHit = true
      $('#trap-count').text(hitsandtrap)
    }
  }
};
var sandtraps = 100
while (sandtraps > 0) {
  world.createEntity(block, {
    x: 5 + 1000 * Math.random(),
    height: Math.random() * 5,
    width: Math.random() * 5
  });
  sandtraps--
}

}

