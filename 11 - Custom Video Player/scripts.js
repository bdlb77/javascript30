//  Get out Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// Build up Functions

function toggePlay(){
	if(video.paused){
		video.play();
	}else{
		video.pause();
	}
}

function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent  = icon;

}

function skip(){
	const skip = this.dataset.skip
	video.currentTime += parseFloat(skip);
}

function handleRangeUpdate(){
	video[this.name] = this.value;
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = percent+'%';
}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
	console.log(e)
}
// Add Event Listeners

video.addEventListener('click', toggePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', toggePlay);

skipButtons.forEach((skpBtn) => skpBtn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousemove = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousemove && scrub(e));
progress.addEventListener('mousedown',() => mousemove = true);
progress.addEventListener('mouseup',  () => mousemove = false);

