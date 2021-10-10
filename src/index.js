import './sass/main.scss';

const canvas = document.querySelector('#draw');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#bada55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(ev) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(ev.offsetX, ev.offsetY);
  ctx.stroke();
  [lastX, lastY] = [ev.offsetX, ev.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }

  // console.log(hue);
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', e => {
  isDrawing = true;
});
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
// ======================

const PLAYER_TIME_ON_EXIT = 'videoplayer-current-time';

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// console.log(Player);

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('play', onVideoPlay);

function onVideoPlay() {
  //   console.log('Ку-ку');
  const exitTime = localStorage.getItem(PLAYER_TIME_ON_EXIT);

  if (exitTime) {
    player.setCurrentTime(exitTime);
  }
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(data) {
  player.getCurrentTime().then(seconds => localStorage.setItem(PLAYER_TIME_ON_EXIT, seconds));
}
