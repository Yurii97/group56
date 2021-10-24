console.log('clock');

const refs = {
  hourHand: document.querySelector('.hand-hour'),
  minHand: document.querySelector('.hand-min'),
  secsHand: document.querySelector('.hand-second'),
};

setTime();

console.dir(refs);

setInterval(setTime, 1000);

function setTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondsDegrades = (seconds / 60) * 360 + 90;
  const minutesDegrades = (minutes / 60) * 360 + 90;
  const hoursDegrades = (hours / 12) * 360 + 90;

  refs.secsHand.style.transform = `rotate(${secondsDegrades}deg)`;
  refs.minHand.style.transform = `rotate(${minutesDegrades}deg)`;
  refs.hourHand.style.transform = `rotate(${hoursDegrades}deg)`;
}
