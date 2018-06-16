var gif = new SuperGif({
  gif: document.getElementById('example'),
  loop_mode: 'auto',
  auto_play: true,
  draw_while_loading: false,
  show_progress_bar: true,
  progressbar_height: 10,
  progressbar_foreground_color: 'rgba(0, 255, 4, 0.1)',
  progressbar_background_color: 'rgba(255,255,255,0.8)'

});


gif.load(function(){
  document.getElementById("controller-bar").style.visibility = 'visible';
  loaded = true;
  console.log('loaded');
});


$('button#backward').click(function(){
  console.log('current: ', gif.get_current_frame());
  var total_frames = gif.get_length();
  gif.pause();
  if(gif.get_current_frame() == 0) {
    gif.move_to(total_frames-1);
  } else {
    gif.move_relative(-1);
  }
  console.log('next: ', gif.get_current_frame());
})


$('button#play').click(function(){
  console.log('iam play');
  if(gif.get_playing()){
    gif.pause();
  } else {
    gif.play();
  }
})

$('button#forward').click(function(){
  console.log('current: ', gif.get_current_frame());
  gif.pause();
  gif.move_relative(1);
  console.log('next: ', gif.get_current_frame());
})