var searchForm = $('#searchform');
var historyList = $('#historylist');
var city = $('#city');
var searchCity = $('input[name="city"]').val();
var searchButton = $('#search');



var APIKey = 'fbb08152a4c7efaee1be8de10432c3f7';

var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + searchCity + "&appid=" + APIKey;




var historyCity = [];


$(document).ready(function() {
  $(".content").hide();

});

function onload() {
    if(localStorage.getItem('city') != '') {
    historyCity = JSON.parse(localStorage.getItem('city'));
}
}

function addSearch(searchSave) {
    historyCity.city.push(searchSave);
    localStorage.setItem('city',JSON.stringify(historyCity));
  }


function searchBtn(event) {
    event.preventDefault();

    $(".content").show();

    var searchCity = $('input[name="city"]').val();

    if (!searchCity) {
        return;
    }

    var searchHistoryItem = $(
        '<li class="flex-row justify-space-between">'
    );

    searchHistoryItem.text(searchCity);
    
    historyList.append(searchHistoryItem);
    


}

function getApi(queryURL) {
  var searchCity = $('input[name="city"]').val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey + "&units=imperial";


  fetch(queryURL)
    .then(response => response.json())
    .then(data => {
        var nameVal = data['name'];
        var tempVal = data['main']['temp'];
        var windVal = data['wind']['speed'];
        var humidityVal = data['main']['humidity'];

        var lon = data['coord']['lon'];
        var lat = data['coord']['lat'];


        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
        var name = $('#name');
        var temp = $('#temp');
        var wind = $('#wind');
        var humidity = $('#humidity');

        var icon = "https://openweathermap.org/img/wn/" + data['weather'][0]['icon'] + ".png";

        var iconEL = $("<img>").attr("src", icon);

        name.html(nameVal + "("+ moment().format('l') +")");
        name.append(iconEL);
        temp.html("Temp: " + tempVal + " °F");
        wind.html("Wind: " + windVal + " MPH");
        humidity.html("Humidity: " + humidityVal + " %");
        console.log(data);

      return fetch(queryURL2) 
    })
    .then(response => response.json())
      .then(data =>{

         var UVVal = $('#UV');
         var UVVal = data['current']['uvi'];
         console.log(data);


         let color = "green";

         if (UVVal > 5) {
           color = "red";
         };




        
          var UV = $('#UV');
        
        
          UV.html("UV Index: " + UVVal);


    


          for (i=1; i<7; i++) {
            var weatherDiv = $('#day' + i);
            $('h5').css({"font-weight":"bold", "line-height":"40px"});
            var date = $('<h5>').text("("+ moment().format('l') + ")");
            var icon2 = "http://openweathermap.org/img/wn/" + data['daily'][i]['weather'][0]['icon'] + ".png";
            var iconEL2 = $("<img>").attr("src", icon2 );
            var temp = $('<p>').text("Temp: " + data['daily'][i]['temp']['day'] + " °F");
            var wind = $('<p>').text("Wind: " + data['daily'][i]['wind_speed'] + " MPH");
            var humidity = $('<p>').text("Humidity: " + data['daily'][i]['humidity'] + " %");

            //var wind = $()
            weatherDiv.append(date);
            weatherDiv.append(iconEL2);
            weatherDiv.append(temp);
            weatherDiv.append(wind);
            weatherDiv.append(humidity);
          }
        
      })
  
}




searchForm.on('submit', searchBtn);
searchButton.on('click', getApi);



