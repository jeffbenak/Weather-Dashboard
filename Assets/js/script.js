var searchForm = $('#searchform');
var historyList = $('#historylist');
var city = $('#city');
var searchCity = $('input[name="city"]').val();
var searchButton = $('#search');



var APIKey = 'fbb08152a4c7efaee1be8de10432c3f7';

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey;




var historyCity = [];

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

    var searchCity = $('input[name="city"]').val();

    if (!searchCity) {
        return;
    }

    var searchHistoryItem = $(
        '<li class="flex-row justify-space-between">'
    );

    searchHistoryItem.text(searchCity);
    
    historyList.append(searchHistoryItem);
    

    // $('input[name="city"]').val('');

}

function getApi(queryURL) {
  var searchCity = $('input[name="city"]').val();
  //console.log(searchCity);
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey;
  fetch(queryURL)
    .then(response => response.json())
    .then(data => {
        var nameVal = data['name'];
        var descVal = data['weather'][0]['description'];
        var tempVal = data['main']['temp'];
        var windVal = data['wind']['speed'];
        var humidityVal = data['main']['humidity'];
        //var UVVal = data[]

        var name = $('#name');
        var desc = $('#desc');
        var temp = $('#temp');
        var wind = $('#wind');
        var humidity = $('#humidity');
        //var UV = $('#UV');

        name.html(nameVal);
        desc.html(descVal);
        temp.html(tempVal);
        wind.html(windVal);
        humidity.html(humidityVal);
      //  UV.innerHTML = UVVal;
      console.log(data);
      console.log(tempVal);
      console.log(name);
      console.log(searchCity);


    })
    
  
}




searchForm.on('submit', searchBtn);
searchButton.on('click', getApi);
//getApi(queryURL);


