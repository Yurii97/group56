import { Skycons } from './skycons'
let long;
let lat;
const refs = {
    tempDegr: document.querySelector('.temperature-degree'),
    locTimezone: document.querySelector('.location-timezone'),
    tempDesk: document.querySelector('.temperature-description'),
    icon: document.querySelector('.icon'),
    skyIcon: document.querySelector('#icon1'),
    digreeBox: document.querySelector('.digree-box'),
    celciumDegr: document.querySelector('.digree-box span'),
    bodyBgr: document.querySelector('body'),
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        getGeoposition(long, lat);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5c8dab899c73e9fec8517804e94f0209`
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            };
            return response.json();
        }).then(data => {
            const { main, weather, name } = data;
            
    
            refs.locTimezone.textContent = name;
            refs.tempDesk.textContent = weather[0].main
            
            getIcon(weather[0].icon).then(iconUrl => {
                refs.icon.src = iconUrl;
            });
            setIcon(weather[0].main);
            let celcius = Math.floor(main.temp - 273.15);
            let farengate = Math.floor(((main.temp - 273.15) * 9) / 5 + 32);
            refs.tempDegr.textContent = farengate;
            refs.digreeBox.addEventListener('click', () => {
                if (refs.celciumDegr.textContent === 'F') {
                    refs.celciumDegr.textContent = 'C';
                    refs.tempDegr.textContent = celcius;
                } else {
                    refs.celciumDegr.textContent = 'F';
                    refs.tempDegr.textContent = farengate;
                };
            });
        });
    });
};
function getIcon(idIcon) {
    const url = `https://openweathermap.org/img/wn/${idIcon}@2x.png`;
    return fetch(url).then(response => response.url);
};
function setIcon(icon) {
    var skycons = new Skycons({ "color": "pink" });
    const currentIcon = icon.toUpperCase();
    skycons.play();
    skycons.set(refs.skyIcon, Skycons.PARTLY_CLOUDY_DAY);
};
const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
function getGeoposition(long, lat) {
    // const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=d4683b09d0c94ec0aebf0b2e043decbf`;
    const url = 'https://pixabay.com/api/?image_type=backgrounds&orientation=horizontal&q=kiev&per_page=5&key=16190641-6f6d4120eafc733567c1d4bc7'
    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        };
        return response.json();
    }).then(data => {
        const randomindex = randomIntegerFromInterval(0, data.hits.length - 1)
        console.log(randomindex);
        refs.bodyBgr.style = `background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
    url('${data.hits[randomindex].largeImageURL}') center fixed; background-size: cover;`;
        console.log(data.hits[0].largeImageURL);

    });
};
