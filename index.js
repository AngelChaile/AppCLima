const API_KEY = 'b73397dc4a26f4ac65388432b716a5d0';

const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`) 
    .then(response => response.json())
    .then(data => setWeatherData(data))
}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanUp();
}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    container.style.display = 'flex';
}

getDate = () => {
    let date = new Date();
    return `${('0' + (date.getDate())).slice(-2)}-${( '0' + (date.getMonth() +1)).slice(-2)}-${date.getFullYear()}`;
}

const onload = () =>{
    navigator.geolocation.getCurrentPosition(fetchData);
}


