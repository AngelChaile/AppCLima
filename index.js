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
}

getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}

const onload = () =>{
    navigator.geolocation.getCurrentPosition(fetchData);
}


