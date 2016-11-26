/* 
566133c4505fd9a542a7cfd248ab2c22 
http://api.openweathermap.org/data/2.5/forecast/city?id=2172797&APPID=566133c4505fd9a542a7cfd248ab2c22 
http://api.openweathermap.org/data/2.5/weather?id=2172797
Bucharest id: 683506

home photo coordinates
img: 720x960
area-1-weather: 
area-2-co2
*/

var weather_bucharest_url = "http://api.openweathermap.org/data/2.5/weather?q=Bucharest&mode=xml&APPID=566133c4505fd9a542a7cfd248ab2c22";

/* CO2 data */
var CO2_VALUE;
var CO2_VALUE_INFO = "Value: ";

var CO2_DESCRIPTION;
var CO2_DESCRIPTION_INFO = "Description: ";

/* Weather data */
var WEATHER_CLOUDS;
var WEATHER_CLOUDS_INFO = "Clouds: ";

var WEATHER_HUMIDITY;
var WEATHER_HUMIDITY_INFO = "Humidity: ";

var WEATHER_PRECIPITATION;
var WEATHER_PRECIPITATION_INFO = "Precipitation: ";

var WEATHER_PRESSURE;
var WEATHER_PRESSURE_INFO = "Pressure: ";

var WEATHER_TEMPERATURE;
var WEATHER_TEMPERATURE_INFO = "Temperature: ";

var WEATHER_TEMPERATURE_MIN;
var WEATHER_TEMPERATURE_MIN_INFO;

var WEATHER_TEMPERATURE_MAX;
var WEATHER_TEMPERATURE_MAX_INFO;

var WEATHER_VISIBILITY;
var WEATHER_VISIBILITY_INFO = "Visibility: ";

var WEATHER_WIND;
var WEATHER_WIND_INFO = "Wind: ";

function update() {
	// Get weather data
	makeHttpRequest(weather_bucharest_url, showWeather);	

	// Get CO2 data
	$.getJSON('http://www.hqcasanova.com/co2?callback=?', showCO2);
}

function showCO2(json) {
	// Get last update time
	var lastUpdate = json['date'];
	var tmp = lastUpdate.replace("T", "  ");
	if (tmp.indexOf("+") >= 0)
		tmp = tmp.substring(0, tmp.indexOf("+"));
	tmp = "CO2 information at " + tmp;
	document.getElementById("data-co2-title").innerHTML = tmp;

	

	// Set table values
	var value = json[0] + json['units'];
	var description = json['all'].substring(0, json['all'].indexOf("starting"));
	document.getElementById("data-co2-value").innerHTML = value;
	document.getElementById("data-co2-description").innerHTML = description;

	// Save values
	CO2_VALUE = value;
	CO2_DESCRIPTION = description;
}

function showWeather(xml) {
	console.log("Received XML");
	console.log(xml);

	// Get last update time
	var lastUpdate = xml.getElementsByTagName("lastupdate")[0];
	var tmp = lastUpdate.getAttribute("value").replace("T", "  ");
	tmp = "Weather information                at " + tmp;
	document.getElementById("data-weather-title").innerHTML = tmp;

	// Get temperatures
	var temperature = xml.getElementsByTagName("temperature")[0];
	var unit = temperature.getAttribute("unit");
	WEATHER_TEMPERATURE = temperature.getAttribute("value") + " " + unit;
	WEATHER_TEMPERATURE_MIN = temperature.getAttribute("min") + " " + unit;
	WEATHER_TEMPERATURE_MAX = temperature.getAttribute("max") + " " + unit;
	document.getElementById("data-weather-temp").innerHTML = WEATHER_TEMPERATURE;
	document.getElementById("data-weather-temp-min").innerHTML = WEATHER_TEMPERATURE_MIN;
	document.getElementById("data-weather-temp-max").innerHTML = WEATHER_TEMPERATURE_MAX;

	// Get humidity
	var humidity = xml.getElementsByTagName("humidity")[0];
	WEATHER_HUMIDITY = humidity.getAttribute("value") + " " + humidity.getAttribute("unit");
	document.getElementById("data-weather-humidity").innerHTML = WEATHER_HUMIDITY;

	// Get pressure
	var pressure = xml.getElementsByTagName("pressure")[0];
	WEATHER_PRESSURE = pressure.getAttribute("value") + " " + pressure.getAttribute("unit");
	document.getElementById("data-weather-pressure").innerHTML = WEATHER_PRESSURE;

	// Get precipitation
	var precipitation = xml.getElementsByTagName("precipitation")[0];
	var tableValue = precipitation.getAttribute("mode");
	if (tableValue != "no" && tableValue != "No" && tableValue != "NO")
		tableValue += " : " + precipitation.getAttribute("value");
	WEATHER_PRECIPITATION = tableValue;
	document.getElementById("data-weather-precipitation").innerHTML = WEATHER_PRECIPITATION;

	// Get wind info
	var wind = xml.getElementsByTagName("wind")[0];
	var windSpeed = wind.getElementsByTagName("speed")[0];
	WEATHER_WIND = windSpeed.getAttribute("name") + ", " + windSpeed.getAttribute("value") + " mps";
	document.getElementById("data-weather-wind-speed").innerHTML = WEATHER_WIND;

	// Get clouds info
	var clouds = xml.getElementsByTagName("clouds")[0];
	WEATHER_CLOUDS = clouds.getAttribute("name");
	document.getElementById("data-weather-clouds").innerHTML = WEATHER_CLOUDS;

	// Get visibility info
	var visibility = xml.getElementsByTagName("clouds")[0];
	WEATHER_VISIBILITY = visibility.getAttribute("value") + " meters";
	document.getElementById("data-weather-visibility").innerHTML = WEATHER_VISIBILITY;
	

	
}

function makeHttpRequest(url, callback_function) {
	var xmlhttp;
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	else // code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

	console.log("xmlhttp created");

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
			callback_function(xmlhttp.responseXML)
	}
	xmlhttp.open("GET", url, true);
	console.log(".open(GET)");
	xmlhttp.send();
	console.log("send");
}

function showWeatherTooltip() {
	var icon = document.getElementById("sensor-icon-weather");
	var tooltipText = WEATHER_TEMPERATURE_INFO + WEATHER_TEMPERATURE + "\n" +
						WEATHER_HUMIDITY_INFO + WEATHER_HUMIDITY + "\n" + 
						WEATHER_PRESSURE_INFO + WEATHER_PRESSURE + "\n" +
						WEATHER_CLOUDS_INFO + WEATHER_CLOUDS + "\n";
	icon.title = tooltipText;
}

function showCO2Tooltip() {
	var icon = document.getElementById("sensor-icon-co2");
	var tooltipText = CO2_VALUE_INFO + CO2_VALUE + "\n" + CO2_DESCRIPTION_INFO + CO2_DESCRIPTION;
	icon.title = tooltipText;
}

