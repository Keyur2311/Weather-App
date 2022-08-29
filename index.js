let city = '';
async function getWeatherdata() {
    let api = 'http://api.openweathermap.org/data/2.5/weather?q='
    city = document.querySelector('.cityName').value;
    let ap = '&APPID=';
    let apiKey = config.SECRET_API_KEY;
    let units = '&units=metric';
    let url = api + city + ap + apiKey + units;
    try {
        let response = await fetch(url);
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } else {
            let html = '';
            html += '<h4> oops, Sorry we don\'t have any weather information about this city.</h4>'
            document.querySelector('.cityName').value = '';
            document.getElementById('wcontent').innerHTML = html;
            throw Error(response.statusText);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function loadWeatherData() {
    let data = await getWeatherdata();
    let html = '';
    let temperature = data.main.temp;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let windDeg = data.wind.deg;
    let wdes = data.weather[0].description;
    html += `<h4> Weather in ${city}</h4>
    <h3>${temperature}<sup>o</sup>C
    </h3>
    <h5> Wind Speed :- ${windSpeed} km/h, ${windDeg}<sup>o</sup><h5>
    <h5> Humidity :- ${humidity} %</h5>
    <p class="wd"> Weather description :- ${wdes}  <p>
    `;

    document.querySelector('.cityName').value = '';
    city = '';
    document.getElementById('wcontent').innerHTML = html;

}
