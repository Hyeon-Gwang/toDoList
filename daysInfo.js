const weather = document.querySelector('.weather')
const date = document.querySelector('.date')

const API_KEY = 'f2c2cd30af286cab34a645ff281e1f31'
const COORDS = 'coords'

// show date
const options = {weekday: 'long', month: 'short', day:'numeric'}
const today = new Date()

date.innerHTML = today.toLocaleDateString('en-us', options)

// show weather
function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response) {
            return response.json()
        }).then(function(json) {
            const temperature = json.main.temp
            const place = json.name
            weather.innerText = `${temperature} @ ${place}`
        })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSucces() {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    }

    saveCoords(coordsObj)
    getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log('failed to get current position ㅜㅜ');
}

function askedForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

window.onload = () => {
    const savedCoords = localStorage.getItem(COORDS)
    if(savedCoords === null) {
        askForCoords()
    } else {
        const parsedCoords = JSON.parse(savedCoords)
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}