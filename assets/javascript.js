var area = $('#area')
var btn =$('#subtn')


function fndloc(){
    
}

btn.on("click", function(loc) {
    loc.preventDefault();
    area= area.val().replace(" ","_")
    console.log(area)
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + area +"&appid=9bee94a7e3bcc3bb0107d3a4ff9d9c45"
    console.log(queryURL)
  })
