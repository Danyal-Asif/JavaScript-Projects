// Calling showTime function at every second
// setInterval(showTime, 1000);
setInterval(countDown,1000);
// Defining showTime funcion
function showTime() {
	// Getting current time and date
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();
	am_pm = "AM";
    
	// Setting time for 12 Hrs format
	if (hour >= 12) {
		if (hour > 12) hour -= 12;
		am_pm = "PM";
	} else if (hour == 0) {
		hr = 12;
		am_pm = "AM";
	}

	hour =
		hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;

	let currentTime =
		hour +
		":" +
		min +
		":" +
		sec +" "+
		am_pm;

	// Displaying the time
	document.getElementById(
		"main"
	).innerHTML = currentTime;
}

function countDown(){

let fromTime=new Date()
let toTime=new Date(2024, 1, 5, 8, 45, 0)

const timeDiff=(toTime-fromTime)/1000
console.log(timeDiff)
let days='00'
let hours='00'
let mins='00'
let secs='00'
if(Math.sign(timeDiff)==1)
{
  days=Math.floor(timeDiff/(60*60*24))
  hours=Math.floor(timeDiff/(60*60)-(days*24))
  mins=Math.floor((timeDiff/60)-(days*24*60)-(hours*60))
  secs=60-new Date().getSeconds()
days=days<=9?'0'+days:days
hours=hours<=9?'0'+hours:hours
mins=mins<=9?'0'+mins:mins
}
else{
	document.querySelector('.deadline').innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
}
document.getElementById("day").innerText=days
document.getElementById("hour").innerText=hours
document.getElementById("mins").innerText=mins
document.getElementById("secs").innerText=secs
}

countDown()