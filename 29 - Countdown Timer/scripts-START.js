let countDown;
const displayTime = document.querySelector('.display__time-left');
const displayEndTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	// clear any existing timer
	clearInterval(countDown)
	const now = Date.now();
	const then = now + seconds * 1000;
	
	displayTimeLeft(seconds);
	endTime(then)

	countDown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		
		if (secondsLeft <= 0){
			clearInterval(countDown)
			return;
		}

		displayTimeLeft(secondsLeft);
	}, 1000)
	
}


function displayTimeLeft(seconds){
	// console.log(seconds)
	const minutes = Math.floor(seconds / 60);
	const remainderSecs = seconds % 60;
	const display = `${minutes}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`
	displayTime.textContent = display;
	
	console.log({minutes, remainderSecs})

}

function endTime(timestamp){
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	const adjustedTime = hour > 12 ? hour - 12 : hour
	const adjustedMinutes = hour > 12 ? `${minutes}pm` : minutes


	displayEndTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
}
function startTimer(){
	// console.log(this.dataset.time)
	const seconds = parseInt(this.dataset.time)
	timer(seconds)
} 

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit',function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins*60)
  this.reset();
});
