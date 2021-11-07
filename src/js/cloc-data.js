
import { format} from 'date-fns'

const dataDay = document.querySelector('.date__day')
const mounth = document.querySelector('.date__month')
const timeRf = document.querySelector('.date__time')
// canst dayName = document.querySelector('')
console.log(format(new Date(), 'do'));
dataDay.textContent = format(new Date(), 'do EEE');
mounth.textContent = format(new Date(), 'LLLL');
setInterval(() => {    
    timeRf.textContent=format(new Date(), 'kk:mm:ss');
}, 1000);