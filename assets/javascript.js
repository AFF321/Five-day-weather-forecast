var area = $('#area')
var btn =$('#subtn')
var load = $('.load')
var results = $("#weather")
//loads last place entered if there is anything saved
var sved =localStorage.getItem('savedplaces')
if( sved !==null){
    var locall= $("<h1>").addClass("load").text(sved)
    //sets the value to the name of the city for the forecast to grab
    locall.value =sved.replace(" ","_")

  $('#saved').append(locall)

console.log(locall.value)

  locall.on("click", function(e) {
    
    e.preventDefault();
    
    var queryURL = "https://api.weatherapi.com/v1/forecast.json?key=8bf612dbaf8f4e5aa2f184314212702&q="+ locall.value + "&days=6&aqi=no&alerts=no" 
  console.log(queryURL)
  
    getWeather(queryURL);
    
  })
}


//uses the url data returned to create all the information needed
function getWeather(url) {
    $.ajax({ 
      url: url})
    .then(function (data){
    $('.h22').text("City: " +data.location.name+ "\n, "+data.location.region)
     console.log(data)
     //makes then adds all current data
     var div = $("<div>").addClass(" col-auto smaller card")
     
        var gust = $("<div>").addClass("card-text").text("Gust: " + data.current.gust_mph)
        var humidity = $("<div>").addClass("card-text").text("Humidity: " + data.current.humidity)
        var day = $("<div>").addClass("card-text").text("Today")
        var tempf = $("<div>").addClass("card-text").text("Temperature:" + data.current.temp_f)
        var uv = $("<div>").addClass("card-text").text("Uv: " + data.current.uv)
        var mph = $("<div>").addClass("card-text").text("WindMph: " + data.current.wind_mph)
        var date_epoh = $("<div>").addClass("card-text").text("WindMph: " + data.current.wind_mph)
     
     
     div.append(gust)
    div.append(humidity)  
    div.append(day)  
    div.append(tempf)  
    div.append(uv)  
    div.append(mph)  
    results.append(div)
//sets the location name into the local storage
var locall= $("<h1>").addClass("").text(data.location.name)
  $('#saved').append(locall)
localStorage.setItem('savedplaces',data.location.name)
//starts a for loop for the next 4 days
    for(var i = 0; i <= 4; i++){
        console.log('hello')
        var div = $("<div>").addClass("col-auto card")
        
            var date =$("<div>").addClass("card-text").text("day: " + data.forecast.forecastday[i].date)
            var tempf = $("<div>").addClass("card-text").text("Temperature:" + data.forecast.forecastday[i].day.maxtemp_f)
            var uv = $("<div>").addClass("card-text").text("Uv: " + data.forecast.forecastday[i].day.uv)
            var mph = $("<div>").addClass("card-text").text("WindMph: " + data.forecast.forecastday[i].day.maxwind_mph)
            var date_epoh = $("<div>").addClass("card-text").text("WindMph: " + data.forecast.forecastday[i].day.wind_mph)

        div.append(date)
        div.append(gust)
        div.append(humidity)      
        div.append(tempf)  
        div.append(uv)  
        div.append(mph)  
        results.append(div)

    }
})
    
  }
  
//on click this function will grab what is typed in and start getweather
  btn.on("click", function(e) {
    
    e.preventDefault();
    var value = area.val().replace(" ", "_")
    var queryURL = "https://api.weatherapi.com/v1/forecast.json?key=8bf612dbaf8f4e5aa2f184314212702&q="+ value + "&days=6&aqi=no&alerts=no" 
  console.log(queryURL)
  
    getWeather(queryURL);
    
  })

//allows you to sort the saved place
  $( function() {
    $( "#saved" ).sortable();
    $( "#saved" ).disableSelection();
  } );