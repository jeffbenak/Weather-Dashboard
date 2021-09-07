var searchForm = $('#searchform');
var historyList = $('#historylist');
var city = $('#city');
var searchCity = $('input[name="city"]').val();
var searchButton = $('#search');






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



searchForm.on('submit', searchBtn);
searchButton.on('click', getApi);
//getApi(queryURL);


