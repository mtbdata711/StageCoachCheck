var todayDate = Math.round((new Date()).getTime() / 1000);

var input = document.getElementById("message_id");

var button = document.getElementById("button");
button.addEventListener('click', getJSON);	

var destinationsDiv = document.getElementById("ourDestinations");
destinationsDiv.style.display = 'none';


var destinationsButton = document.getElementById('destinationsButton');
destinationsButton.addEventListener('click', ourDestinations);
function getJSON(){
	var getInput = input.value
	var url = "https://mtbdata7slash11.pythonanywhere.com/api/v1/resources/coaches?name=" + input.value
	console.log(url);
	var getData = new XMLHttpRequest();
	getData.open('GET', url);
	getData.onload = function getJSONData(){
  var json = JSON.parse(getData.responseText);
  filterDisplay(json);
  
}
getData.send();
}

function filterDisplay(json){
	var message = "<table class ='center'><tr><th>ETA</th> <th>Destination</th><th>Due</th></tr>";
    	if(json[0] !== undefined){
    	var destinationName = json[0].name;
    	var departureTime = json[0].departure;
 		if(departureTime < todayDate) {
          message += '<tr><td>' + displayTime(departureTime) + '</td>' + '<td>' + displayDestination(destinationName) + '</td>' + '<td>' + displayRemaining(departureTime) + '</td>' + '</tr>'
    	}

} else {
 message = '<p>No service found for: ' + '<b>' + input.value + '</b>' + '<br>' + '<br>' + ' Please try again!</p>'
}
document.getElementsByClassName("displayTT")[0].innerHTML = message;
message += '</table>';
}


function displayDestination(tt){
	var message =  `${tt}`;
	return message;
}

function displayTime(tt){
	    var convertDate = new Date(tt * 1000);
      return convertDate.toLocaleTimeString();


}


function newTime(){
   return Math.round((new Date()).getTime() / 1000);
}

function displayRemaining(tt){
  var getTime = newTime()
	var differenceTime = Math.floor((getTime - tt) / 60);
	var dR = '';
        if(differenceTime > 60){
          dR += Math.floor(differenceTime / 60) + 'hrs '
          dR += differenceTime % 60 + 'mins'
        }else {
          dR += differenceTime + 'mins';

        };
        var timeRemaining = `${dR}`;
        return timeRemaining;


};


function ourDestinations(){
	if(destinationsDiv.style.display === 'none'){
		destinationsDiv.style.display = 'block';
	}else{
		destinationsDiv.style.display = 'none';
	}
}

function destinationsData(){
	var message = '<ul>';
	var url = "https://mtbdata7slash11.pythonanywhere.com/api/v1/resources/coaches/all";
	var getData = new XMLHttpRequest();
	getData.open('GET', url);
	getData.onload = function getJSONData(){
  var json = JSON.parse(getData.responseText);
  for(var i = 1; i < json.length; i++){
  message += '<li>' + json[i].name + '</li>';
  destinationsDiv.innerHTML = message;
	}

  }
  getData.send();
}

destinationsData();
