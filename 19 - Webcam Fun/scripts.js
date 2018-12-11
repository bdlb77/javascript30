const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
		.then(userMediaStream => {
			// window.URL.create.... is deprecated 

			// video.src = window.URL.createObjectURL(userMediaStream);

			// use instead: 
			 video.srcObject = userMediaStream;

			video.play();
		})
		.catch(err => {
			console.error(`Your video isn't working!`, err);
		});
}

function paintingToCanvas(){
	const width = video.videoWidth;
	const height = video.videoHeight;

	canvas.width = width;
	canvas.height = height;
	
	setInterval(() => {
		 ctx.drawImage(video, 0, 0, width, height);
		 // const pixels = ctx.getImageData(0, 0, width, height);
	}, 16)
}

function takePhoto(){
	//play sound
	snap.currentTime = 0;
	snap.play();

	// take data out
	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'brybry-bug');
	link.innerHTML = `<img src="${data}" alt="brybry" />`;
	strip.insertBefore(link, strip.firstChild);

}

video.addEventListener('canplay', paintingToCanvas);

getVideo();