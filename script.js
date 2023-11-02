const Input_Box = document.querySelector('.input-box');
const Search_Button = document.getElementById('SearchButton');
const Weather_Image = document.querySelector('.weather-image');
const Temperature = document.querySelector('.temperature');
const Description = document.querySelector('.description');
const Humidity = document.getElementById('humidity');
const Wind_Speed = document.getElementById('wind-speed');
const Location_Not_Found = document.querySelector('.location-not-found');
const Weather_Body = document.querySelector('.weather-body');

async function CheckWeather(City)
{
    const API_Key = "6e9b9d2757a8fccc1db3686f6020f917";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_Key}`;

    const Weather_Data = await fetch(`${URL}`).then(responce => responce.json() );

    if(Weather_Data.cod == `404`)
    {
        Location_Not_Found.style.display = "flex";
        Weather_Body.style.display = "none";
        console.log("Error!");
        return;
    }

    Location_Not_Found.style.display = "none";
    Weather_Body.style.display = "flex";
    Temperature.innerHTML = `${Math.round(Weather_Data.main.temp - 273.15)}°C`;
    Description.innerHTML = `${Weather_Data.weather[0].description}`;
    Humidity.innerHTML = `${Weather_Data.main.humidity}%`;
    Wind_Speed.innerHTML = `${Weather_Data.wind.speed}Km/h`;

    switch(Weather_Data.weather[0].main)
    {
        case'Clouds':
        {
            Weather_Image.src = "./assets/cloud.png";
            break;
        }

        case'Clear':
        {
            Weather_Image.src = "./assets/clear.png";
            break;
        }

        case'Rain':
        {
            Weather_Image.src = "./assets/rain.png";
            break;
        }

        case'Mist':
        {
            Weather_Image.src = "./assets/mist.png";
            break;
        }

        case'Snow':
        {
            Weather_Image.src = "./assets/snow.png";
            break;
        }
    }
}

Search_Button.addEventListener('click', ()=> {
    CheckWeather(Input_Box.value);
});