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
